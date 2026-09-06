import http from "k6/http";
import { check } from "k6";

export const options = {
    vus: 200,
    duration: '20s'
};

export default function () {
    const payload = JSON.stringify({
        originalUrl: `https://www.example.com/page/${__VU}-${__ITER}`,
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const response = http.post(
        "http://localhost:5000/api/generate",
        payload,
        params
    );


    check(response, {
        'status is 201' : (r) => r.status === 201,
    });
}