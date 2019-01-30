export namespace ObjectUtils {
    export function rebuildObjectIfBroken(value: any): Object {
        if (!(value instanceof Object)) {
            let newRealOPObject = {};
            for (let key in value) {
                if (key in value) {
                    if (value[key] === 'true') {
                        newRealOPObject[key] = true;
                    } else if (value[key] === 'false') {
                        newRealOPObject[key] = false;
                    } else {
                        newRealOPObject[key] = value[key];
                    }
                }
            }
            return newRealOPObject;
        }
        return value;
    }
}
