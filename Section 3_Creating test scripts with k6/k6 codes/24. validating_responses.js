import http from 'k6/http';
import { check } from 'k6';

export default function () {
    const res = http.get('https://test.k6.io/');
    check(res, {
        'Status code is 200': function(res_value) {
            return res_value.status === 200;
          },
        'Page is startpage': function(res_value) {
            return res_value.body.includes('Collection of simple web-pages suitable for load testing') === true;
          }
    })
}
