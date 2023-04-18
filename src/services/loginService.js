import axios from "axios";

export default {
    login(info){
        return axios.post("http://localhost:8080/api/v1/auth/authenticate", info).then((response) => {
            console.log("Token incoming for login")
            localStorage.setItem("token", response.data)
            return response.data
        })
    },
    registerUser(info){
        return axios.post("http://localhost:8080/api/v1/auth/register", info).then((response) => {
            console.log("Token incoming for register new user")
            localStorage.setItem("token", response.data)
            return response.data
        })
    }
}
