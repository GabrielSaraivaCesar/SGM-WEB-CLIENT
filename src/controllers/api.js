
class Api {
    url = "https://localhost:5001/api/";
    get headers() {
        return {
            "Content-Type": "application/json",
            "auth": sessionStorage.getItem("auth"),
            "user": JSON.parse(sessionStorage.getItem("user") || "{}")
        }
    } 
    get loginInfo() {
        return JSON.parse(sessionStorage.getItem("user") || "{}");
    }

    request(path, method, body = null) {
        return fetch(this.url + path, {
            method: method,
            body: body ? JSON.stringify(body) : null,
            headers: this.headers,
        })
        .then(res => {
            return res.json()
            .then(json => {
                return json;
            })
        })
        .catch(err => {
            throw err;
        })
    }
}

export default new Api();