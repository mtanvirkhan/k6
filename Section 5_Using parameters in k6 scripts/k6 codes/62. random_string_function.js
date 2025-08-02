import http from "k6/http";
import { group, check } from "k6";
import { randomString } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

export const options = {
    vus: 5,
    duration: '5s'
}

export default function() { 
    group('Post module', function(){
        const body = JSON.stringify({
            username: 'test_' + randomString(6, `TANVIR`),
            password: 'test_' + randomString(6, `ADIYAT`)
        });

        console.log(body);

        const params = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        let res = http.post('https://test-api.k6.io/user/register/', body, params);
        //console.log(res.json());
        console.log(res.status);

        check(res,{
            "check response code is 201": (r) => r.status === 201,
            "check method is POST, OPTIONS": (r) => r.headers['Allow'] === 'POST, OPTIONS'
        })
    });
}