import * as mongoose from "mongoose";
import { FakeDocumentQuery } from "../../../utils/fake-document-query";
import { Teams } from "./teams.model";

class FakeTeams implements Teams {
    public _id: mongoose.Types.ObjectId;

    constructor(team: Teams) {
        Object.assign(this, team);
    }

    public static findOne(condition: { name: string, attendees: string, _id: string }): FakeDocumentQuery<FakeTeams> {
        if (condition.name === "This team exist" || condition.attendees === "5bde6ec00000000000000000"
            || condition._id === "5bde6ec00000000000000001") {
            return new FakeDocumentQuery(new FakeTeams({
                _id: mongoose.Types.ObjectId("5bde6ec00000000000000001"),
                name: "This team exist",
                attendees: ["5bde6ec00000000000000000"],
                event: "",
                present: false
            } as Teams));
        } else if (condition._id === "5bde6ec00000000000000002") {
            return new FakeDocumentQuery(new FakeTeams({
                _id: mongoose.Types.ObjectId("5bde6ec00000000000000001"),
                name: "This team exist with more than one member",
                attendees: ["5bde6ec00000000000000000", "5bde6ec00000000000000001"],
                event: "",
                present: false
            } as Teams));
        }
        return new FakeDocumentQuery(null);
    }

    public static remove(condition: any): FakeDocumentQuery<void> {
        return new FakeDocumentQuery<void>(null);
    }

    // @ts-ignore
    public save(): Promise<FakeTeams> {
        if (!this._id) {
            this._id = mongoose.Types.ObjectId("5bde6ec00000000000000000");
        }
        return Promise.resolve(this);
    }
}

// describe('TeamsService', () => {
//     let teamsService: TeamsService;
//     let attendeesService: IMock<AttendeesService>;
//     let eventsService: IMock<EventsService>;
//     let emailService: IMock<EmailService>;
//     let stsService: IMock<STSService>;

//     before(async () => {
//         attendeesService = Mock.ofType(AttendeesService);
//         eventsService = Mock.ofType(EventsService);
//         emailService = Mock.ofType(EmailService);
//         stsService = Mock.ofType(STSService);

//         const module = await Test.createTestingModule({
//             providers: [
//                 TeamsService,
//                 {
//                     provide: getModelToken('teams'),
//                     useValue: FakeTeams
//                 }
//             ]
//         }).overrideProvider(AttendeesService).useValue(attendeesService.object)
//             .overrideProvider(EventsService).useValue(eventsService.object)
//             .overrideProvider(EmailService).useValue(eventsService.object)
//             .overrideProvider(STSService).useValue(stsService.object)
//             .compile();

//         teamsService = module.get<TeamsService>(TeamsService);
//     });

//     describe('setTeamToPresent', () => {
//         it('Should returns null if team does\'t exist', async () => {
//             const res = await teamsService.setTeamToPresent("5bde6ec0000000000000000", "5bde6ec00000000000000001");
//             expect(res).to.be.null;
//         });
//         it('Should returns the updated team if the team exist', async () => {
//             const res = await teamsService.setTeamToPresent("5bde6ec0000000000000000", "5bde6ec00000000000000000");
//             expect(res).to.be.not.null;
//             expect(res.present).to.be.true;
//         });
//     });
// });
