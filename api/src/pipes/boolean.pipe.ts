import { PipeTransform, ArgumentMetadata, HttpStatus, Injectable, HttpException } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

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
