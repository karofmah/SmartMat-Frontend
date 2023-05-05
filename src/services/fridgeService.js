import axios from "axios";

export default {
    getAllCategories(){
        return axios.get("http://localhost:8080/api/categories/getAllCategories", {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        }).then((response) => {
            console.log("Getting all categories")
            return response.data
        }).catch(function (err) {
            console.log(err.response)
        })
    },
    getAllItemsByCategory(fridgeId, categoryId){
        return axios.get("http://localhost:8080/api/refrigerators/getItemInRefrigeratorByCategory/+" + fridgeId + "?categoryId=" + categoryId, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        }).then((response) => {
            console.log("Getting all by category")
            return response.data
        }).catch(function (err) {
            console.log(err.response)
        })
    },
    getAllItems(){
        return axios.get("http://localhost:8080/api/items/getAllItems", {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        }).then((response) => {
            console.log("Getting all items")
            return response.data
        }).catch(function (err) {
            console.log(err.response)
        })
    },
    getAllItemsInFridge(email){
        return axios.get("http://localhost:8080/api/refrigerators/getRefrigeratorByUser?userEmail="+email, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        }).then((response) => {
            console.log("Getting all items in fridge")
            console.log(response.data.items)
            return response.data.items
        }).catch(function (err) {
            console.log(err.response)
        })
    },
    addNewItemToFridge(item){
        return axios.post("http://localhost:8080/api/refrigerators/addItemInRefrigerator", item, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        }).then((response) => {
            console.log("adding items to fridge")
            console.log(response.data)
            return response.data
        }).catch(function (err) {
            console.log(err.response)
        })
    },
    deleteItem(item, waste){
        return axios.delete("http://localhost:8080/api/refrigerators/removeItem", item, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        }).then((response) => {
            console.log("Deleting item from fridge")
            console.log(response)
            return response.data
        }).catch(function (err) {
            console.log(err)
        })
    },
    updateItemInFridge(item){
        return axios.put("http://localhost:8080/api/refrigerators/updateItemInRefrigerator", item, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        }).then((response) => {
            console.log("updating fridge")
            console.log(response)
            return response
        }).catch(function (err) {
            console.log(err)
        })
    }
}
