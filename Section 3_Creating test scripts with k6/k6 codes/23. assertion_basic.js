import http from 'k6/http';
import { check } from 'k6';

export default function () {
    const res = http.get('https://test.k6.io/');
    check(true, {
        'This is very basic assertion': function(value) {
            return value === true;
          }
    })
}