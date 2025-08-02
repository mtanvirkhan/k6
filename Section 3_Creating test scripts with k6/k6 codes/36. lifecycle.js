/*
Simple calculation iteration:
vus: 10, duration: 10s
if default function() {sleep(5)}
than total iteration: 10s/5s * 10 = 20
Formula: duration/sleep*vus

calculation total waiting
setup sleep time + default sleep time or total duration (which is higher)
*/
import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    vus: 10,
    duration: '10s'
}

console.log(' -- init stage --');

export default function (data) {
    console.log('-- VU stage --');
    console.log(data);
    sleep(11);
}

export function setup() {
    console.log('-- setup stage --');
    sleep(5);
    // const data = { foo: 'bar' };
    const result = [];
    for (let i = 0; i < 5; i++) {
        result.push(i);
    }
    return result;
}

export function teardown(data) {
    console.log('-- Teardown stage --');
    console.log(data);
}