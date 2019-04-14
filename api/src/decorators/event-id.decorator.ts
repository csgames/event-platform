import { createParamDecorator } from "@nestjs/common";
import { IRequest } from "../models/i-request";

export const EventId = createParamDecorator((data: void, req: IRequest) => {
    return req.eventId;
});
