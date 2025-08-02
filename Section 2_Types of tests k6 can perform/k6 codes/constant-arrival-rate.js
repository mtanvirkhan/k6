import http from 'k6/http';
import { sleep } from 'k6';

export const options =  {
    senarios: {
        my_scenarios1: {
            executor: 'constant-arrival-rate',
            duration: '30s',
            preAllocatedVUs: 50,
            rate: 50,
            timeUnit: '1s'
        }
    }
}

export default function() {
    http.get('https://www.espncricinfo.com/');
}
