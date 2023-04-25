<template>
  <div id="container-categories">
    <div id="searchbar">
    <v-autocomplete id="search" placeholder="search your fridge..." :items="items.name" ></v-autocomplete>
  </div>
    <div id="category-recipe">
    <div id="categories">
      <ul id="category-list">
        <li id="category-component"><CategoryComponent v-for="category in categories" :key="category.description" :desc="category.description" :id="category.categoryId" :items="category.items"/></li>
      </ul>
    </div>

    <div id="generate">
      <v-btn id="generateButton">Generate recipe</v-btn>
      <div id="recipe-box">
      <textarea v-model="recipe" id="recipe">
      </textarea>
    </div>
    </div>
  </div>
  </div>
</template>

<script>
import fridgeService from "@/services/fridgeService";
import CategoryComponent from "@/components/CategoryComponent.vue";

export default {
  components: {CategoryComponent},
  data() {
    return {
      recipe: null,
      show: false,
      items: null,
      categories: null
    }
  },
  methods: {
    showIngredients() {
      this.show = !this.show;
    },
    async getAllCategories(){
      console.log(await fridgeService.getAllCategories())
      this.categories = await fridgeService.getAllCategories()
    },
    async getAllItems(){
      this.items = await fridgeService.getAllItemsInFridge(1)
      console.log(this.items)
    }
  },
  beforeMount(){
    this.getAllCategories()
    this.getAllItems()
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
}

#category-list {
  float: left;
}

#searchbar {
  width: 30%;
}
#search {
}

#generate {
  margin: 10px;
  width: 49%;
  text-align: center;
}
#generateButton {
  border: solid black;
  margin: 5px;
}

#recipe-box {
  margin: 10px;
}


#recipe {
  height: 200px;
  border: solid black;
  width: 90%;
}

ul#category-list {
  list-style-type: none;
  overflow: hidden;
}

category-component{
  float: left;
  margin: 10px;
}
li#category-component {
  float: left;
  margin: 10px;;
}
</style>
