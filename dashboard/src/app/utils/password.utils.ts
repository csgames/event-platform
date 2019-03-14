export class PasswordUtils {
    public static shuffle(array: string[]): string[] {
        return array.sort(() => 0.5 - Math.random());
    }

    public static generatePassword(): string {
        const lowercase = this.shuffle("abcdefghijklmnopqrstuvwxyz".split(""));
        const uppercase = this.shuffle("ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""));
        const numbers = this.shuffle("0123456789".split(""));

        const all = [...lowercase, ...uppercase, ...numbers];

        const lowerCaseLetter = lowercase[0];
        const upperCaseLetter = uppercase[0];
        const number = numbers[0];
        const rest = this.shuffle(all).slice(0, Math.floor(Math.random() * 4) + 5);
        return this.shuffle([lowerCaseLetter, upperCaseLetter, number, ...rest]).join("");
    }
}
