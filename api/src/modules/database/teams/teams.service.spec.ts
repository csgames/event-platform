import { getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { STSService } from '@polyhx/nest-services';
import { fail } from 'assert';
import { expect } from 'chai';
import { IMock, It, Mock } from 'typemoq';
import { CodeException } from '../../../filters/CodedError/code.exception';
import { FakeDocumentQuery } from '../../../utils/FakeDocumentQuery';
import { EmailService } from '../../email/email.service';
import { LHGamesService } from '../../lhgames/lhgames.service';
import { Attendees } from '../attendees/attendees.model';
import { AttendeesService } from '../attendees/attendees.service';
import { Events } from '../events/events.model';
import { EventsService } from '../events/events.service';
import { Code } from './teams.exception';
import { Teams } from './teams.model';
import { TeamsService } from './teams.service';

class FakeTeams implements Teams {
    public _id: string;

    constructor(team: Teams) {
        Object.assign(this, team);
    }

    public static findOne(condition: { name: string, attendees: string }): FakeDocumentQuery<FakeTeams> {
        if (condition.name === 'This team exist' || condition.attendees === '5bde6ec00000000000000000') {
            return new FakeDocumentQuery(new FakeTeams({
                _id: "5bde6ec00000000000000001",
                name: 'This team exist',
                attendees: ['5bde6ec00000000000000000'],
                event: '',
                present: false
            } as Teams));
        }
        return new FakeDocumentQuery(null);
    }

    // @ts-ignore
    public save(): Promise<FakeTeams> {
        if (!this._id) {
            this._id = "5bde6ec00000000000000000";
        }
        return Promise.resolve(this);
    }
}

describe('TeamsService', () => {
    let teamsService: TeamsService;
    let attendeesService: IMock<AttendeesService>;
    let lhGamesService: IMock<LHGamesService>;
    let eventsService: IMock<EventsService>;
    let emailService: IMock<EmailService>;
    let stsService: IMock<STSService>;

    before(async () => {
        attendeesService = Mock.ofType(AttendeesService);
        lhGamesService = Mock.ofType(LHGamesService);
        eventsService = Mock.ofType(EventsService);
        emailService = Mock.ofType(EmailService);
        stsService = Mock.ofType(STSService);

        const module = await Test.createTestingModule({
            providers: [
                TeamsService,
                {
                    provide: getModelToken('teams'),
                    useValue: FakeTeams
                }
            ]
        }).overrideProvider(AttendeesService).useValue(attendeesService.object)
            .overrideProvider(LHGamesService).useValue(lhGamesService.object)
            .overrideProvider(EventsService).useValue(eventsService.object)
            .overrideProvider(EmailService).useValue(eventsService.object)
            .overrideProvider(STSService).useValue(stsService.object)
            .compile();

        teamsService = module.get<TeamsService>(TeamsService);
    });

    describe('createOrJoin', () => {
        it('Should throw a ATTENDEE_NOT_FOUND CodeException if the user isn\'t an attendee', async () => {
            attendeesService.reset();
            attendeesService.setup(x => x.findOne(It.isAny())).returns(() => Promise.resolve(null));

            try {
                await teamsService.createOrJoin({
                    name: 'The best team',
                    event: '5bde6ec00000000000000000'
                }, '5bde6ec00000000000000000');
            } catch (e) {
                expect(e).to.be.instanceOf(CodeException);
                expect(e.code).to.be.equal(Code.ATTENDEE_NOT_FOUND);
            }
        });

        it('Should throw a ATTENDEE_HAS_TEAM CodeException if the attendee is already in a team', async () => {
            attendeesService.reset();
            attendeesService.setup(x => x.findOne(It.isAny())).returns(() => Promise.resolve({
                _id: '5bde6ec00000000000000000',
                userId: '5bde6ec00000000000000000'
            } as Attendees));

            try {
                await teamsService.createOrJoin({
                    name: 'The best team',
                    event: '5bde6ec00000000000000000'
                }, '5bde6ec00000000000000000');
            } catch (e) {
                expect(e).to.be.instanceOf(CodeException);
                expect(e.code).to.be.equal(Code.ATTENDEE_HAS_TEAM);
            }
        });

        it('Should return a created team if the teams doesn\'t exist', async () => {
            attendeesService.reset();
            attendeesService.setup(x => x.findOne(It.isAny())).returns(() => Promise.resolve({
                _id: '5bde6ec00000000000000001',
                userId: '5bde6ec00000000000000000'
            } as Attendees));
            eventsService.setup(x => x.findById(It.isAny())).returns(() => Promise.resolve({
                type: 'A type'
            } as Events));

            try {
                const team = await teamsService.createOrJoin({
                    name: 'The best team',
                    event: '5bde6ec00000000000000000'
                }, '5bde6ec00000000000000000');
                expect(team._id).to.equal('5bde6ec00000000000000000');
            } catch (e) {
                fail('Should not throw any exceptions');
            }
        });

        it('Should return the modified team if the team already existed', async () => {
            attendeesService.reset();
            attendeesService.setup(x => x.findOne(It.isAny())).returns(() => Promise.resolve({
                _id: '5bde6ec00000000000000001',
                userId: '5bde6ec00000000000000000'
            } as Attendees));
            eventsService.setup(x => x.findOne(It.isAny())).returns(() => Promise.resolve({
                type: 'A type'
            } as Events));

            try {
                const team = await teamsService.createOrJoin({
                    name: 'This team exist',
                    event: '5bde6ec00000000000000000'
                }, '5bde6ec00000000000000000');
                expect(team._id).to.equal('5bde6ec00000000000000001');
                expect(team.attendees.length).to.be.equal(2);
            } catch (e) {
                fail('Should not throw any exceptions');
            }
        });
    });
});
