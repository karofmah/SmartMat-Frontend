<template>
  <v-app>
    <div id="container-categories">
      <div id="searchbar">
      </div>
      <div id="category-recipe">
        <v-card id="categories" class="card">
          <v-toolbar color="teal">
            <v-toolbar-title>Your Fridge</v-toolbar-title>
          </v-toolbar>
          <div id="error-fridge"><p v-if="betaUser">You are not authorized add items to the fridge :(</p></div>
          <div id="topBar">
          <!-- <div id="search"><v-autocomplete  placeholder="search your fridge..." :items="myItems" ></v-autocomplete></div> -->
            <v-dialog v-model="dialog" persistent width="400">
              <template v-slot:activator="{ props }">
                <div id="addNewItemButton" >
                  <v-btn color="" v-bind="props" :disabled="betaUser">
                    Add new item
                  </v-btn>
                </div>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">Add new item to fridge</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12">
                        <v-autocomplete type="text" placeholder="Select food" clearable :items="items" v-model="newItemName" :rules="[ checkName ]"></v-autocomplete>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                            label="Amount*"
                            v-model="newItemAmount"
                            :rules="[ checkAmount ]"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-autocomplete
                            :items="['G', 'KG', 'DL', 'L', 'UNIT']"
                            label="Measurement type*"
                            v-model="newItemMeasurement"
                            :rules="[ checkMeasurement ]"
                        ></v-autocomplete>
                      </v-col>
                    </v-row>
                  </v-container>
                  <small>*indicates required field</small>
                  <div><small v-if="error" class="error-message">*all required fields are not filled</small></div>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                      color="blue-darken-1"
                      variant="text"
                      @click="dialog = false"
                  >
                    Close
                  </v-btn>
                  <v-btn
                      color="blue-darken-1"
                      variant="text"
                      @click="addToFridge"
                  >
                    Add
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>
          <div>
            <v-text-field
              v-model="search"
              append-inner-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
            <v-data-table
              v-model:expanded="expanded"
              :group-by="groupBy"
              :headers="headers"
              :items="fridgeItems"
              :sort-by="sortBy"
              :search="search"
              :expanded.sync="expanded"
              class="elevation-1"
              item-key="name"
              items-per-page="-1"
              show-expand
              hide-default-footer
            >
            <template v-slot:expanded-row="{ item }">   
              <td>
                <p v-for="food in item.raw.foods">
                  <v-icon
                        size="small"
                        class="me-2"
                        @click="editDate(item.raw.id, food.id, food.amount, food.measurement, food.date)"
                      >
                        mdi-calendar
                      </v-icon>
                      <v-icon
                        size="small"
                        @click="deleteItem(food)"
                      >
                        mdi-delete
                      </v-icon>
                </p>
              </td>
              <td>
                <p v-for="food in item.raw.foods">{{ food.name }}</p>
              </td>
              <td>
                <p v-for="food in item.raw.foods">{{ food.amount }}</p>
              </td>
              <td>
                <p v-for="food in item.raw.foods">{{ food.measurement }}</p>
              </td>
              <td>
                <p v-for="food in item.raw.foods">{{ food.date }}</p>
              </td>
            </template>
              <template v-slot:bottom>
                <v-spacer></v-spacer>
              </template>
            </v-data-table>


            <v-dialog
              v-model="picker"
              persistent
              width="300"
            >
              <v-card>
                <v-card-title class="text-h5">
                  Add expiration date
                </v-card-title>
                <div id="datepicker"><datepicker
                  v-model="selectedDate"
                  lang="en"
                  starting-view="day"
                  placeholder="expiration date"
                  format="YYYY-MM-dd"
                  type="date"
                  :lower-limit="new Date()"
                ></datepicker></div>
                <v-card-actions>
                  <v-btn
                    color="green-darken-1"
                    variant="text"
                    @click="(picker = false)"
                >
                    Cancel
                  </v-btn>
                  <v-btn
                    color="green-darken-1"
                    variant="text"
                    @click="updateFridgeItem"
                  >
                    Add
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>

        </v-card>

        <div id="generate">
          <v-card id="recipe" class="card">
            <v-toolbar color="teal">
              <v-toolbar-title>Recepie generator</v-toolbar-title>
              <v-btn id="generateButton" variant="tonal" @click="generateRecipe" icon="mdi-silverware"></v-btn>
            </v-toolbar>
            <v-card-text class="text-pre-wrap">{{ recipe }}</v-card-text>
          </v-card>
        </div>
      </div>
    </div>
  </v-app>
</template>

<script>
import fridgeService from "@/services/fridgeService";
import CategoryComponent from "@/components/CategoryComponent.vue";
import recipeService from "@/services/recipeService.js";
import Datepicker from 'vue3-datepicker';
import { ref } from 'vue'

export default {
  components: {CategoryComponent, Datepicker},
  data() {
    return {
      dialog: false,
      picker: false,
      deleteDialog: false,
      newItemName: null,
      newItemAmount: null,
      newItemMeasurement: null,
      recipe: "This is your AI powerd dinner generator.\nTo create a recepie using ingredients in your fridge, press the knife and fork icon in the toolbar.",
      show: false,
      editedFoodId: null,
      editedFoodItemId: null,
      editedFoodItemDate: null,
      editedFoodItemAmount: null,
      editedFoodItemMeasurement: null,
      items: [],
      myItems: [],
      fridgeItems: [],
      categories: null,
      nameCheck: false,
      amountCheck: false,
      measurementCheck: false,
      error: false,
      betaUser: null,
      search: '',
      expanded: [],
      singleExpanded: false,
      sortBy: [{ key: 'name' }],
      groupBy: [{ key: 'category' }],
      headers: [
        {
          title: 'Food items',
          align: 'start',
          value: 'name',
          groupable: false,
      },
      {title: 'Amount', value: 'amount'},
      {title: 'Measurement', value: 'measurement'},
      {title: 'Date', value: 'date'},
    ],
    }
  },
  methods: {
    async addToFridge(){
      if(this.nameCheck && this.amountCheck && this.measurementCheck) {
        this.error = false
        this.myItems = [];
        const item = {
          "itemName": this.newItemName,
          "refrigeratorId": localStorage.getItem("fridgeId"),
          "amount": this.newItemAmount,
          "measurementType": this.newItemMeasurement
        }
        await fridgeService.addNewItemToFridge(item)
        this.dialog = false
        await this.getAllFridgeItems()
      } else {
        this.error = true
      }

    },
    async getAllCategories(){
      this.categories = await fridgeService.getAllCategories()
      console.log(this.categories);
    },
    async setUserLevel(){
      if (localStorage.getItem("userType") === "false"){
        this.betaUser = true;
      } else {
        this.betaUser = false;
      }
    },
    async handleUpdate() {
      await this.getAllFridgeItems(localStorage.getItem("email"))
    },
    async getAllFridgeItems(){
      try {
        this.myItems = []
        this.fridgeItems = []
        const list = await fridgeService.getAllItemsInFridge(localStorage.getItem("email"))
        console.log(list)
        for(let i = 0; i < list.length; i++){
          this.myItems.push(list[i].item.name + " (" + list[i].amount + ")")
          let fridgeSubItems = []
          let amount = 0
          for(let j = 0; j < list[i].itemsInRefrigerator.length; j++){
            fridgeSubItems.push({ 'id': list[i].itemsInRefrigerator[j].itemExpirationDateId, 'name': list[i].item.name, 'amount': list[i].itemsInRefrigerator[j].amount, 'measurement': list[i].measurementType, 'date': ((list[i].itemsInRefrigerator[j].date != null) ? list[i].itemsInRefrigerator[j].date : '-')  })
            amount += list[i].itemsInRefrigerator[j].amount
          }
          // const dates = fridgeSubItems.map(({date}) => new Date(date))
          // const minDate = new Date(Math.min(...dates))    minDate.toISOString().slice(0,10)
          this.fridgeItems.push({'id': list[i].itemRefrigeratorId, 'name': list[i].item.name, 'amount': amount, 'measurement': list[i].measurementType, 'date': list[i].itemsInRefrigerator[0].date, 'foods': fridgeSubItems, 'category': this.getCategoryById(list[i].item.categoryId)})
        }
        console.log(this.fridgeItems);
      } catch(err) {
        console.log(err)
      }
    },
    async updateFridgeItem(){
      this.fridgeItems = this.fridgeItems.map(obj => {
        if (obj.id == this.editedFoodId) {
          (obj.date == this.editedFoodItemDate) ? obj.date = new Date(this.selectedDate).toISOString().slice(0,10) : obj.date
          obj.foods.map(m => {
            if (m.id == this.editedFoodItemId) {
              m.date = new Date(this.selectedDate).toISOString().slice(0,10)
            }
            return m
          })
        }
        return obj
      })
      this.picker = false
      let item = {
        'itemExpirationDateId': this.editedFoodItemId,
        'amount': this.editedFoodItemAmount,
        'measurementType': this.editedFoodItemMeasurement,
        'date': new Date(this.selectedDate).toISOString().slice(0,10)
      }
      console.log(item);
      await fridgeService.updateItemInFridge(item)
    },
    async getAllItems(){
      try {
        const list = await fridgeService.getAllItems()
        console.log("getting all items")
        for(let i = 0; i < list.length; i++){
          this.items.push(list[i].name)
        }
      } catch(err) {
        console.log(err)
      }
    },
    checkName(value){
      if (value?.length > 0) {
        this.nameCheck = true;
        return true
      } else {
        this.nameCheck = false;
        return 'Name cannot be empty.'
      }
    },
    checkAmount(value){
      if (value > 0) {
        this.amountCheck = true;
        return true
      } else {
        this.amountCheck = false;
        return 'Amount cannot be below 0.'
      }
    },
    checkMeasurement(value){
      if (value?.length > 0) {
        this.measurementCheck = true;
        return true
      } else {
        this.measurementCheck = false;
        return 'Measurement cannot me empty.'
      }
    },
    async generateRecipe(){
      this.recipe = "Generating recipe..."
      const recipe = await recipeService.getRecipe(localStorage.getItem("fridgeId"))
      this.recipe = recipe
    },
    getCategoryById(id) {
      const i = this.categories.findIndex(function(Ids) {
        return Ids.categoryId == id
      })
      console.log(this.categories[i].description);
      return this.categories[i].description
    },
    async editDate(itemId, dateId, amount, measurement, date){
      console.log(itemId);
      console.log(dateId);
      this.editedFoodId = itemId
      this.editedFoodItemId = dateId
      this.editedFoodItemDate = date
      this.editedFoodItemAmount = amount
      this.editedFoodItemMeasurement = measurement
      this.picker = true
    },
    deleteItem(item){
      console.log(item)
    }
  },
  created(){
    this.getAllCategories()
    this.getAllItems()
    this.getAllFridgeItems()
    this.setUserLevel()
  },
  setup() {
    const selectedDate = ref(new Date());
    return {
      selectedDate
    }
  }
}


</script>

<style>
#container-categories {
  display: flex;
  padding: 50px;
  flex-wrap: wrap;
}

#categories {
  display: inline-block;
  flex-wrap: wrap;
  text-align: center;
  justify-content: center;
}

#category-recipe {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

#category-list {
  float: left;
}

#searchbar {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
#search {
  width: 100%;
  max-width: 300px;
  margin: 10px;
}
#category-list {
  list-style-type: none;
  overflow: hidden;
}
#topBar {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
#category-component {
  float: left;
  margin: 10px;
}
#addNewItemButton{
  margin: 10px;
  margin-top: 20px;

}
.textarea{
  resize: none;
}
#error-fridge {
  margin: 10px;
}
.card {
  width: 700px;
  max-width: 700px;
  margin: 20px;
}
#datepicker {
  display: inline-block;
  text-align: center;
  align-items: center;
  width: 100%;
  height: 275px;
}
datepicker {
  border: black;
  box-shadow: 0 4px 10px 0 rgba(128, 144, 160, 0.1), 0 0 1px 0 rgba(128, 144, 160, 0.81);
}

</style>
