import { CompetitionSettingsDto } from "./dto/competition-settings.dto";
import { Event } from "../../../../../api/models/event";

export namespace CompetitionSettingsUtils {
    export function competitionSettingsDtoToEvent(dto: CompetitionSettingsDto): Event {
        return {
            competitionResultsLocked: dto.open
        };
    }

    export function eventToCompetitionSettingsDto(event: Event): CompetitionSettingsDto {
        return {
            ...event,
            open: event.competitionResultsLocked
        };
    }
}
