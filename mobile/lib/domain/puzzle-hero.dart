class PuzzleInfo {
    String id;
    String label;
    Map<String, dynamic> description;
    bool completed;
    bool locked;

    PuzzleInfo({
        this.label,
        this.completed,
        this.locked,
        this.description
    });

    PuzzleInfo.fromMap(Map<String, dynamic> map) {
        id = map["_id"];
        label = map["label"];
        description = Map.castFrom<String, dynamic, String, String>(map['description'] ?? {});
        completed = map["completed"];
        locked = map["locked"];
    }
}

class Track {
    String id;
    String label;
    List<PuzzleInfo> puzzles;
    DateTime releaseDate;
    DateTime endDate;

    Track({
        this.id,
        this.label,
        this.puzzles,
        this.releaseDate,
        this.endDate
    });

    Track.fromMap(Map<String, dynamic> map) {
        id = map["_id"];
        label = map["label"];
        puzzles = List.castFrom<dynamic, PuzzleInfo>(map["puzzles"].map((puzzle) => PuzzleInfo.fromMap(puzzle)).toList());
        releaseDate = DateTime.parse(map["releaseDate"]);
        endDate = DateTime.parse(map["endDate"]);
    }
}

class PuzzleHero {
    List<Track> tracks;
    DateTime releaseDate;
    DateTime endDate;

    PuzzleHero({
        this.tracks,
        this.releaseDate,
        this.endDate
    });

    PuzzleHero.fromMap(Map<String, dynamic> map) {
        tracks = List.castFrom<dynamic, Track>(map["tracks"].map((track) => Track.fromMap(track)).toList());
        releaseDate = DateTime.parse(map["releaseDate"]);
        endDate = DateTime.parse(map["endDate"]);
    }
}
