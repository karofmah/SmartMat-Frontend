import axios from "axios";

export default {
    login(info){
        return axios.post("http://localhost:8080/api/auth/authenticate", info).then((response) => {
            console.log("Token incoming for login")
            localStorage.setItem("token", response.data.token)
            return response
        }).catch(function (err) {
            console.log(err.response)
        })
    },
    registerUser(info){
        return axios.post("http://localhost:8080/api/auth/register", info).then((response) => {
            console.log("Token incoming for register new user")
            localStorage.setItem("token", response.data.token)
            return response
        }).catch(function (err) {
            console.log(err.response)
        })
    },
    getFridgeId(email) {
        return axios.get("http://localhost:8080/api/refrigerators/getRefrigeratorByUser?userEmail=" + email).then((response) => {
            console.log("Getting fridgeId")
            localStorage.setItem("fridgeId", response.data.refrigeratorId)
            console.log(response)
            return response
        }).catch(function (err) {
            console.log(err)
        })
    },
    getShoppingListId(email) {
        return axios.get("http://localhost:8080/api/refrigerators/getRefrigeratorByUser?userEmail=" + email).then((response) => {
            console.log("Getting fridgeId")
            localStorage.setItem("fridgeId", response.data.refrigeratorId)
            console.log(response)
            return response
        }).catch(function (err) {
            console.log(err)
        })
    }
}
