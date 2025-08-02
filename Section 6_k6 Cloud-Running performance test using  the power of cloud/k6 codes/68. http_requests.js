import http from 'k6/http';
import { group, check } from 'k6';

export const options = {
    vus: 100,
    duration: '1s'
}

export default function () {
    group("Testing Grafana cloud test", function() {
        const crocodiles = http.get('https://test-api.k6.io/public/crocodiles/');
        console.log(crocodiles.status);
        console.log(crocodiles.body);
        check(crocodiles, {
            "response code was 200 of crocodile API": (res) => res.status == 200,
            "body size was 1234 bytes of crocodile API": (res) => res.body.length < 1234
           });
    
        const crocodile = http.get(`https://test-api.k6.io/public/crocodiles/1/`)
        check(crocodile, {
            "response code was 200 of crocodiles API": (res) => res.status == 200,
            "body size was 1234 bytes of crocodiles API": (res) => res.body.length < 1234
           });
    })
}