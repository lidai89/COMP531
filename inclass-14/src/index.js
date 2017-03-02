
import { login, logout, updateHeadline } from './dummy'

window.onload = () => {
    document.querySelector("#login").onclick = login
    document.querySelector("#logout").onclick = logout
    document.querySelector("#headline").onclick = () => {
        updateHeadline(document.querySelector("#newHeadline").value)
    }
}
