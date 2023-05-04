import axios from "axios";

export default {
    getShoppingListItems(email){
        return axios.get("http://localhost:8080/api/shoppingList/getItemsFromShoppingList?email=" + email, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        }).then((response) => {
            console.log("getting shopping list items")
            console.log(response)
            return response.data
        }).catch(function (err) {
            console.log(err.response)
        })
    },
    deleteItemFromShoppingList(item){
        return axios.delete("http://localhost:8080/api/shoppingList/deleteItemFromShoppingList", {
            data: item,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        }).then((response) => {
            console.log("Deleting item from shopping list")
            console.log(response)
            return response.data
        }).catch(function (err) {
            console.log(err.response)
        })
    },
    addShoppingListItems(item){
        return axios.post("http://localhost:8080/api/shoppingList/addItemToShoppingList", item, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        }).then((response) => {
            console.log("adding shopping list items")
            console.log(response.data)
            return response.data
        }).catch(function (err) {
            console.log(err.response)
        })
    },
    addShoppingPopularItems(shoppingListId, subUserId){
        return axios.post("http://localhost:8080/api/shoppingList/addMostPopularItems?shoppingListId="+shoppingListId+"&subUserId="+subUserId, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        }).then((response) => {
            console.log("adding shopping list items")
            console.log(response.data)
            return response.data
        }).catch(function (err) {
            console.log(err.response)
        })
    }
}
