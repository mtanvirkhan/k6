import http from "k6/http";
import { group, check, sleep } from "k6";
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

export const options = {
    vus: 5,
    duration: '20s'
}

export default function () {
    __ENV.baseUrl = 'https://test-api.k6.io';
    const res = http.get(`${__ENV.baseUrl}/public/crocodiles/`);
    console.log("Before sleep - VU stage -");
    //sleep(5);
    sleep(randomIntBetween(1,5));
    console.log("After sleep - VU stage -");
}