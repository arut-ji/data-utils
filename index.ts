import {Journey, JourneyRecord, JourneyRow} from "./interfaces";
import fs from 'fs';

const converter = require('json-2-csv');
const journeys: JourneyRecord[] = require('./journeys.json');

async function main() {
    const result = journeys
        .map((journey: JourneyRecord): Journey => {
            const {id, rented_at, returned_at} = journey;
            const geolocation_json = JSON.parse(journey.geolocation_json);
            const returnedLocation = geolocation_json[geolocation_json.length - 1];
            const rentedLocation = geolocation_json[0];
            return {
                id,
                rentedTime: rented_at,
                returnedTime: returned_at,
                returnedLocation,
                rentedLocation
            }
        });

    const csvRows: JourneyRow[] = result
        .map((journey: Journey) => {

            const {returnedLocation, rentedLocation, id, returnedTime, rentedTime} = journey;
            return {
                id,
                rentedTime, returnedTime,
                rentedLocationLat: rentedLocation.latitude,
                rentedLocationLong: rentedLocation.longitude,
                returnedLocationLat: returnedLocation.latitude,
                returnedLocationLong: returnedLocation.longitude,
            }
        });

    const csvResult = await converter.json2csvAsync(csvRows, {
        prependHeader: false,
    });
    fs.writeFile(`journey-${Date.now()}.csv`, csvResult, 'utf8', function (err) {
        if (err) {
            console.log('Some error occured - file either not saved or corrupted file saved.');
        } else {
            console.log('It\'s saved!');
        }
    });
}

main();
