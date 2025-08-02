import http from 'k6/http';
import { check } from 'k6';

export const options = {
    vus: 1,
    duration: '1s'
}

export default function() {
    const res = http.get('https://test-api.k6.io/public/crocodiles/');
    console.log(JSON.stringify(res));
}

// For debugging -> k6 run --http-debug="full" '.\41. making_a_get_request.js'