export interface EmailMessage {
    from: string;
    to: string | string[];
    cc?: string;
    bcc?: string;
    subject: string;
    text: string;
    html: string;
    "o:tag"?: string[];
    "o:testmode"?: "yes" | "no";
    "o:tracking"?: "yes" | "no";
    "o:tracking-opens"?: "yes" | "no";
}
