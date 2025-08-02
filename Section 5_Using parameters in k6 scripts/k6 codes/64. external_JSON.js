import http from "k6/http";
import { group, check } from "k6";
import { randomString } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { SharedArray } from "k6/data";
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

/*
export const options = {
    vus: 5,
    duration: '5s'
}
*/

const userCredentials = new SharedArray('users with credentials', function(){
    return JSON.parse(open('./users.json')).users;
})

console.log(userCredentials);

export default function() { 
    group('Post module', function(){
        userCredentials.forEach((item) => {
            const body = JSON.stringify({
                username: item.username,
                password: item.password
            });
    
            const header_info = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            
            const register_user = http.post('https://test-api.k6.io/user/register/', body, header_info);
            check(register_user,{
                "Register: check response code is 201": (r) => r.status === 201,
                "Register: check method is POST, OPTIONS": (r) => r.headers['Allow'] === 'POST, OPTIONS'
            }) 
        })

        let randomInput = randomItem(userCredentials);

        const body_login = JSON.stringify({
            username: randomInput.username,
            password: randomInput.password
        });

        const header_info_login = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        
        const login_user = http.post('https://test-api.k6.io/auth/token/login/', body_login, header_info_login);

        check(login_user,{
            "Login: check response code is 201": (r) => r.status === 201 || r.status === 200,
            "Login: check method is POST, OPTIONS": (r) => r.headers['Allow'] === 'POST, OPTIONS'
        })
        
    });
}