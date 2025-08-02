import http from "k6/http";
import { check } from "k6";
import { Trend } from "k6/metrics";

export const options = {
    thresholds: { //adding tags in thresholds
        http_req_duration: ['p(95)<300'],
        'http_req_duration{status:200}': ['p(95)<300'],
        'http_req_duration{url:https://run.mocky.io/v3/2629831c-9eec-4cb4-ab10-78ed44fab53d}': ['p(95)<300'],
        'http_req_duration{status:201}': ['p(95)>300'],
        my_trend: ['avg<300'] //adding tags in custom metrics
    },
    tags: {
        my_tag: 'what the hell'
    }
}

const myTrend = new Trend('my_trend');

export default function () {
    http.get('https://run.mocky.io/v3/2629831c-9eec-4cb4-ab10-78ed44fab53d');
    http.get('https://run.mocky.io/v3/81e73108-4dd3-4b4d-9a63-7e7fe4978b3c?mocky-delay=2000ms');

    const res = http.get('https://httpbin.test.k6.io');

    check(res, {'status is 200 OK': function(r) {return r.status === 200}}, {my_tag: 'what the hell'}) // adding tags in checks
    myTrend.add(res.timings.connecting, {my_tag: 'what the hell'});
}