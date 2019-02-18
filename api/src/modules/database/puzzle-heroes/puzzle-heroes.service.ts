import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseService } from '../../../services/base.service';
import { PuzzleHeroes } from './puzzle-heroes.model';
import { Model } from 'mongoose';
import { Tracks } from './tracks/tracks.model';
import { PuzzleGraphNodes } from './puzzle-graph-nodes/puzzle-graph.nodes.model';
import { CreatePuzzleDto, CreateTrackDto } from './puzzle-heroes.dto';
import { Questions } from '../questions/questions.model';
import * as mongoose from 'mongoose';

export interface PuzzleDefinition extends PuzzleGraphNodes {
    completed: boolean;
    locked: boolean;
    label: string;
}

@Injectable()
export class PuzzleHeroesService extends BaseService<PuzzleHeroes, PuzzleHeroes> {
    constructor(@InjectModel("puzzle-heroes") private readonly puzzleHeroesModel: Model<PuzzleHeroes>,
                @InjectModel("questions") private readonly questionsModel: Model<Questions>) {
        super(puzzleHeroesModel);
    }

    public async getByEvent(eventId: string, teamId: string): Promise<PuzzleHeroes> {
        const puzzleHero = await this.puzzleHeroesModel.findOne({
            event: eventId
        }).populate({
            path: 'tracks.puzzles.question',
            model: 'questions'
        }).exec();
        if (!puzzleHero) {
            throw new NotFoundException("No puzzle hero found");
        }

        const res = [];
        for (const track of puzzleHero.tracks) {
            res.push(await this.formatTrack(track.toJSON(), puzzleHero, teamId));
        }

        return {
            tracks: res
        } as PuzzleHeroes;
    }

    public async createTrack(eventId: string, dto: CreateTrackDto): Promise<void> {
        const puzzleHero = await this.findOne({
            event: eventId
        });
        if (!puzzleHero) {
            throw new NotFoundException("No puzzle hero found");
        }

        puzzleHero.tracks.push(dto as Tracks);
        await puzzleHero.save();
    }

    public async createPuzzle(eventId: string, trackId: string, dto: CreatePuzzleDto): Promise<void> {
        const puzzleHero = await this.findOne({
            event: eventId
        });
        if (!puzzleHero) {
            throw new NotFoundException("No puzzle hero found");
        }

        const track = puzzleHero.tracks.find(x => x._id.equals(trackId));
        if (!track) {
            throw new NotFoundException("No track found");
        }

        if (dto.depends) {
            const puzzle = track.puzzles.find(x => (x.question as mongoose.Types.ObjectId).equals(dto.depends));
            if (!puzzle) {
                throw new BadRequestException("Impossible deps");
            }
        }

        const question = await this.questionsModel.create({
            label: dto.label,
            description: dto.label,
            type: dto.type,
            validationType: dto.validationType,
            answer: dto.answer,
            score: dto.score
        });

        track.puzzles.push({
            question: question._id,
            depends: dto.depends
        });

        await puzzleHero.save();
    }

    private async formatTrack(track: Tracks, puzzleHero: PuzzleHeroes, teamId: string): Promise<Tracks> {
        for (const puzzle of track.puzzles as PuzzleDefinition[]) {
            puzzle.completed = puzzleHero.answers.some(x => x.teamId === teamId && x.question === puzzle.question);
        }
        for (const puzzle of track.puzzles as PuzzleDefinition[]) {
            puzzle.label = (puzzle.question as Questions).label;
            delete puzzle.question;

            puzzle.locked = false;
            if (!puzzle.depends) {
                continue;
            }
            const depends = puzzleHero.answers.find(x => x.teamId === teamId && x.question === puzzle.depends);
            if (!depends) {
                puzzle.locked = true;
            }
        }

        return track;
    }
}
