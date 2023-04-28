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
                          <template v-slot:prepend>
                            <v-btn id="add" variant="text" size="large" density="compact" icon="mdi-checkbox-blank-outline" v-on:click="addToBuy(item)"></v-btn>
                          </template>
                      </v-list-item>
                      <v-list-item v-for="(item, index) in buyItems" :key="index" :title="item">
                          <template v-slot:prepend>
                            <v-btn id="add" variant="text" size="large" density="compact" icon="mdi-checkbox-marked-outline" v-on:click="removeFromBuy(item)"></v-btn>
                          </template>
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
import { mount } from "@vue/test-utils";
  export default {
      data() {
          return {
              shoppingList: [],
              selectedItem: "",
              allItems:[],
              buyItems: [],
          }
      },
      methods: {
          async getShoppingList(){
            try {
              const list = await shoppingListService.getShoppingListItems(localStorage.getItem("email"))
              for(let i = 0; i<list.length; i++){
                if(!this.buyItems.includes(list[i].item.name)){
                  this.shoppingList.push(list[i].item.name)
                }
              }
            } catch(err) {
              console.log(err)
            }

          },
          async getAllItems(){
            try {
              const list = await fridgeService.getAllItems()
              console.log(list);
              console.log(this.shoppingList);
              for(let i = 0; i<list.length; i++){
                if (!this.shoppingList.includes(list[i].name)) {
                  this.allItems.push(list[i].name)
                }
              }
            } catch (err) {
              console.log(err)
            }

          },
          async buy(){
            for(let i = 0; i<this.buyItems.length; i++){
              const item = {
                "itemName": this.buyItems[i],
                "refrigeratorId": "1",
                "amount": "10",
                "measurementType": "2"
              }
              await fridgeService.addNewItemToFridge(item)

              const itemToDelete = {
                "itemName": this.buyItems[i],
                "shoppingListId": "1",
                "amount": "10",
                "measurementType": "2"
              }
              await shoppingListService.deleteItemFromShoppingList(itemToDelete)
              this.allItems.push(itemToDelete.itemName)
            }
            this.buyItems = []
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
            this.allItems.splice(this.allItems.indexOf(itemToAdd.itemName), 1)
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
            this.allItems.push(itemToDelete.itemName)
          },
          async addToBuy(item) {
            const itemToBuy = {
              "itemName": item,
              "shoppingListId": "1",
              "amount": "10",
              "measurementType": "2"
            }
            this.buyItems.push(itemToBuy.itemName)
            this.shoppingList.splice(this.shoppingList.indexOf(itemToBuy.itemName), 1)
          },
          async removeFromBuy(item) {
            const itemFromBuy = {
              "itemName": item,
              "shoppingListId": "1",
              "amount": "10",
              "measurementType": "2"
            }
            this.buyItems.splice(this.buyItems.indexOf(itemFromBuy.itemName), 1)
            this.shoppingList.push(itemFromBuy.itemName)
          },
          async mount() {
            await this.getShoppingList()
            await this.getAllItems()
          }
      },
      beforeMount(){
        this.mount()
      }
  }
</script>

<style>
  #container{
      margin-top: 150px;
  }

</style>
