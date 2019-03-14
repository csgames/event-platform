import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class BooleanPipe implements PipeTransform<boolean> {
    async transform(value, metadata: ArgumentMetadata) {
        if (value === "true") {
            return true;
        } else if (value === "false") {
            return false;
        } else if (typeof value === "object") {
            for (const key in value) {
                if (!(key in value)) {
                    continue;
                }
                value[key] = await this.transform(value[key], metadata);
            }
        }

        return value;
    }
}
