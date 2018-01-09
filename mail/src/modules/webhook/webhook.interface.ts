export interface DeliveredWebHook {
    event: "delivered";
    recipient: string;
    domain: string;
    messageHeaders: MessageHeader;
    messageId: string;
    timestamp: string;
    token: string;
    signature: string;
}

export interface DroppedWebHook {
    event: "dropped";
    recipient: string;
    domain: string;
    messageHeaders: MessageHeader;
    reason: "hardfail" | "old";
    code?: string; // ESP (spam) code
    description: string; // Detailed reason
    timestamp: string;
    token: string;
    signature: string;
}

export interface MessageHeader {
    received?: string;
    contentType?: Object;
    mimeVersion?: number;
    subject?: string;
    from?: string;
    to?: string;
    messageId?: string;
    mailgunVariable?: Object;
    date?: Date;
    sender?: string;
}
