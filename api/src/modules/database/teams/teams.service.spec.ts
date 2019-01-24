import { getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { STSService } from '@polyhx/nest-services';
import { fail } from 'assert';
import { expect } from 'chai';
import { IMock, It, Mock } from 'typemoq';
import { CodeException } from '../../../filters/code-error/code.exception';
import { FakeDocumentQuery } from '../../../utils/fake-document-query';
import { EmailService } from '../../email/email.service';
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

    public static findOne(condition: { name: string, attendees: string, _id: string }): FakeDocumentQuery<FakeTeams> {
        if (condition.name === 'This team exist' || condition.attendees === '5bde6ec00000000000000000'
            || condition._id === '5bde6ec00000000000000001') {
            return new FakeDocumentQuery(new FakeTeams({
                _id: '5bde6ec00000000000000001',
                name: 'This team exist',
                attendees: ['5bde6ec00000000000000000'],
                event: '',
                present: false
            } as Teams));
        } else if (condition._id === '5bde6ec00000000000000002') {
            return new FakeDocumentQuery(new FakeTeams({
                _id: '5bde6ec00000000000000001',
                name: 'This team exist with more than one member',
                attendees: ['5bde6ec00000000000000000', '5bde6ec00000000000000001'],
                event: '',
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
            this._id = '5bde6ec00000000000000000';
        }
        return Promise.resolve(this);
    }
}

describe('TeamsService', () => {
    let teamsService: TeamsService;
    let attendeesService: IMock<AttendeesService>;
    let eventsService: IMock<EventsService>;
    let emailService: IMock<EmailService>;
    let stsService: IMock<STSService>;

    before(async () => {
        attendeesService = Mock.ofType(AttendeesService);
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
                await teamsService.createTeam({
                    name: 'The best team',
                    event: '5bde6ec00000000000000000',
                    school: 'test',
                    attendeeId: '123'
                });
            } catch (e) {
                expect(e).to.be.instanceOf(CodeException);
                expect(e.code).to.be.equal(Code.ATTENDEE_NOT_FOUND);
            }
        });

        it('Should throw a ATTENDEE_HAS_TEAM CodeException if the attendee is already in a team', async () => {
            attendeesService.reset();
            attendeesService.setup(x => x.findOne(It.isAny())).returns(() => Promise.resolve({
                _id: '5bde6ec00000000000000000',
                email: 'test@test.com'
            } as Attendees));

            try {
                await teamsService.createTeam({
                    name: 'The best team',
                    event: '5bde6ec00000000000000000',
                    school: 'test',
                    attendeeId: '123'
                });
            } catch (e) {
                expect(e).to.be.instanceOf(CodeException);
                expect(e.code).to.be.equal(Code.ATTENDEE_HAS_TEAM);
            }
        });

        it('Should return a created team if the teams doesn\'t exist', async () => {
            attendeesService.reset();
            attendeesService.setup(x => x.findOne(It.isAny())).returns(() => Promise.resolve({
                _id: '5bde6ec00000000000000001',
                email: 'test@test.com'
            } as Attendees));
            eventsService.setup(x => x.findById(It.isAny())).returns(() => Promise.resolve({} as Events));

            try {
                const team = await teamsService.createTeam({
                    name: 'The best team',
                    event: '5bde6ec00000000000000000',
                    school: 'test',
                    attendeeId: '123'
                });
                expect(team._id).to.equal('5bde6ec00000000000000000');
            } catch (e) {
                fail('Should not throw any exceptions');
            }
        });

        it('Should return the modified team if the team already existed', async () => {
            attendeesService.reset();
            attendeesService.setup(x => x.findOne(It.isAny())).returns(() => Promise.resolve({
                _id: '5bde6ec00000000000000001',
                email: 'test@test.com'
            } as Attendees));
            eventsService.setup(x => x.findOne(It.isAny())).returns(() => Promise.resolve({} as Events));

            try {
                const team = await teamsService.createTeam({
                    name: 'The best team',
                    event: '5bde6ec00000000000000000',
                    school: 'test',
                    attendeeId: '123'
                });
                expect(team._id).to.equal('5bde6ec00000000000000001');
                expect(team.attendees.length).to.be.equal(2);
            } catch (e) {
                fail('Should not throw any exceptions');
            }
        });
    });

    describe('setTeamToPresent', () => {
        it('Should returns null if team does\'t exist', async () => {
            const res = await teamsService.setTeamToPresent("5bde6ec0000000000000000", "5bde6ec00000000000000001");
            expect(res).to.be.null;
        });
        it('Should returns the updated team if the team exist', async () => {
            const res = await teamsService.setTeamToPresent("5bde6ec0000000000000000", "5bde6ec00000000000000000");
            expect(res).to.be.not.null;
            expect(res.present).to.be.true;
        });
    });
});
