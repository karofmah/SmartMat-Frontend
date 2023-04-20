<template>
  <div id="container-categories">
    <div id="searchbar">
    <input id="search" placeholder="search your fridge...">
  </div>
    <div id="category-recipe">
    <div id="categories">
      <ul id="category-list">
        <li id="category-component"><CategoryComponent v-for="category in categories" :key="category.desc" :desc="category.desc" :items="category.items"/></li>
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
import CategoryComponent from "@/components/CategoryComponent.vue";

export default {
  components: {CategoryComponent},
  data() {
    return {
      recipe: null,
      show: false,
      categories: [
        {desc: "Dairy", items: [
            { title: ' One' },
            { title: ' Two' },
            { title: ' Three' },
            { title: ' Four' }]},
        {desc: "Meat"},
        {desc: "Vegetables"},
        {desc: "Dairy"},
        {desc: "Meat"},
        {desc: "Vegetables"},
        {desc: "Dairy"},
        {desc: "Meat"},
        {desc: "Vegetables"},
        {desc: "Dairy"},
        {desc: "Meat"},
        {desc: "Vegetables"}
      ]
    }
  },
  methods: {
    showIngredients() {
      this.show = !this.show;
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
  width: 50%;
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
  width: 100%;
}
#search {
  border: solid black;
}

#generate {
  margin: 10px;
  width: 50%;
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
