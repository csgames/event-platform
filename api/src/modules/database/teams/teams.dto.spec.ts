import { fail } from 'assert';
import { expect } from "chai";
import { ArgumentMetadata, HttpException, HttpStatus } from '@nestjs/common';
import { ValidationPipe } from '../../../pipes/validation.pipe';
import { CreateOrJoinTeamDto, JoinOrLeaveTeamDto, UpdateLHGamesTeamDto } from './teams.dto';

describe("Teams Dto", () => {
    const pipe = new ValidationPipe();

    describe("CreateOrJoinTeamDto", () => {
        const arg = { metatype: CreateOrJoinTeamDto } as ArgumentMetadata;
        it("Should throw Precondition Failed Exception if name and event aren't provided", async () => {
            try {
                await pipe.transform({ }, arg);
                fail("Validation should have failed");
            } catch (e) {
                expect(e).to.be.instanceOf(HttpException);
                expect(e.status).to.be.equal(HttpStatus.PRECONDITION_FAILED);
            }
        });

        it("Should throw Precondition Failed Exception if event isn't provided", async () => {
            try {
                await pipe.transform({ name: "TestTeam" }, arg);
                fail("Validation should have failed");
            } catch (e) {
                expect(e).to.be.instanceOf(HttpException);
                expect(e.status).to.be.equal(HttpStatus.PRECONDITION_FAILED);
            }
        });

        it("Should throw Precondition Failed Exception if event hasn't the good format", async () => {
            try {
                await pipe.transform({
                        name: "TestTeam",
                        event: "AnEvent"
                    },
                    arg
                );
                fail("Validation should have failed");
            } catch (e) {
                expect(e).to.be.instanceOf(HttpException);
                expect(e.status).to.be.equal(HttpStatus.PRECONDITION_FAILED);
            }
        });

        it("Should return the same value after validation", async () => {
            try {
                const value = await pipe.transform({
                        name: "TestTeam",
                        event: "5bde6ec00000000000000000"
                    },
                    arg
                );
                expect(value).to.be.deep.equal({
                    name: "TestTeam",
                    event: "5bde6ec00000000000000000"
                });
            } catch (e) {
                fail("Validation should not fail");
            }
        });
    });

    describe("JoinOrLeaveTeamDto", () => {
        const arg = { metatype: JoinOrLeaveTeamDto } as ArgumentMetadata;
        it("Should throw Precondition Failed Exception if attendeeId, teamId and event aren't provided", async () => {
            try {
                await pipe.transform({ }, arg);
                fail("Validation should have failed");
            } catch (e) {
                expect(e).to.be.instanceOf(HttpException);
                expect(e.status).to.be.equal(HttpStatus.PRECONDITION_FAILED);
            }
        });

        it("Should throw Precondition Failed Exception if one or many required field aren't provided", async () => {
            const testCases = [{
                teamId: "5bde6ec00000000000000000"
            }, {
                attendeeId: "5bde6ec00000000000000000"
            }, {
                event: "5bde6ec00000000000000000"
            }, {
                teamId: "5bde6ec00000000000000000",
                attendeeId: "5bde6ec00000000000000000"
            }, {
                attendeeId: "5bde6ec00000000000000000",
                event: "5bde6ec00000000000000000"
            }, {
                teamId: "5bde6ec00000000000000000",
                event: "5bde6ec00000000000000000"
            }];

            for (const testCase of testCases) {
                try {
                    await pipe.transform(testCase, arg);
                    fail("Validation should have failed");
                } catch (e) {
                    expect(e).to.be.instanceOf(HttpException);
                    expect(e.status).to.be.equal(HttpStatus.PRECONDITION_FAILED);
                }
            }
        });

        it("Should throw Precondition Failed Exception if one or many fields aren't in the good format", async () => {
            const testCases = [{
                teamId: "A nice team",
                attendeeId: "A nice attendee",
                event: "The best event"
            }, {
                teamId: "5bde6ec00000000000000000",
                attendeeId: "A nice attendee",
                event: "The best event"
            }, {
                teamId: "5bde6ec00000000000000000",
                attendeeId: "5bde6ec00000000000000000",
                event: "The best event"
            }, {
                teamId: "A nice team",
                attendeeId: "5bde6ec00000000000000000",
                event: "The best event"
            }, {
                teamId: "A nice team",
                attendeeId: "5bde6ec00000000000000000",
                event: "5bde6ec00000000000000000"
            }, {
                teamId: "A nice team",
                attendeeId: "A nice attendee",
                event: "5bde6ec00000000000000000"
            }];

            for (const testCase of testCases) {
                try {
                    await pipe.transform(testCase, arg);
                    fail("Validation should have failed");
                } catch (e) {
                    expect(e).to.be.instanceOf(HttpException);
                    expect(e.status).to.be.equal(HttpStatus.PRECONDITION_FAILED);
                }
            }
        });

        it("Should return the same value after validation", async () => {
            try {
                const value = await pipe.transform({
                        teamId: "5bde6ec00000000000000000",
                        attendeeId: "5bde6ec00000000000000000",
                        event: "5bde6ec00000000000000000"
                    }, arg);
                expect(value).to.be.deep.equal({
                    teamId: "5bde6ec00000000000000000",
                    attendeeId: "5bde6ec00000000000000000",
                    event: "5bde6ec00000000000000000"
                });
            } catch (e) {
                fail("Validation should not fail");
            }
        });
    });

    describe("UpdateLHGamesTeamDto", () => {
        const arg = { metatype: UpdateLHGamesTeamDto } as ArgumentMetadata;
        it("Should throw Precondition Failed Exception if programmingLanguage isn't provided", async () => {
            try {
                await pipe.transform({ }, arg);
                fail("Validation should have failed");
            } catch (e) {
                expect(e).to.be.instanceOf(HttpException);
                expect(e.status).to.be.equal(HttpStatus.PRECONDITION_FAILED);
            }
        });

        it("Should throw Precondition Failed Exception if programmingLanguage isn't in the good format", async () => {
            try {
                await pipe.transform({ programmingLanguage: "A language" }, arg);
                fail("Validation should have failed");
            } catch (e) {
                expect(e).to.be.instanceOf(HttpException);
                expect(e.status).to.be.equal(HttpStatus.PRECONDITION_FAILED);
            }
        });

        it("Should return the same value after validation", async () => {
            try {
                const value = await pipe.transform({ programmingLanguage: "5bde6ec00000000000000000" }, arg);
                expect(value).to.be.deep.equal({ programmingLanguage: "5bde6ec00000000000000000" });
            } catch (e) {
                fail("Validation should not fail");
            }
        });
    });
});
