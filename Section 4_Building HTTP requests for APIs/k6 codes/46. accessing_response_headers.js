import http from 'k6/http';
import { check, group } from 'k6';

export default function() {
    let res = http.get('https://test-api.k6.io/public/crocodiles/');
    const crocodiles = res.json();
    console.log('ID: ', crocodiles[6].id);

    const crocodileId = crocodiles[6].id;
    const crocodileName = crocodiles[6].name;
    res = http.get(`https://test-api.k6.io/public/crocodiles/${crocodileId}`); // -> this is string interpolation

    // console.log("res.json().name: ", res.json().name); // INFO[0003] res.json().name:  undefined                   source=console

    group('Testing all names of response body', function() {
        check(res, {
            'status is 200 ok': (r) => r.status === 200,
            'crocodile is Sobek': (r) => r.json().name === crocodileName
        });
    });

    group('Testing all sex of response body', function() {
        check(res, {
            'status is 200 ok': (r) => r.status === 200,
            'crocodile is Female': (r) => r.body.includes('F')
        });
    });

    //========================== Header data access and assertion =============================================
    console.log('Response header: ', res.headers);
    console.log('Response headers parameter "Content-Type": ', res.headers['Content-Type']);
    console.log('Response headers parameter "Allow": ', res.headers['Allow']);

    group('Testing header key-parameter information', function() {
        check(res, {
            'status is 200 ok': (r) => r.status === 200,
            '"Content-Type" is "application/json"': (r) => r.headers['Content-Type'] === 'application/json',
            '"Allow" is "GET, HEAD, OPTIONS"': (r) => r.headers['Allow'] === 'GET, HEAD, OPTIONS'
        });
    });
}