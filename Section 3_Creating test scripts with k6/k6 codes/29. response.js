import { check } from 'k6';
import http from 'k6/http';

export default function () {
  const res = http.get('https://www.youtube.com/');
  for (const p in res.headers) {
    if (res.headers.hasOwnProperty(p)) {
      console.log(p + ' : ' + res.headers[p]);
    }
  }
  check(res, {
    'status is 200': (r) => r.status === 200,
    'caption is correct': (r) => r.html('h3').text() == 'Loved by developers. Trusted by businesses',
    'text exist': (r) => r.body.includes('The best developer') === true
  });
}
