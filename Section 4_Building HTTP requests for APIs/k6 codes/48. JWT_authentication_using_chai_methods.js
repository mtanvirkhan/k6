// k6 run --http-debug="full" '.\48. get_encrypted_request_body.js'

import http from "k6/http";
import { group, check } from "k6";
import { describe, expect } from "https://jslib.k6.io/k6chaijs/4.3.4.3/index.js";

export default function() {
    group("Testing PT Console JWT Autehntication APIs", function(){
        const params = {
            headers: {
                'Authorization': 'Bearer UFRjT25RYVRlQW1DfkRlVmlDZUFwSX5BUElTZUNLZVk='
            }
        }

        group("testing headers properties of get_encrypted_request_body API", function(){
            const imei1 = 333333001200047;
            const imei2 = 333333556610047;
            let encrypted_req_body = http.get(`https://qa-global-console.pocketalk.com/iotconsoleapi-discovery/api/pub/encrypt-request-params-with-common-key/param?imei1=${imei1}&imei2=${imei2}`);
            console.log(encrypted_req_body.headers["X-Frame-Options"]);
    
            check(encrypted_req_body, {
                "checking header properties X-Frame-Options": (r) => r.headers["X-Frame-Options"] === 'SAMEORIGIN',
                "checking header properties Content-Length is smaller than 200": (r) => r.headers["Content-Length"] < 200
            })
            expect(encrypted_req_body.headers["X-Frame-Options"], 'header properties X-Frame-Options').to.equal('SAMEORIGIN');
        })

        group("testing body information of get_encrypted_request_body API", function(){
            let encrypted_req_body = http.get("https://qa-global-console.pocketalk.com/iotconsoleapi-discovery/api/pub/encrypt-request-params-with-common-key/param?imei1=333333001200047&imei2=333333556610047");
            console.log("res body data: ",encrypted_req_body.body);
            __ENV.encrypted_req_body = encrypted_req_body.body;

            check(encrypted_req_body, {
                "check response code is 200":  function(r) {return r.status === 200},
            })
            expect(encrypted_req_body.body, 'Encrypted request body info').not.to.be.null;
            expect(encrypted_req_body.body, 'Encrypted request body info').to.be.a('string');
        })

        group("testing get_secret_key API", function(){
            let secret_key = http.get(`https://qa-global-console.pocketalk.com/iotconsoleapi-discovery/api/pub/secured-auth/get-device-secret-key?param=${__ENV.encrypted_req_body}`, params);
            console.log("secret key:", secret_key.body);

            __ENV.secret_key = JSON.stringify(secret_key.body);

            check(secret_key, {
                "check response code is 200":  function(r) {return r.status === 200},
                "check encrypted data is created": function(r) {return r.body != null}
            })
            expect(secret_key.body, 'secret_key body info').to.be.a('string');
        })

        group("testing secret reesponse decryption API", function() {
            let sec_res_decryp = http.get(`https://qa-global-console.pocketalk.com/iotconsoleapi-discovery/api/pub/decrypt-response?text=${__ENV.secret_key}`, params);
            //console.log("sec_res_decryp.body", sec_res_decryp.json())
            check(sec_res_decryp, {
                "check response code is 200":  function(r) {return r.status === 200}
                //"check decrypted data is created": (r) => {expect(r.body, 'secret response decryption body info').not.to.be.null}
            })
            //expect(sec_res_decryp.json(), 'secret response decryption body info').to.be.an('object');
        })
        
    });
}