import http from "k6/http";
import { check } from "k6";

export let options = {
    thresholds: {
        http_reqs: ['count<10']
    }
}

export default function () {
    let res  = http.get('https://test.k6.io/');
    check(res, {
        'status 200 is ok': function (r) {
            return r.status === 200
        }
    })
}