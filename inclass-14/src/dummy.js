// Inclass Mocking Exercise
// ========================
//
// This is the client code of our web application.
// Most of the implementation has already been completed for you.
//
// To assure that Mocking is occuring correctly, you should try
// changing the server url to something non-sensical.
//
// You are asked to implement the updateHeadline() function below.
//

const url = 'https://webdev-dummy.herokuapp.com'

const resource = (method, endpoint, payload) => {
    const options = {
        method,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    if (payload) options.body = JSON.stringify(payload)

    return fetch(`${url}/${endpoint}`, options)
        .then(r => {
            if (r.status === 200) {
                if (r.headers.get('Content-Type').indexOf('json') > 0) {
                    return r.json()
                } else {
                    return r.text()
                }
            } else {
                // useful for debugging, but remove in production
                console.error(`${method} ${endpoint} ${r.statusText}`)
                throw new Error(r.statusText)
            }
        })
}

const login = () => {

    const username = document.querySelector("#username")
    const password = document.querySelector("#password")

    const box = document.querySelector("#message")
    return resource('POST', 'login', {
        username: username.value,
        password: password.value
    })
        .then(r => resource('GET', 'headlines'))
        .then(r => {
            const user = r.headlines[0]
            box.innerHTML = `you are logged in as ${user.username} "${user.headline}"`
            toggle(false)
        })
        .catch(r => box.innerHTML = `"${r.message || 'Error'}" when logging in`)
}

const logout = () => {
    const box = document.querySelector("#message")
    return resource('PUT', 'logout')
        .then(r => box.innerHTML = "You have logged out")
        .then(_ => toggle(true))
        .catch(r => box.innerHTML = `"${r.message}" when logging out`)
}

const toggle = (show) => {
    const toggleElement = _show => id => {
        const el = document.querySelector(id)
        if (el) {
            el.style.display = _show ? 'inline' : 'none'
        }
    }
    ['#username', '#password', '#login'].forEach(toggleElement(show));
    ['#logout', '#headline', '#newHeadline'].forEach(toggleElement(!show));
}

const updateHeadline = (headline) => {
   return resource('PUT', 'headline', { headline }).then((response) => {
        console.log(`New headline ${response.headline}`)
        // IMPLEMENT ME
        //   * Update the headline shown in the #message box
        // FYI response.headline = { username, headline }
        const hdline = document.querySelector("#message");
        hdline.innerHTML=`you are logged in as ${response.username} "${response.headline}"`;
    }).catch(r => hdline.innerHTML = `ERROR!`)
}

export { url, login, logout, updateHeadline }
