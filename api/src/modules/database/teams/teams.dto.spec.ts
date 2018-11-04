import { fail } from 'assert';
import { expect } from "chai";
import { ArgumentMetadata, HttpException, HttpStatus } from '@nestjs/common';
import { ValidationPipe } from '../../../pipes/validation.pipe';
import { CreateOrJoinTeamDto } from './teams.dto';

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
});
