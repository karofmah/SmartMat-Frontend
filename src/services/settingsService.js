import axios from "axios";

export default {
    getUserInfo(email){
        return axios.get("http://localhost:8080/api/users/login/getUser?email=" + email, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        }).then((response) => {
            console.log("Getting user info")
            console.log(response)
            return response.data
        })
    },
    getAllSubusers(email){
        return axios.get("http://localhost:8080/api/subusers/getUsersFromMaster?email=" + email, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        }).then((response) => {
            console.log("Getting subusers")
            //console.log(response)
            return response.data
        }).catch(function (err) {
            console.log(err.response)
        })
    },
    addNewSubuser(subuser){
        return axios.post("http://localhost:8080/api/subusers/addSubUser", subuser, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        }).then((response) => {
            console.log("Adding subusers")
            console.log(response)
            return response.data
        }).catch(function (err) {
            console.log(err.response)
        })
    },
    deleteSubuser(subuserID){
        return axios.delete("http://localhost:8080/api/subusers/deleteSubUser/" + subuserID, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        }).then((response) => {
            console.log("Deleting subuser")
            console.log(response)
            return response.data
        }).catch(function (err) {
            console.log(err.response)
        })
    },
    updateSubuser(update){
        return axios.put("http://localhost:8080/api/subusers/updateSubuser",  update, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        }).then((response) => {
            console.log("updating subuser info")
            console.log(response)
            return response.data
        }).catch(function (err) {
            console.log(err.response)
        })
    },
    updateInformation(update){
        return axios.put("http://localhost:8080/api/users/updateUser",  update, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        }).then((response) => {
            console.log("updating master user info")
            console.log(response)
            return response.data
        }).catch(function (err) {
            console.log(err.response)
        })
    }
}
