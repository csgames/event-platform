import { ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import { DeliveredWebHook, DroppedWebHook, MessageHeader } from "./webhook.interface";

@Injectable()
export class WebHookPipe implements PipeTransform<any> {
    async transform(body, metadata: ArgumentMetadata) {
        if (!body.event) {
            console.log("Missing event type.");
            throw new HttpException("", HttpStatus.BAD_REQUEST);
        }

        let messageHeaders: MessageHeader = this.parseMessageHeader(body["message-headers"]);
        if (body.event === "delivered") {
            return <DeliveredWebHook> {
                event: "delivered",
                recipient: body.recipient,
                domain: body.domain,
                messageHeaders: messageHeaders,
                messageId: body["Message-Id"],
                timestamp: body.timestamp,
                token: body.token,
                signature: body.signature
            };
        } else if (body.event === "dropped") {
            return <DroppedWebHook> {
                event: "dropped",
                recipient: body.recipient,
                domain: body.domain,
                messageHeaders: messageHeaders,
                reason: body.reason,
                code: body.code,
                description: body.description,
                timestamp: body.timestamp,
                token: body.token,
                signature: body.signature
            };
        } else {
            console.log("Unknown event type.");
            throw new HttpException("", HttpStatus.BAD_REQUEST);
        }
    }

    private parseMessageHeader(rawMessageHeaders: string): MessageHeader {
        let messageHeader: Partial<MessageHeader> = {};

        let headerList = <string[][]> JSON.parse(rawMessageHeaders);
        for (let header of headerList) {
            if (header[0] === "Received") {
                messageHeader.received = header[1];
            } else if (header[0] === "Content-Type") {
                messageHeader.contentType = header[1];
            } else if (header[0] === "Mime-Version") {
                messageHeader.mimeVersion = Number(header[1]);
            } else if (header[0] === "Subject") {
                messageHeader.subject = header[1];
            } else if (header[0] === "From") {
                messageHeader.from = header[1];
            } else if (header[0] === "To") {
                messageHeader.to = header[1];
            } else if (header[0] === "Message-Id") {
                messageHeader.messageId = header[1];
            } else if (header[0] === "X-Mailgun-Variables") {
                messageHeader.mailgunVariable = JSON.parse(header[1]);
            } else if (header[0] === "Date") {
                messageHeader.date = new Date(header[1]);
            } else if (header[0] === "Sender") {
                messageHeader.sender = header[1];
            }
        }

        return <MessageHeader> messageHeader;
    }
}
