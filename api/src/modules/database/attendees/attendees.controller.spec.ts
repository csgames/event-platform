import { AttendeesController } from './attendees.controller';
// import { IMock, Mock, It, Times } from 'typemoq';
import { AttendeesService } from './attendees.service';
import { SchoolsService } from "../schools/schools.service";
import { CreateAttendeeDto } from "./attendees.dto";

describe('AttendeesController Tests', () => {
    // let attendeeServiceMock: IMock<AttendeesService>;
    // let schoolServiceMock: IMock<SchoolsService>;
    // let createAttendeeDtoMock: IMock<CreateAttendeeDto>;
    //
    // let controller: AttendeesController;

    /*beforeEach(() => {
        attendeeServiceMock = Mock.ofType<AttendeesService>();
        schoolServiceMock = Mock.ofType<SchoolsService>();

        attendeeServiceMock.setup(x => x.create(It.isAny())).returns(() => new Promise<any>((r, rj) => r()));
        schoolServiceMock.setup(x => x.findOne(It.isAny())).returns(() => It.isAny());

        createAttendeeDtoMock = Mock.ofType<CreateAttendeeDto>();

        controller = new AttendeesController(attendeeServiceMock.object, schoolServiceMock.object);
    });

    it('Calling create - Should call attendeeService.create', async () => {
        // Act
        await controller.create('', createAttendeeDtoMock.object);

        // Assert
        attendeeServiceMock.verify(x => x.create(It.isAny()), Times.once());
    });

    it('Calling getAll - Should call attendeeService.findAll', async () => {
        // Act
        await controller.getAll();

        // Assert
        attendeeServiceMock.verify(x => x.findAll(), Times.once());
    });*/
});
