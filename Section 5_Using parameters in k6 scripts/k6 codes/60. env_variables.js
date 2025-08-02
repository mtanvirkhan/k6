import http from "k6/http";
import { group, check } from "k6";

export default function () {
    __ENV.baseUrl = 'https://test-api.k6.io';
    const res = http.get(`${__ENV.baseUrl}/public/crocodiles/`);
}