import { TrackFormDto } from "./components/track-form/dto/track-form.dto";
import { CreateTrackDto, UpdateTrackDto } from "../../../api/dto/puzzle-hero";
import { Track } from "../../../api/models/puzzle-hero";

export namespace PuzzleAdminUtils {
    export function trackFormDtoToTrackDto(trackFormDto: TrackFormDto): CreateTrackDto | UpdateTrackDto {
        const releaseDate = trackFormDto.releaseDate;
        releaseDate.setHours(trackFormDto.releaseTime.getHours(), trackFormDto.releaseTime.getMinutes(), 0);
        const endDate = trackFormDto.endDate;
        endDate.setHours(trackFormDto.endTime.getHours(), trackFormDto.endTime.getMinutes(), 0);

        return {
            label: trackFormDto.label,
            type: trackFormDto.type,
            endDate,
            releaseDate
        };
    }

    export function trackToTrackFormDto(track: Track): TrackFormDto {
        return {
            ...track,
            releaseDate: new Date(track.releaseDate),
            releaseTime: new Date(track.releaseDate),
            endDate: new Date(track.endDate),
            endTime: new Date(track.endDate)
        };
    }
}
