export class DateUtils {
    public static nowUTC(): Date {
        const now = new Date();
        return new Date(Date.UTC(
            now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(),
            now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds())
        );
    }
}
