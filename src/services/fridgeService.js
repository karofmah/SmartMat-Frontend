import axios from "axios";

export default {
    getAllCategories(){
        return axios.get("http://localhost:8080/api/categories/getAllCategories").then((response) => {
            console.log("Getting all categories")
            return response.data
        }).catch(function (err) {
            console.log(err.response)
        })
    },
    getAllItemsByCategory(fridgeId, categoryId){
        return axios.get("http://localhost:8080/api/refrigerators/getItemInRefrigeratorByCategory/+" + fridgeId + "?categoryId=" + categoryId).then((response) => {
            console.log("Getting all by category")
            return response.data
        }).catch(function (err) {
            console.log(err.response)
        })
    },
    getAllItems(){
        return axios.get("http://localhost:8080/api/items/getAllItems").then((response) => {
            console.log("Getting all items")
            return response.data
        }).catch(function (err) {
            console.log(err.response)
        })
    },
    getAllItemsInFridge(){
        return axios.get("http://localhost:8080/api/refrigerators/getRefrigeratorByUser?userEmail=jens@mail.com").then((response) => {
            console.log("Getting all items in fridge")
            console.log(response.data.items)
            return response.data.items
        }).catch(function (err) {
            console.log(err.response)
        })
    },
    addNewItemToFridge(item){
        return axios.post("http://localhost:8080/api/refrigerators/addItemInRefrigerator", item).then((response) => {
            console.log("adding items to fridge")
            console.log(response.data)
            return response.data
        }).catch(function (err) {
            console.log(err.response)
        })
    },
    deleteItem(item, waste){
        return axios.delete("http://localhost:8080/api/refrigerators/removeItemFromRefrigerator?waste=" + waste, {data: item}).then((response) => {
            console.log("Deleting item from fridge")
            console.log(response)
            return response.data
        }).catch(function (err) {
            console.log(err.response)
        })
    }
}
