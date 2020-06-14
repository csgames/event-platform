import { TrackTypes } from "../api/models/puzzle-hero";

export namespace TrackUtils {
    export function getTrackTypeIconClass(type: TrackTypes): string {
        switch (type) {
            case TrackTypes.Crypto:
                return "fa fa-key";
            case TrackTypes.Gaming:
                return "fa fa-gamepad";
            case TrackTypes.Scavenger:
                return "fa fa-camera";
            case TrackTypes.Sponsor:
                return "fa fa-gem";
            case TrackTypes.Vine:
                return "fab fa-vine";
            case TrackTypes.EsotericLanguages:
                return "fa fa-atlas";
            case TrackTypes.DataAnalysis:
                return "fa fa-chart-bar";
            case TrackTypes.Recon:
                return "fa fa-user-secret";
            case TrackTypes.Steganography:
                return "fa fa-search";
            case TrackTypes.Debugging:
                return "fa fa-bug";
            case TrackTypes.Forensics:
                return "fa fa-hdd";
            case TrackTypes.Charades:
                return "fa fa-comment";
            case TrackTypes.ReverseEngineering:
                return "fa fa-microscope";
            case TrackTypes.CodeGolf:
                return "fa fa-golf-ball";
            case TrackTypes.Regex:
                return "fa fa-slash";
            case TrackTypes.Scripting:
                return "fa fa-laptop-code";
            case TrackTypes.Food:
                return "fa fa-utensils";
            case TrackTypes.Karaoke:
                return "fa fa-music";
            case TrackTypes.Pwning:
                return "fa fa-skull";
            case TrackTypes.Authentication:
                return "fa fa-mobile";
            case TrackTypes.StaticAnalysis:
                return "fa fa-file-code";
            case TrackTypes.ArtificialIntelligence:
                return "fa fa-robot";
            case TrackTypes.OffensiveSecurity:
                return "fa fa-khanda";
            case TrackTypes.DefensiveSecurity:
                return "fa fa-shield-alt";
        }
        return "";
    }
}
