import axios from "axios";

export default {
    getUserInfo(email){
        return axios.get("http://localhost:8080/api/users/login/user?email=" + email).then((response) => {
            console.log("Getting user info")
            //console.log(response)
            return response.data
        })
    }
}
