import http from 'k6/http';
import { sleep, group, check } from 'k6';

export const options = {
    vus: 10,
    duration: '10s',
    thresholds: {
        http_req_duration: ['p(95)<250'],
        'group_duration{group:::Main page}': ['p(95)<3000'],
        'group_duration{group:::Main page::Assets}': ['p(95)<3000'],
    }
}

export default function () {

    group('Main page', function () {
        let res = http.get('https://test.k6.io/');
        check(res, { 
            'status is 200': (r) => r.status === 200,
            'page is main page': (r) => r.body.includes('Collection of simple web-pages suitable for load testing.') === true 
        });
    
        group('Assets', function () {
            http.get('https://test.k6.io/static/css/site.css');
            http.get('https://test.k6.io/static/js/prisms.js');
            check(res, { 'status is 200': (r) => r.status === 200 });
        });
    });


    group('News page', function () {
        let res = http.get('https://test.k6.io/news.php');
        check(res, { 
            'status is 200': (r) => r.status === 200,
            'page is news page': (r) => r.body.includes('Data from') === true
        });
    });

    sleep(1);
}
