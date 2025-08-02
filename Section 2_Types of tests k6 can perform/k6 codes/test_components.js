import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    vus: 10,
    duration: '10s'
}

export default function () {
    const payload = JSON.stringify({
        name: 'lorem',
        surname: 'ipsum'
    });

    const headers = {'Content-Type': 'application/json'};
    http.post('https://httpbin,test,k6.io/post', payload, {headers});
    sleep(1);
}