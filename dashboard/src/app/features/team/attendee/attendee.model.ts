export class AttendeeModelUI {
    Name: string;
    Email: string;
    IsRegistered: boolean;
    Website: string;
    LinkedIn: string;
    Github: string;

    constructor(name: string, email: string, isRegistered: boolean, website: string, linkedIn: string, github: string) {
        this.Name = name;
        this.Email = email;
        this.IsRegistered = isRegistered;
        this.Website = website;
        this.LinkedIn = linkedIn;
        this.Github = github;
    }
}
