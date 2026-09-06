import http from "k6/http";
import { check } from "k6";

export const options = {
    vus: 200,
    duration: "20s"
};

export default function () {
    const response = http.get(
        "http://localhost:5000/api/1fnw",
        {
            redirects: 0
        }
    );

    check(response, {
        "status is 302": (r) => r.status === 302
    });
}