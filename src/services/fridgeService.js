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
    getAllItemsInFridge(){
        return axios.get("http://localhost:8080/api/refrigerators/getRefrigeratorByUser?userEmail=jens@mail.com").then((response) => {
            console.log("Getting all items in fridge")
            console.log(response.data.items)
            return response.data.items
        })
    },
    addNewItemToFridge(item){
        return axios.post("http://localhost:8080/api/refrigerators/addItemInRefrigerator", item).then((response) => {
            console.log("adding items to fridge")
            console.log(response.data)
            return response.data
        })
    }
}
