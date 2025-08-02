import http from 'k6/http';
import { check, group } from 'k6';

export default function() {
    const crocodileId = 7;
    let res = http.get('https://test-api.k6.io/public/crocodiles/'+ crocodileId +''); // -> this is corellating requests

    console.log("res.json().name: ", res.json().name); // INFO[0003] res.json().name:  undefined                   source=console

    group('Testing all names', function() {
        check(res, {
            'status is 200 ok': (r) => r.status === 200,
            'crocodile is Sobek': (r) => r.body.includes('Sobek'),
        });
    })

    group('Testing all sex', function() {
        check(res, {
            'status is 200 ok': (r) => r.status === 200,
            'crocodile is Female': (r) => r.body.includes('F')
        });
    })
}