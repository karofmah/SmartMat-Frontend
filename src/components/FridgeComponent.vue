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
          <div id="search"><v-autocomplete  placeholder="search your fridge..." :items="myItems" ></v-autocomplete></div>
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
                            :items="['KG', 'DL', 'L']"
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
          <ul id="category-list">
            <li id="category-component"><CategoryComponent v-on:update-fridge="handleUpdate" v-for="category in categories" :key="category.description" :desc="category.description" :id="category.categoryId" :items="category.items"/></li>
          </ul>
        </v-card>

        <div id="generate">
          <v-card id="recipe" class="card">
            <v-toolbar color="teal">
              <v-toolbar-title>Recipe generator</v-toolbar-title>
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

export default {
  components: {CategoryComponent},
  data() {
    return {
      dialog: false,
      newItemName: null,
      newItemAmount: null,
      newItemMeasurement: null,
      recipe: "This is your AI powered dinner generator.\nTo create a recipe using ingredients in your fridge, press the knife and fork icon in the toolbar.",
      show: false,
      items: [],
      myItems: [],
      categories: null,
      nameCheck: false,
      amountCheck: false,
      measurementCheck: false,
      error: false,
      betaUser: null
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
      console.log(await fridgeService.getAllCategories())
      this.categories = await fridgeService.getAllCategories()
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
        const list = await fridgeService.getAllItemsInFridge(localStorage.getItem("email"))
        console.log("getting all items in my fridge")
        for(let i = 0; i < list.length; i++){
          this.myItems.push(list[i].item.name + " (" + list[i].amount + ")")
        }
      } catch(err) {
        console.log(err)
      }
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
      let recipe = await recipeService.getRecipe(localStorage.getItem("fridgeId"))
      if(recipe === 500) {
        recipe = "There was an error creating your recipe. Please try again later"
      }
      this.recipe = recipe
    },
  },
  created(){
    this.getAllCategories()
    this.getAllItems()
    this.getAllFridgeItems()
    this.setUserLevel()
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
  width: 49%;
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

#error-fridge {
  margin: 10px;
}
.card {
  width: 600px;
  max-width: 600px;
  margin: 20px;
}

</style>
