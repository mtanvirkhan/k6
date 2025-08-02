import http from "k6/http";
import { check, sleep, group } from "k6";

export const options = {
    vus: 1,
    duration: '2s'
}

console.log('-- init stage --');

export function setup() {
    console.log('-- setup stage --');
}

export default function() {
    console.log('-- VU stage --');
    group('Group case', function() {
        console.log('Group case');
    });
}

export function teardown() {
    console.log('-- teardown stage --');
}