import axios from "axios";

export default {
    getUserInfo(email){
        return axios.get("http://localhost:8080/api/users/login/getUser?email=" + email).then((response) => {
            console.log("Getting user info")
            //console.log(response)
            return response.data
        })
    },
    getAllSubusers(email){
        return axios.get("http://localhost:8080/api/subusers/getUsersFromMaster?email=" + email).then((response) => {
            console.log("Getting subusers")
            //console.log(response)
            return response.data
        }).catch(function (err) {
            console.log(err.response)
        })
    },
    addNewSubuser(subuser){
        return axios.post("http://localhost:8080/api/subusers/addSubUser", subuser).then((response) => {
            console.log("Adding subusers")
            console.log(response)
            return response.data
        }).catch(function (err) {
            console.log(err.response)
        })
    },
    deleteSubuser(subuser){
        return axios.delete("http://localhost:8080/api/subusers/deleteSubUser", {data: subuser}).then((response) => {
            console.log("Deleting subuser")
            console.log(response)
            return response.data
        }).catch(function (err) {
            console.log(err.response)
        })
    }
}
