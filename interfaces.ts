export interface JourneyRecord {
    id: string;
    rented_at: string;
    returned_at: string;
    geolocation_json: string;
}

export interface JourneyRow {
    id: string;
    rentedTime: string;
    returnedTime: string;
    rentedLocationLat: number;
    rentedLocationLong: number;
    returnedLocationLat: number;
    returnedLocationLong: number;
}

export interface Journey {
    id: string;
    rentedTime: string;
    returnedTime: string;
    rentedLocation: Location;
    returnedLocation: Location;
}

export interface Location {
    latitude: number;
    longitude: number;
}
