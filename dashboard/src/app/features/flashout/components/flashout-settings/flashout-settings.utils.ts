import { FlashoutSettingsDto } from "./dto/flashout-settings.dto";
import { Event } from "../../../../api/models/event";

export namespace FlashoutSettingsUtils {
    export function flashoutSettingsDtoToEvent(dto: FlashoutSettingsDto): { flashoutBeginDate: Date, flashoutEndDate: Date } {
        const flashoutBeginDate = dto.flashoutBeginDate;
        flashoutBeginDate.setHours(dto.beginTime.getHours(), dto.beginTime.getMinutes(), 0);
        const flashoutEndDate = dto.flashoutEndDate;
        flashoutEndDate.setHours(dto.endTime.getHours(), dto.endTime.getMinutes(), 0);

        return {
            flashoutBeginDate,
            flashoutEndDate
        };
    }

    export function eventToFlashoutSettingsDto(event: Event): FlashoutSettingsDto {
        return {
            ...event,
            flashoutBeginDate: new Date(event.flashoutBeginDate),
            beginTime: new Date(event.flashoutBeginDate),
            flashoutEndDate: new Date(event.flashoutEndDate),
            endTime: new Date(event.flashoutEndDate)
        };
    }
}
