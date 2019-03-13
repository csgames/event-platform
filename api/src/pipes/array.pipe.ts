import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class ArrayPipe implements PipeTransform<any> {
    public transform(value: string, metadata: ArgumentMetadata) {
        if (typeof value === "string") {
            return value.replace(" ", "").split(",");
        }

        return [value];
    }
}
