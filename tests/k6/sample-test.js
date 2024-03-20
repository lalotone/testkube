import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
    stages: [
        { duration: '100s', target: 10 },  // Start with 10 clients for 100 seconds
        { duration: '20s', target: 20 },   // Then increase to 20 clients for 20 seconds
        { duration: '100s', target: 200 }  // Finally, increase to 200 clients for 100 seconds
    ],
    thresholds: {
        http_req_duration: ['p(95)<500'], // Thresholds for response time
    }
};

export default function () {
    // Send GET request to the Kubernetes service
    let res = http.get('http://testkube-demo-blue-service.default:8080');
    // Log the response status and duration
    console.log(`Status: ${res.status}, Response time: ${res.timings.duration} ms`);
    // Sleep for a short duration between requests
    sleep(1);
}
