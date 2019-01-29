export namespace DateUtils {
    export function notNull(date: string) {
        return date && date !== "0000-00-00";
    }

    export function fromString(date: string) {
        if (notNull(date)) {
            const data = date.split("-");
            const res = new Date(Date.UTC(+data[0], +data[1] - 1, +data[2]));
            res.setMinutes(res.getMinutes() + res.getTimezoneOffset());
            return res;
        }
        return null;
    }

    export function fromDate(date: Date) {
        const m = date.getUTCMonth() + 1;
        const month = m > 9 ? m.toString() : `0${m}`;
        const day = date.getUTCDate() > 9 ? date.getUTCDate().toString() : `0${date.getUTCDate()}`;
        return `${date.getUTCFullYear()}-${month}-${day}`;
    }

    export function currentYear() {
        return new Date().getUTCFullYear();
    }
}
