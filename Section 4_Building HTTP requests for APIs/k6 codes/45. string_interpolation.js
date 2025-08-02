import http from 'k6/http';
import { check, group } from 'k6';

export default function() {
    let res = http.get('https://test-api.k6.io/public/crocodiles/');
    const crocodiles = res.json();
    console.log(crocodiles[6].id);

    const crocodileId = crocodiles[6].id;
    const crocodileName = crocodiles[6].name;
    res = http.get(`https://test-api.k6.io/public/crocodiles/${crocodileId}`); // -> this is string interpolation

    // console.log("res.json().name: ", res.json().name); // INFO[0003] res.json().name:  undefined                   source=console

    group('Testing all names', function() {
        check(res, {
            'status is 200 ok': (r) => r.status === 200,
            'crocodile is Sobek': (r) => r.json().name === crocodileName
        });
    })

    group('Testing all sex', function() {
        check(res, {
            'status is 200 ok': (r) => r.status === 200,
            'crocodile is Female': (r) => r.body.includes('F')
        });
    })
}