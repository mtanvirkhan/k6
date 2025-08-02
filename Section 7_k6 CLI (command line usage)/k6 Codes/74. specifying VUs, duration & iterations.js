import http from 'k6/http';
import { group, check } from 'k6';

/*
export const options = {
    vus: 1,
    duration: '1s',
    cloud: {
        projectID: 3704066
    }
}
    */

export default function () {
    group("Testing Grafana cloud test", function() {
    
        const crocodiles = http.get('https://test-api.k6.io/public/crocodiles/');
        //console.log(crocodiles.status);
        console.log(crocodiles.body);
        check(crocodiles, {
            "response code was 200 of crocodile API": (res) => res.status == 200,
            "body size was 1234 bytes of crocodile API": (res) => res.body.length < 1234
           });
        
        const crocodile = http.get(`https://test-api.k6.io/public/crocodiles/1/`)
        console.log(crocodile.body);
        check(crocodile, {
            "response code was 200 of crocodiles API": (res) => res.status == 200,
            "body size was 1234 bytes of crocodiles API": (res) => res.body.length < 1234
           });
        
    })
}