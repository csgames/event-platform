class Guide {
    Map<String, List<dynamic>> bring;
    School school;
    Hotel hotel;
    Parking parking;
    Restaurant restaurant;
    Transport transport;

    Guide.fromMap(Map<String, dynamic> map) {
        if (map == null) {
            return;
        }
        if (map['bring'] != null) {
            bring = Map.castFrom<dynamic, dynamic, String, List<dynamic>>(map['bring']);
        }
        if (map['school'] != null) {
            school = School.fromMap(map['school']);
        }
        if (map['hotel'] != null) {
            hotel = Hotel.fromMap(map['hotel']);
        }
        if (map['parking'] != null) {
            parking = Parking.fromMap(map['parking']);
        }
        if (map['transport'] != null) {
            transport = Transport.fromMap(map['transport']);
        }
        if (map['restaurant'] != null) {
            restaurant = Restaurant.fromMap(map['restaurant']);
        }
    }
}

class School {
    double latitude;
    double longitude;
    double zoom;
    String address;
    String name;
    List<String> maps;
    Map<String, String> website;

    School.fromMap(Map<String, dynamic> map) {
        latitude = map['latitude'];
        longitude = map['longitude'];
        zoom = map['zoom'].toDouble();
        address = map['address'];
        name = map['name'];
        maps = List.castFrom<dynamic, String>(map['maps']);
        website = Map.castFrom<dynamic, dynamic, String, String>(map['website']);
    }
}

class Hotel {
    double latitude;
    double longitude;
    double zoom;
    String name;
    String address;

    Hotel.fromMap(Map<String, dynamic> map) {
        latitude = map['latitude'];
        longitude = map['longitude'];
        zoom = map['zoom'].toDouble();
        address = map['address'];
        name = map['name'];
    }
}

class Parking {
    double latitude;
    double longitude;
    double zoom;
    List<ParkingCoordinate> coordinates;

    Parking.fromMap(Map<String, dynamic> map) {
        latitude = map['latitude'];
        longitude = map['longitude'];
        zoom = map['zoom'].toDouble();
        coordinates = List.castFrom<dynamic, ParkingCoordinate>(map['coordinates'].map((c) => ParkingCoordinate.fromMap(c)).toList());
    }
}

class Restaurant {
    double latitude;
    double longitude;
    double zoom;
    List<RestaurantCoordinate> coordinates;

    Restaurant.fromMap(Map<String, dynamic> map) {
        latitude = map['latitude'];
        longitude = map['longitude'];
        zoom = map['zoom'].toDouble();
        coordinates = List.castFrom<dynamic, RestaurantCoordinate>(map['coordinates'].map((c) => RestaurantCoordinate.fromMap(c)).toList());
    }
}

class Transport {
    Map<String, dynamic> info;
    String image;
    String school;
    String hotel;
    double hotelLatitude;
    double hotelLongitude;
    double schoolLatitude;
    double schoolLongitude;

    Transport.fromMap(Map<String, dynamic> map) {
        info = Map.castFrom<dynamic, dynamic, String, dynamic>(map['info']);
        image = map['image'];
        school = map['school'];
        hotel = map['hotel'];
        hotelLatitude = map['hotelLatitude']?.toDouble();
        hotelLongitude = map['hotelLongitude']?.toDouble();
        schoolLatitude = map['schoolLatitude']?.toDouble();
        schoolLongitude = map['schoolLongitude']?.toDouble();
    }
}

class ParkingCoordinate {
    double latitude;
    double longitude;

    ParkingCoordinate.fromMap(Map<String, dynamic> map) {
        if (map == null) {
            return;
        }
        latitude = map['latitude']?.toDouble();
        longitude = map['longitude']?.toDouble();
    }
}

class RestaurantCoordinate {
    double latitude;
    double longitude;
    String info;

    RestaurantCoordinate.fromMap(Map<String, dynamic> map) {
        if (map == null) {
            return;
        }
        latitude = map['latitude']?.toDouble();
        longitude = map['longitude']?.toDouble();
        info = map['info'];
    }
}
