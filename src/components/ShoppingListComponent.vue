<template>
  <v-container id="container">
      <v-row justify="space-around">
          <v-card class="mx-auto" width="800">
              <v-toolbar color="teal">
                  <v-toolbar-title id="shoppinglist-title">Shopping list</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-dialog
                    v-model="dialog"
                    max-width="500px"
                  >
                    <template v-slot:activator="{ props }">
                      <v-btn
                        color="primary"
                        dark
                        class="mb-2"
                        v-bind="props"
                      >
                        New Item
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-title>
                        <span class="text-h5">{{ formTitle }}</span>
                      </v-card-title>
                      <v-form v-model="form" @submit.prevent="save">
                        <v-card-text>
                          <v-container>
                            <v-row>
                              <v-col
                                cols="12"
                                sm="6"
                                md="4"
                              >
                                <v-autocomplete
                                  id="add-to-cart"
                                  type="text"
                                  label="Food Name"
                                  clearable
                                  :items="allItems"
                                  v-model="editedItem.name"
                                  :rules="[required]"
                              />
                              </v-col>
                              <v-col
                                cols="12"
                                sm="6"
                                md="4"
                              >
                                <v-text-field
                                  v-model.number="editedItem.amount"
                                  label="Amount"
                                  clearable
                                  :rules="[isInt, isPositive, required]"
                                ></v-text-field>
                              </v-col>
                              <v-col
                                cols="12"
                                sm="6"
                                md="4"
                              >
                                <v-text-field
                                  v-model="editedItem.measurement"
                                  label="Measurement type"
                                  clearable
                                  :rules="[required]"
                                ></v-text-field>
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-card-text>

                        <v-card-actions>
                          <v-btn
                            color="blue-darken-1"
                            variant="text"
                            @click="close"
                          >
                            Cancel
                          </v-btn>
                          <v-btn
                            color="blue-darken-1"
                            variant="text"
                            @click="save"
                            type="submit"
                          >
                            Save
                          </v-btn>
                        </v-card-actions>
                      </v-form>
                    </v-card>
                  </v-dialog>
                  <v-spacer></v-spacer>
                  <v-btn icon @click="addRecommendedItems">
                      <v-icon>mdi-auto-fix</v-icon>
                      <v-tooltip id="shoppinglist-tooltip" activator="parent" location="start">Add recommended items to shopping list</v-tooltip>
                  </v-btn>
                  <v-btn icon @click="buy">
                      <v-icon>mdi-fridge</v-icon>
                      <v-tooltip id="shoppinglist-tooltip" activator="parent" location="start">Add selected items to fridge</v-tooltip>
                  </v-btn>
              </v-toolbar>
              <div id="lists">
                  <v-data-table
                    v-model="buyItems"
                    :headers="headers"
                    :items="shoppingList"
                    item-value="name"
                    show-select
                    class="elevation-1"
                    items-per-page="-1"
                  >
                    <template v-slot:item.subUser="{ item }">
                      <v-icon v-if="item.raw.subUser !== 'true'" icon="mdi-checkbox-blank-outline" color="red"></v-icon>
                      <v-icon v-if="item.raw.subUser !== 'false'" icon="mdi-checkbox-marked" color="teal"></v-icon>
                    </template>
                    <template v-slot:item.actions="{ item }">
                      <v-icon
                        size="small"
                        class="me-2"
                        @click="editItem(item.raw)"
                      >
                        mdi-pencil
                      </v-icon>
                      <v-icon
                        size="small"
                        @click="deleteItem(item.raw)"
                      >
                        mdi-delete
                      </v-icon>
                    </template>
                  </v-data-table>
              </div>
              <div id="input">
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
        form: false,
        shoppingList: [],
        selectedItem: "",
        allItems:[],
        buyItems: [],
        headers: [
          {
            title: 'Food',
            align: 'start',
            sortable: false,
            key: 'name',
          },
          { title: 'Amount', key: 'amount' },
          { title: 'Measurement type', key: 'measurement' },
          { title: 'Added by super user', key: 'subUser' },
          { title: 'Actions', key: 'actions' },
        ],
        editedIndex: -1,
        editedItem: {
          name: '',
          amount: '1',
          measurement: 'kg',
          subUser: '',
        },
        defaultItem: {
          name: '',
          amount: '1',
          measurement: 'kg',
          subUser: '',
        },
        dialog: false,
      }
    },
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    },
    watch: {
      dialog (val) {
        val || this.close()
      },
    },
    methods: {
      async getShoppingList(){
        try {
          const list = await shoppingListService.getShoppingListItems(localStorage.getItem("email"))
          console.log(list.items);
          for(let i = 0; i<list.items.length; i++){
            if(!this.buyItems.includes(list.items[i].item.name)){
              this.shoppingList.push({"name": list.items[i].item.name,"amount": list.items[i].amount, "measurement": list.items[i].measurementType, "subUser": list.items[i].subUserAccessLevel.toString()})
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
      editItem (item) {
        this.editedIndex = this.shoppingList.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      async deleteItem (item) {
        this.editedIndex = this.shoppingList.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.shoppingList.splice(this.editedIndex, 1)
        console.log(this.editedItem);
        console.log(localStorage.getItem("subUserId"))
        const itemToDelete = {
          "itemName":this.editedItem.name,
          "shoppngListId": parseInt(localStorage.getItem("shoppingListId")),
          "amount": this.editedItem.amount,
          "measurementType": 2
        }
        console.log(itemToDelete)
        this.editedIndex = -1
        //await shoppingListService.deleteItemFromShoppingList(itemToDelete)
      },
      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
      save () {
        if (!this.form) return
        this.editedItem.subUser = localStorage.getItem("userType")
        if (this.editedIndex > -1) {
          Object.assign(this.shoppingList[this.editedIndex], this.editedItem)
        } else {
          this.shoppingList.push(this.editedItem)
        }
        this.editedItem = Object.assign({}, this.defaultItem)
        this.close()
      },
      required (v) {
        return !!v || 'Field is required'
      },
      isInt (v) {
        return Number.isInteger(Number(v)) || "The value must be an integer number"
      },
      isPositive (v) {
        return v > 0 || "The value must be greater than zero"
      },

      async buy(){
        console.log(this.buyItems);
      //   for(let i = 0; i<this.buyItems.length; i++){
      //     const item = {
      //       "itemName": this.buyItems[i],
      //       "refrigeratorId": "1",
      //       "amount": "10",
      //       "measurementType": "2"
      //     }
      //     await fridgeService.addNewItemToFridge(item)

      //     const itemToDelete = {
      //       "itemName": this.buyItems[i],
      //       "shoppingListId": "1",
      //       "amount": "10",
      //       "measurementType": "2"
      //     }
      //     await shoppingListService.deleteItemFromShoppingList(itemToDelete)
      //     this.allItems.push(itemToDelete.itemName)
      //   }
      //   this.buyItems = []
      //   this.shoppingList = []
      //   await this.getShoppingList()
      },
      // async addItem() {
      //   const itemToAdd = {
      //     "itemName": this.selectedItem,
      //     "shoppingListId": "1",
      //     "amount": "10",
      //     "measurementType": "2"
      //   }

      //   await shoppingListService.addShoppingListItems(itemToAdd)
      //   this.shoppingList = []
      //   await this.getShoppingList()
      //   this.selectedItem = "";
      //   this.allItems.splice(this.allItems.indexOf(itemToAdd.itemName), 1)
      // },
      // async removeList(item) {
      //   const itemToDelete = {
      //     "itemName": item,
      //     "shoppingListId": "1",
      //     "amount": "10",
      //     "measurementType": "2"
      //   }
      //   await shoppingListService.deleteItemFromShoppingList(itemToDelete)
      //   this.shoppingList = []
      //   await this.getShoppingList()
      //   this.allItems.push(itemToDelete.itemName)
      // },
      // async addToBuy(item) {
      //   const itemToBuy = {
      //     "itemName": item,
      //     "shoppingListId": "1",
      //     "amount": "10",
      //     "measurementType": "2"
      //   }
      //   this.buyItems.push(itemToBuy.itemName)
      //   this.shoppingList.splice(this.shoppingList.indexOf(itemToBuy.itemName), 1)
      // },
      // async removeFromBuy(item) {
      //   const itemFromBuy = {
      //     "itemName": item,
      //     "shoppingListId": "1",
      //     "amount": "10",
      //     "measurementType": "2"
      //   }
      //   this.buyItems.splice(this.buyItems.indexOf(itemFromBuy.itemName), 1)
      //   this.shoppingList.push(itemFromBuy.itemName)
      // },
      async addRecommendedItems(){

        const shoppingListId = (await shoppingListService.getShoppingListItems(localStorage.getItem("email"))).shoppingListId
        const subUserId = localStorage.getItem("subUserId")


        await shoppingListService.addShoppingPopularItems(shoppingListId, subUserId)

        this.shoppingList = []
        await this.getShoppingList()
        this.selectedItem = "";
        this.allItems.splice(this.allItems.indexOf(itemToAdd.itemName), 1)
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
