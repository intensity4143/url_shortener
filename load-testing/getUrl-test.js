import http from "k6/http";
import { check } from "k6";
const url = "http://localhost:5000/1fnx"

export const options = {
    vus: 200,
    duration: "20s"
};

export default function () {
    const response = http.get(
        url,
        {
            redirects: 0
        }
    );

    check(response, {
        "status is 302": (r) => r.status === 302
    });
}