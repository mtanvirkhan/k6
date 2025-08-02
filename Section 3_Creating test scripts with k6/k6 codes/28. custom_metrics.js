import http from 'k6/http';
import { check } from 'k6';
import { sleep } from 'k6';
import { Counter, Trend } from 'k6/metrics';

export const options = {
  vus: 10,
  duration: '5s',
  thresholds: {
    checks: ['rate==1.0'],
    data_received: ['count<1000'],
    http_req_blocked: ['avg<300', 'min<300', 'med<300', 'max<700', 'p(95)<700', 'p(90)<700'],
    http_req_duration: ['avg<300', 'min<300', 'med<300', 'max<600', 'p(95)<600', 'p(90)<300'],
    http_req_duration: ['max<2000'],
    http_req_failed: ['rate<0.01'],
    http_reqs: ['count>20', 'rate>4'],
    vus: ['value>=5'],
    my_counter: ['count==80'],
    waiting_time: ['avg<300'],
    response_time_news_page: ['min<300', 'p(99)<300']
  }
}
//Each metric type has a constructor to create a custom metric. The constructor creates a metric object of the declared type. 
//Each type has an add method to take metric measurements.

let myCounter = new Counter('my_counter');
const myTrend = new Trend('waiting_time');
let newsPageResponseTrend = new Trend('response_time_news_page');

export default function () {
  let res = http.get('https://test.k6.io');
  check(res, {
        'status is 200': (r) => r.status === 200,
        'page is startpage': (r) => r.body.includes('Collection of simple web-pages')
  });
  myCounter.add(4); // The counter result (80) shows multipication of iterations (4*20) and http_reqs (4*20)
  myTrend.add(res.timings.waiting); // Total time for the request (ms). It's equal to sending + waiting + receiving, i.e. how long did the remote server take to process the request and respond, without the initial DNS lookup/connection times.
  //console.log(myTrend.name); // waiting_time
  sleep(1);

  res = http.get('https://test.k6.io/news.php');
  newsPageResponseTrend.add(res.timings.duration);
  sleep(1);
}
