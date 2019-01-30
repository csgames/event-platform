import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { ObjectUtils } from '../utils/object.utils';

@Injectable()
export class NullPipe implements PipeTransform<boolean> {
    public transform(value: string | Object, metadata: ArgumentMetadata) {
        if (typeof value === "string") {
            return null;
        }

        value = ObjectUtils.rebuildObjectIfBroken(value);
        for (const key in value) {
            if (value.hasOwnProperty(key)) {
                const data = value[key];
                if (data === 'null') {
                    value[key] = null;
                }
            }
        }

        return value;
    }
}
