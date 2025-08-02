import http from 'k6/http';
import { sleep, group, check } from 'k6';

export const options = {
    thresholds: {
        http_req_duration: ['p(95)<1000'],
        'group_duration{group:::Main page}': ['p(95)<3000'],
        'group_duration{group:::Main page::Assets}': ['p(95)<1000'],
        'group_duration{group:::News page}': ['p(95)<2000'],
    }
}

export default function () {

    group('Main page', function () {
        let res = http.get('https://run.mocky.io/v3/fc822a99-c393-41bf-9ca0-7d1f68a81973?mocky-delay=900ms');
        check(res, { 'status is 200 ok in main page group': (r) => r.status === 200 });
    
        group('Assets', function () {
            http.get('https://run.mocky.io/v3/fc822a99-c393-41bf-9ca0-7d1f68a81973?mocky-delay=900ms');
            http.get('https://run.mocky.io/v3/fc822a99-c393-41bf-9ca0-7d1f68a81973?mocky-delay=900ms');
            check(res,{'status is 200 ok in main sub page group': (r) => r.status === 200});
        });
    });

    group('News page', function () {
        http.get('https://run.mocky.io/v3/fc822a99-c393-41bf-9ca0-7d1f68a81973?mocky-delay=900ms');
        check(res,{'status is 200 ok in news page group': (r) => r.status === 200});
    });

    sleep(1);
}
