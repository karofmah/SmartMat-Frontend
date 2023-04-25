import axios from "axios";

export default {
    getRecipe(refrigeratorId){
        return axios.get("http://localhost:8080/api/recipes/generateRecipe?refrigeratorId=" + refrigeratorId).then((response) => {
            console.log("Generating recipe...")
            return response.data
        })
    },
}
