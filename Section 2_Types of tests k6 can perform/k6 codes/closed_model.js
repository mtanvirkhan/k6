import http from 'k6/http';

export const options = {
  scenarios: {
    closed_model: {
      executor: 'constant-vus',
      vus: 1,
      duration: '1m',
    }
  }
};

export default function () {
  // The following request will take roughly 6s to complete,
  // resulting in an iteration duration of 6s.

  // As a result, New VU iterations will start at a rate of 1 per 6s,
  // and we can expect to get 10 iterations completed in total for the
  // full 1m test duration.

  http.get('https://httpbin.test.k6.io/delay/6');
  //http.get('https://www.linkedin.com/');
}