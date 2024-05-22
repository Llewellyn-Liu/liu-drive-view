
/**
 * API v0.1.2 M4.1.1
 * @returns {{data: {}, status}}
 * Data format:{"userId":"", "username":"", "token":""}
 */
export async function lg_sendLoginRequest(username, password) {
    // Pre-processing
    console.log("login")

    // Request
    const loginResult = await fetch("/drive/auth", {
        method: "POST",
        body: JSON.stringify({
            'username': username,
            'password': password,
        }),
        headers: new Headers({
            'Authorization': 'Basic ' + btoa(username + ':' + password ),
            'Content-Type': 'application/json'
        }),
    });

    // Post-processing
    if (loginResult.status === 200) {
        return {
            "data": await loginResult.json(),
            "status": loginResult.status
        };
    } else {
        return {
            "data": {},
            "status": loginResult.status
        }
    }
}

/**
 * API v0.1.2 M4.1.4
 * @returns {{data: (*|Promise<any>), status}} {"username":"", "userId":""}
 */
export async function sendRegisterRequest(username, userId, password) {
    // Pre-processing
    console.log("Register")

    // Request
    const loginResult = await fetch("/drive/user", {
        method: "POST",
        body: JSON.stringify({
            'username': username,
            'userId': userId,
            'password': password,
        }),
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
    });

    // Post-processing
    console.log("status:", loginResult.status)
    if (loginResult.status === 200) {
        //Cleaning
        console.log("Register success.")

        return {
            "data": await loginResult.json(),
            "status": loginResult.status
        };

    } else if (loginResult.status === 400) {
        console.log("Register failed.")
        // this.loggerStore.error("Please check your info");
    } else {
        // this.loggerStore.error("Unknown error.")
        console.log("Error.")
        return {
            "data": {},
            "status": loginResult.status
        }
    }
}

/**
 * API v0.1.2 M4.3.1
 * @param page Starts from 0
 * @returns {Promise<any>} ImageMeta list
 */
export async function dr_galleryGet(page) {
    // Pre-processing
    console.log("Fetch gallery list", page)

    // Request
    const galleryListRes = await fetch("/drive/gallery/" + this.userStore.id + "/page/" + page, {
        method: "GET",
    }).then((res) => res.json());

    // Post-processing
    console.log("Gallery Get: ", galleryListRes)
    return galleryListRes;
}
