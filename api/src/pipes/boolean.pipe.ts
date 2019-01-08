import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class BooleanPipe implements PipeTransform<boolean> {
    async transform(value, metadata: ArgumentMetadata) {
        if (value === "true") {
            return true;
        } else if (value === "false") {
            return false;
        }

        return value;
    }
}
