<template>
    <v-container id="container">
        <v-row justify="space-around">
            <v-card class="mx-auto" width="400">
                <v-toolbar color="teal">
                    <v-toolbar-title id="shoppinglist-title">Shopping list</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn icon @click="buy">
                        <v-icon>mdi-fridge</v-icon>
                        <v-tooltip id="shoppinglist-tooltip" activator="parent" location="start">Add selected items to fridge</v-tooltip>
                    </v-btn>
                </v-toolbar>
                <div id="lists">
                    <v-list id="itemList">
                        <v-list-item v-for="(item, index) in shoppingList" :key="index" :title="item">
                            <template v-slot:append>
                                <v-btn id="trash" variant="text" size="large" density="compact" icon="mdi-delete" v-on:click="removeList(item)"></v-btn>
                            </template>
                            <!--<template v-slot:prepend="{ isActive }">
                                <v-list-item-action start>
                                    <v-checkbox-btn :model-value="isActive" @click="buy(list)"></v-checkbox-btn>
                                </v-list-item-action>
                            </template>-->
                        </v-list-item>
                    </v-list>
                </div>
                <div id="input">
                    <v-autocomplete
                        id="add-to-cart"
                        type="text"
                        label="Add food"
                        clearable
                        :items="allItems"
                        v-model="selectedItem"
                        v-on:keyup.enter="addItem"
                    />
                </div>
            </v-card>
        </v-row>
    </v-container>
</template>

<script>
import shoppingListService from "@/services/shoppingListService";
import fridgeService from "@/services/fridgeService";
    export default {
        data() {
            return {
                shoppingList: [],
                selectedItem: "",
                allItems:[],
                buyItems: []
            }
        },
        methods: {
            async getShoppingList(){
              try {
                const list = await shoppingListService.getShoppingListItems(localStorage.getItem("email"))
                for(let i = 0; i<list.length; i++){
                  this.shoppingList.push(list[i].item.name)
                }
              } catch(err) {
                console.log(err)
              }

            },
            async getAllItems(){
              try {
                const list = await fridgeService.getAllItems()
                for(let i = 0; i<list.length; i++){
                  this.allItems.push(list[i].name)
                }
              } catch (err) {
                console.log(err)
              }

            },
            async buy(){
              for(let i = 0; i<this.shoppingList.length; i++){
                const item = {
                  "itemName": this.shoppingList[i],
                  "refrigeratorId": "1",
                  "amount": "10",
                  "measurementType": "2"
                }
                await fridgeService.addNewItemToFridge(item)

                const itemToDelete = {
                  "itemName": this.shoppingList[i],
                  "shoppingListId": "1",
                  "amount": "10",
                  "measurementType": "2"
                }

                await shoppingListService.deleteItemFromShoppingList(itemToDelete)
              }
              this.shoppingList = []
              await this.getShoppingList()
            },
            async addItem() {
              const itemToAdd = {
                "itemName": this.selectedItem,
                "shoppingListId": "1",
                "amount": "10",
                "measurementType": "2"
              }

              await shoppingListService.addShoppingListItems(itemToAdd)
              this.shoppingList = []
              await this.getShoppingList()
              this.selectedItem = "";
            },
            async removeList(item) {
              const itemToDelete = {
                "itemName": item,
                "shoppingListId": "1",
                "amount": "10",
                "measurementType": "2"
              }
                await shoppingListService.deleteItemFromShoppingList(itemToDelete)
                this.shoppingList = []
                await this.getShoppingList()
            },
            async buyItems(){
              const item = {
                "itemName": this.newItemName,
                "refrigeratorId": "1",
                "amount": this.newItemAmount,
                "measurementType": this.newItemMeasurement
              }
              await fridgeService.addNewItemToFridge(item)
            }
        },
        beforeMount(){
          this.getShoppingList()
          this.getAllItems()
        }
    }
</script>

<style>
    #container{
        margin-top: 150px;
    }

</style>
