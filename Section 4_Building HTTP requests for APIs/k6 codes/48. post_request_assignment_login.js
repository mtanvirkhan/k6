import http from "k6/http";
import { group, check } from "k6";
import { describe, expect } from "https://jslib.k6.io/k6chaijs/4.3.4.3/index.js";

export default function() { 
    group('Post module', function(){
        const credentials = JSON.stringify({
            username: "test303",
            password: "test295"
        });

        const params = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        
        const res = http.post('https://test-api.k6.io/auth/token/login/', credentials, params);
        console.log("Headers property Alllow: ", res.headers['Allow']);
        console.log("Headers property X-Frame-Options: ", res.headers['X-Frame-Options']);
        console.log("Response body: ", res.json());
        console.log("access token: ", res.json().refresh);
        console.log("refresh token: ", res.json().access);

        group("Response header assertion", function(){
            check(res,{
                "check method is POST, OPTIONS": (r) => r.headers['Allow'] === 'POST, OPTIONS',
                "check X-Frame-Options is SAMEORIGIN": (r) => r.headers['X-Frame-Options'] === 'SAMEORIGIN'
            })
        })

        group("Response body assertion", function(){
         
            check(res,{
                "check response code is 200": (r) => r.status === 200,
                "check refresh token is generated": (r) => r.json().refresh =! null,
                "check access token is generated": (r) => r.json().access =! null
            })
            expect(res.body, 'response').to.be.a('string');
        })

    });
}