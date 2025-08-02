import http from "k6/http";
import { group, check } from "k6";


export default function() {
    group("Simple authentication testing", function(){

        const credentials = JSON.stringify({
            username: "test303",
            password: "test295"
        });

        const params1 = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        
        const res1 = http.post('https://test-api.k6.io/auth/token/login/', credentials, params1);
        console.log("res1.access: ", res1.json().access)
        // __ENV.access_info = res1.json().access;

        const params2 = {
            headers: {
                'Authorization': "Bearer " + res1.json().access,
                'Content-Type': 'application/json'
            }
        }

        const res2 = http.get(`https://test-api.k6.io/my/crocodiles/`, params2);
        console.log("res2.headers: ", res2.headers);
        console.log("res2.response: ", res2.json());
        console.log("status code: ", res2.status)

        check(res2, {
            "status code assertion": (r) => r.status === 200
        })
    })
}