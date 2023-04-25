import axios from "axios";

export default {
    getAllCategories(){
        return axios.get("http://localhost:8080/api/categories/getAllCategories").then((response) => {
            console.log("Getting all categories")
            return response.data
        })
    },
    getAllItemsByCategory(id){
        return axios.get("http://localhost:8080/api/items/getAllItemsByCategory?categoryId=" + id).then((response) => {
            console.log("Getting all by category")
            return response.data
        })
    },
    getAllItems(){
        return axios.get("http://localhost:8080/api/items/getAllItems").then((response) => {
            console.log("Getting all items")
            return response.data
        })
    },
    getAllItemsInFridge(id){
        return axios.get("http://localhost:8080/api/refrigerators/getItemsInRefrigerator/" + id).then((response) => {
            console.log("Getting all items in fridge")
            return response
        })
    }
}
