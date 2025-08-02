import http from 'k6/http';

export const options = {
  discardResponseBodies: true,
  scenarios: {
    contacts: {
      executor: 'constant-arrival-rate',

      // How long the test lasts
      duration: '30s',

      // How many iterations per timeUnit
      rate: 30, // Rate = 30 reqs/s divided by 1 reqs/iteration = 30 iteration/s

      // Start `rate` iterations per second
      timeUnit: '1s',

      // Pre-allocate VUs
      preAllocatedVUs: 50
    }
  }
};

export default function () {
  http.get('https://test.k6.io/contacts.php');
}
