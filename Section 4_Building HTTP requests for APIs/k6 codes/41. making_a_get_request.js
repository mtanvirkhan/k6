import http from 'k6/http';
import { check } from 'k6';

export const options = {
    vus: 1,
    duration: '1s'
}

export default function() {
    const res = http.get('https://test-api.k6.io/public/crocodiles/');
    console.log(res);
}