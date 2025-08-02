import http from 'k6/http';
import { check } from 'k6';
import { sleep } from 'k6';

export const options = {
  vus: 10,
  duration: '10s',
  thresholds: {
    checks: ['rate==1.0'],
    http_req_blocked: ['avg<300', 'min<300', 'med<300', 'max<700', 'p(95)<700', 'p(90)<700'],
    http_req_duration: ['avg<300', 'min<300', 'med<300', 'max<600', 'p(95)<600', 'p(90)<300'],
    http_req_failed: ['rate<0.01']
  }
}

export default function () {
    const res = http.get('https://test.k6.io');
    check(res, {
        'status is 200': (r) => r.status === 200,
        'page is startpage': (r) => r.body.includes('Collection of simple web-pages')
    });
    sleep(2);
}
