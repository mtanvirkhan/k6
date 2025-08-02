// https://k6.io/docs/javascript-api/jslib/utils/randomitem/

import http from "k6/http";
import { check, group, sleep} from "k6";
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

export const options = {
    vus: 5
}

export default function() {
    
    group("Crocodiles", function() {

        const all_crocodiles = http.get(`https://test-api.k6.io/public/crocodiles/`);
        console.log(all_crocodiles.json());
        let crocodile_single_id = all_crocodiles.json()[0].id;
        console.log(crocodile_single_id);
        let crocodile_mul_ids = [];

        // Parse the JSON string into an array of objects
        const crocodileArray = all_crocodiles.json();
        console.log(crocodileArray.length);
        for (let i = 0; i < crocodileArray.length; i++) {
            crocodile_mul_ids.push(crocodileArray[i].id);
        }
        
        console.log(crocodile_mul_ids);
        let randomInput = randomItem(crocodile_mul_ids);
        console.log(randomInput);

        check(all_crocodiles, {
            "Status is ok 200 for crocodiles API": (r) => (r).status === 200
        })

        const crocodile = http.get(`https://test-api.k6.io/public/crocodiles/${randomInput}/`);
        console.log(crocodile.json());

        check(crocodile, {
            "Status is ok 200 for crocodile API": (r) => (r).status === 200
        })
    })
}