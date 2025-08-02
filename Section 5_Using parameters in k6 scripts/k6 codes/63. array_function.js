import http from "k6/http";
import { check, group, sleep} from "k6";

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
        // let crocodileArray = [1, 2, 3, 4, 5];
        console.log(crocodileArray.length);
        // Loop through the crocodile objects to extract ids
        for (let i = 0; i < crocodileArray.length; i++) {
            crocodile_mul_ids.push(crocodileArray[i].id);
        }
        
        console.log(crocodile_mul_ids);


        check(all_crocodiles, {
            "Status is ok 200 for crocodiles API": (r) => (r).status === 200
        })

        for(let i = 0; i < crocodile_mul_ids.length; i++) {
            const crocodile = http.get(`https://test-api.k6.io/public/crocodiles/${crocodile_mul_ids[i]}/`);
            console.log(crocodile.json());
    
            check(crocodile, {
                "Status is ok 200 for crocodile API": (r) => (r).status === 200
            })
        }
    })
}