import http from "k6/http";
import { group, check } from "k6";

export default function() { 
    group('Post module', function(){
        const body = JSON.stringify({
            username: "tanvir" + Date.now(),
            password: "tanvir" + Date.now(),
            first_name: "tanvir" + Date.now(),
            last_name: "khan" + Date.now()
        });

        const params = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        
        let res = http.post('https://test-api.k6.io/user/register/', body, params);
        console.log(res.headers['Allow']);
        console.log(res.headers['Response']);
        console.log(res.headers['X-Frame-Options']);

        check(res,{
            "check response code is 201": (r) => r.status === 201,
            "check method is POST, OPTIONS": (r) => r.headers['Allow'] === 'POST, OPTIONS'
        })
    });
}