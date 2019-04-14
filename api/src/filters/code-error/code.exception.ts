export class CodeException {
    constructor(public code: number) {
    }
}

export class UnkownCodeException extends CodeException {
    constructor() {
        super(0);
    }
}
