<template>
  <div id="container-categories">
    <div id="categories">
      <ul id="category-list">
        <li id="category-component"><CategoryComponent v-for="category in categories" :key="category.desc" :desc="desc"/></li>
      </ul>
    </div>
    <div id="searchbar">
      <input id="search" placeholder="search your fridge...">
    </div>
    <div id="generate">
      <button id="generateButton">Generate recipe</button>
    </div>
    <div id="recipe-box">
      <textarea v-model="recipe" id="recipe">
      </textarea>
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
        {desc: "Dairy"},
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
  display: grid;
  padding: 50px;
  grid-column-gap: 70px;
}

#categories {
  grid-column-start: 1;
  grid-column-end: 2;
  display: inline-block;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
  grid-area: 1 / 1 / span 3 / span 1
}

#category-list {
  float: left;
}

#searchbar {
  grid-column-start: 2;
  grid-column-end: 3;
}
#search {
  border: solid black;
}

#generate {
  grid-column-start: 3;
  grid-column-end: 4;
  margin: 10px;
  display: grid;
  justify-items: center;
}
#generateButton {
  border: solid black;
}

#recipe-box {
  grid-column-start: 3;
  grid-column-end: 4;
  margin: 10px;
  display: grid;
  justify-items: center;
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
