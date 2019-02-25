class Guide {
    Map<String, List<dynamic>> bring;
    School school;
    Hotel hotel;
    Parking parking;
    Restaurant restaurant;
    Transport transport;

    Guide.fromMap(Map<String, dynamic> map) {
        bring = Map.castFrom<dynamic, dynamic, String, List<dynamic>>(map['bring']);
        school = School.fromMap(map['school']);
        hotel = Hotel.fromMap(map['hotel']);
        parking = Parking.fromMap(map['parking']);
        transport = Transport.fromMap(map['transport']);
        restaurant = Restaurant.fromMap(map['restaurant']);
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
        hotelLatitude = map['hotelLatitude'];
        hotelLongitude = map['hotelLongitude'];
        schoolLatitude = map['schoolLatitude'];
        schoolLongitude = map['schoolLongitude'];
    }
}

class ParkingCoordinate {
    double latitude;
    double longitude;

    ParkingCoordinate.fromMap(Map<String, dynamic> map) {
        latitude = map['latitude'];
        longitude = map['longitude'];
    }
}

class RestaurantCoordinate {
    double latitude;
    double longitude;
    String info;

    RestaurantCoordinate.fromMap(Map<String, dynamic> map) {
        latitude = map['latitude'];
        longitude = map['longitude'];
        info = map['info'];
    }
}
