import * as express from "express";
import { AttendeesController } from './attendees.controller';
import { IMock, Mock, It, Times } from 'typemoq';
import { AttendeesService } from './attendees.service';
import { CreateAttendeeDto } from './attendees.dto';

describe('AttendeesController Tests', () => {
    let attendeeServiceMock: IMock<AttendeesService>;
    let reqMock: IMock<express.Request>
    let createAttendeeDtoMock: IMock<CreateAttendeeDto>

    let controller: AttendeesController;

    beforeEach(() => {
        attendeeServiceMock = Mock.ofType<AttendeesService>();

        reqMock = Mock.ofType<express.Request>();
        createAttendeeDtoMock = Mock.ofType<CreateAttendeeDto>();

        controller = new AttendeesController(attendeeServiceMock.object);
    });

    it('Calling create - Should call attendeeService.create', async () => {
        // Act
        await controller.create(reqMock.object, createAttendeeDtoMock.object);

        // Assert
        attendeeServiceMock.verify(x => x.create(It.isAny()), Times.once());
    });

    it('Calling getAll - Should call attendeeService.findAll', async () => {
        // Act
        await controller.getAll();

        // Assert
        attendeeServiceMock.verify(x => x.findAll(), Times.once());
    });
});