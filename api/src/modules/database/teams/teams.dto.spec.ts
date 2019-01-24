import { fail } from 'assert';
import { expect } from "chai";
import { ArgumentMetadata, HttpException, HttpStatus } from '@nestjs/common';
import { ValidationPipe } from '../../../pipes/validation.pipe';
import { CreateTeamDto } from './teams.dto';

describe("TeamsDto", () => {
    const pipe = new ValidationPipe();

    describe("CreateTeamDto", () => {
        const arg = { metatype: CreateTeamDto } as ArgumentMetadata;
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
    });
});
