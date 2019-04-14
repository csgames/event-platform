import { InjectModel } from "@nestjs/mongoose";
import { SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { StorageService } from "@polyhx/nest-services";
import * as AdmZip from "adm-zip";
import { Model, Types } from "mongoose";
import { Client, Server } from "socket.io";
import { Questions } from "../questions/questions.model";
import { Teams } from "../teams/teams.model";
import { Competitions } from "./competitions.model";

export enum CompetitionsMessageTypes {
    DownloadStart = "download-start",
    DownloadEnd = "download-end",
    DownloadUpdate = "download-update",
    DownloadTeam = "download-team",
    DownloadSaving = "download-saving"
}

export interface DownloadQuestion {
    eventId: string;
    competitionId: string;
    questionId: string;
}

@WebSocketGateway(8081, {
    namespace: "competition"
})
export class CompetitionsGateway {
    constructor(private storageService: StorageService,
                @InjectModel("competitions") private readonly competitionsModel: Model<Competitions>,
                @InjectModel("questions") private readonly questionsModel: Model<Questions>,
                @InjectModel("teams") private readonly teamsModel: Model<Teams>) {
    }

    @WebSocketServer()
    private server: Server;

    @SubscribeMessage("download")
    public async downloadQuestion(client: Client, payload: DownloadQuestion) {
        const teams = await this.teamsModel.find({
            event: payload.eventId
        }).select("name").exec();
        if (!teams.length) {
            this.sendToClient(client.id, CompetitionsMessageTypes.DownloadEnd, {});
            return;
        }

        const competition = await this.competitionsModel.findOne({
            _id: payload.competitionId,
            event: payload.eventId
        }).exec();
        if (!competition) {
            this.sendToClient(client.id, CompetitionsMessageTypes.DownloadEnd, {});
            return;
        }

        const question = competition.questions.find(x => x._id.equals(payload.questionId));
        if (!question) {
            this.sendToClient(client.id, CompetitionsMessageTypes.DownloadEnd, {});
            return;
        }

        const questionId = (question.question as Types.ObjectId).toHexString();
        const files = await this.storageService.getDirectory(`questions/${questionId}`);
        if (!files.length) {
            this.sendToClient(client.id, CompetitionsMessageTypes.DownloadEnd, {});
            return;
        }

        this.sendToClient(client.id, CompetitionsMessageTypes.DownloadStart, {
            length: files.length
        });
        const zip = new AdmZip();
        let total = 0;
        const sendUpdate = () => {
            this.sendToClient(client.id, CompetitionsMessageTypes.DownloadUpdate, {
                percent: +((total / files.length) * 100).toFixed(2)
            });
            total++;
        };

        for (const file of files) {
            const teamId = file.name.split("-");
            if (teamId.length < 2) {
                sendUpdate();
                continue;
            }
            const team = teams.find(x => x._id.equals(teamId[1].split(".")[0]));
            if (!team) {
                sendUpdate();
                continue;
            }

            this.sendToClient(client.id, CompetitionsMessageTypes.DownloadTeam, {
                team: team.name
            });
            const [buffer] = await file.download();
            const fileName = teamId[1];
            const ext = fileName.slice(fileName.indexOf("."), fileName.length);
            zip.addFile(`${team.name}${ext}`, buffer);
            sendUpdate();
        }

        this.sendToClient(client.id, CompetitionsMessageTypes.DownloadSaving, {});
        const buffer = zip.toBuffer();
        const res = await this.storageService.upload({
            buffer,
            size: buffer.length,
            originalname: "result.zip"
        } as Express.Multer.File, `questions/${questionId}/result`);
        this.sendToClient(client.id, CompetitionsMessageTypes.DownloadEnd, {
            url: await this.storageService.getDownloadUrl(res)
        });
    }

    private sendToClient(room: string, event: string, message: any) {
        this.server.to(room).emit(event, message);
    }
}
