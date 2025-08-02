import http from 'k6/http';
import { check, group } from 'k6';

export default function() {
    let res = http.get('https://test-api.k6.io/public/crocodiles');
    let res1 = http.get('https://test-api.k6.io/public/crocodiles/7');
    console.log("res: ", res);
    console.log("res.json(): ", res.json());
    console.log("res.json().name: ", res.json().name); // INFO[0003] res.json().name:  undefined                   source=console
    console.log("res1.json().name: ", res1.json().name); // INFO[0003] res1.json().name:  Sobek                      source=console

    group('Testing all names', function() {
        check(res, {
            'status is 200 ok': (r) => r.status === 200,
            'crocodile is Sobek': (r) => r.body.includes('Sobek'),
            'crocodile is Solomon': (r) => r.body.includes('Solomon')
        });
    })

    group('Testing all sex', function() {
        check(res, {
            'status is 200 ok': (r) => r.status === 200,
            'crocodile is Male': (r) => r.body.includes('M'),
            'crocodile is Female': (r) => r.body.includes('F')
        });
    })
}