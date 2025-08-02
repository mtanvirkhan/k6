import http from 'k6/http';
import { check } from 'k6';
import { sleep } from 'k6';
import exec from 'k6/execution';

export const options = {
  vus: 10,
  duration: '10s',
  thresholds: {
    checks: ['rate==1.0'],
    data_received: ['count<700'],
    http_req_blocked: ['avg<300', 'min<300', 'med<300', 'max<700', 'p(95)<700', 'p(90)<700'],
    http_req_duration: ['avg<300', 'min<300', 'med<300', 'max<600', 'p(95)<600', 'p(90)<300'],
    http_req_duration: ['max<2000'],
    http_req_failed: ['rate<0.01'],
    http_reqs: ['count>20', 'rate>4'],
    vus: ['value>=5']
  }
}

export default function () {
  //const res = http.get('https://test.k6.io');
    const res = http.get('https://test.k6.io' + (exec.scenario.iterationInTest === 100 ? 'foo' : '')); // checing the requested log information and set request number 5 with invalid end-point for generating some error
    // console.log(exec.scenario.iterationInTest + ' Status: Success'); // checing the requested log information
    check(res, {
        'status is 200': (r) => r.status === 200,
        'page is startpage': (r) => r.body.includes('Collection of simple web-pages')
    });
    sleep(1);
}
