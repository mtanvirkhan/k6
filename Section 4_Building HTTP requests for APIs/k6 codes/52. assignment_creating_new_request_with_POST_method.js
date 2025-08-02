import http from "k6/http";
import { group, check } from "k6";

export const options = {
    vus: 5,
    duration: '30s'
}

export default function() {
    group("Simple authentication testing", function(){

        const credentials = JSON.stringify({
            username: "test304",
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
                Authorization: "Bearer " + res1.json().access,
                'Content-Type': 'application/json'
            }
        }

        const body1 = JSON.stringify({
            name: "POST_Crocodile " + Date.now(),
            sex: "F",
            //INFO[0004] res2.response:  {"date_of_birth":["Date has wrong format. Use one of these formats instead: YYYY-MM-DD."]}  source=console    
            date_of_birth: "2222-02-02"
        });

        const body2 = JSON.stringify({
            "name": "Random croc",
            "sex": "M",
            "date_of_birth": "1900-10-28"
        });

        const res2 = http.post(`https://test-api.k6.io/my/crocodiles/`, body1, params2);
        console.log("res2.headers: ", res2.headers);
        console.log("res2.response: ", res2.json());
        console.log("status code: ", res2.status)
        console.log('id: ', res2.json().id);

        check(res2, {
            "status code assertion res2": (r) => r.status === 200 || r.status === 201
        })
        
        
        const res3 = http.get(`https://test-api.k6.io/public/crocodiles/`);
        console.log('res3: ', res3.json());

        check(res3, {
            "status code assertion res3": (r) => r.status === 200 || r.status === 201
        })
        
    })
}