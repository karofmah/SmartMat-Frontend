<template>
  <v-app>
    <div>
      <v-card id="menu" class="mx-auto" max-width="800" :loading="loading">
        <template v-slot:loader="{ isActive }">
          <v-progress-linear
            :active="isActive"
            color="deep-purple"
            height="4"
            indeterminate
          ></v-progress-linear>
        </template>
        <v-card-title>Weekly menu</v-card-title>
        <v-card-subtitle>Choose the number of people you want to have a menu for and click generate</v-card-subtitle>
        <v-slider
        v-model="numPeople"
        min="1"
        max="8"
        :step="1"
        show-ticks="always"
        :ticks="tickLabels"
        :disabled="betaUser"
      >
        <template v-slot:append>
          <v-btn :disabled="betaUser" @click="generateRecipes(email, numPeople)">Generate recipes</v-btn>
        </template>
      </v-slider>
      <v-dialog
        :model-value="loadingCard"
        class="align-center justify-center"
        persistent
        width="auto"
      >
        <v-card>
          <v-card-title class="text-h5">
            Please wait
          </v-card-title>
          <v-card-text>The Ai is generating a recepie please wait while it does so, it might take a minute. <br/> Leaving the page will stop the process.
This dialog will close when the process is done</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn variant="text" color="red" @click="loadingCard = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      </v-card>
      <div id="user-level-recipe"><p v-if="betaUser">You are not authorized to create a menu :(</p></div>
      <div class="card-container">

        <v-card v-for="(card, index) in cards.slice(0, numCards)" :key="index" class="card">
          <v-toolbar color="teal">
            <v-toolbar-title>{{ card.title }}</v-toolbar-title>
          </v-toolbar>
          <v-card-subtitle class="text-pre-wrap">{{ card.subtitle }}</v-card-subtitle>
          <v-card-text class="text-pre-wrap">{{ card.content }}</v-card-text>
        </v-card>

      </div>
    </div>
  </v-app>
</template>

<script>
import recipeService from "@/services/recipeService.js";
import router from "@/router";

export default {
  data() {
    return {
      cards: [],
      numCards: 7,
      tickLabels: {
        1: 1,
        2: 2,
        3: 3,
        4: 4,
        5: 5,
        6: 6,
        7: 7,
        8: 8,
      },
      numPeople: 4,
      betaUser: null,
      loading: false,
      loadingCard: false,
      email: localStorage.getItem("email"),
    };
  },
  methods: {
    async generateRecipes(email, numPeople) {
      this.loading = true
      this.loadingCard = true
      const menuString = await recipeService.generateWeeklyMenus(email, numPeople)
      console.log(menuString);
      //const menuString = 'Monday: Chicken Fajitas\nIngredients:\n- 4 chicken breasts, sliced\n- 1 red bell pepper, sliced\n- 1 green bell pepper, sliced\n- 1 onion, sliced\n- 2 tbsp olive oil\n- 1 tsp chili powder\n- 1 tsp cumin\n- 1 tsp garlic powder\n- Salt and pepper to taste\n- Flour tortillas\n- Optional toppings: shredded cheese, sour cream, salsa\n\nDirections:\n1. In a large skillet, heat olive oil over medium-high heat.\n2. Add chicken and cook until browned on all sides.\n3. Add bell peppers and onion to the skillet and cook until vegetables are tender.\n4. Add chili powder, cumin, garlic powder, salt, and pepper to the skillet and stir to combine.\n5. Serve chicken and vegetables in flour tortillas with desired toppings.\n\nTuesday: Spaghetti and Meatballs\nIngredients:\n- 1 lb ground beef\n- 1/2 cup breadcrumbs\n- 1/4 cup milk\n- 1 egg\n- 1/4 cup grated Parmesan cheese\n- 1 tsp garlic powder\n- Salt and pepper to taste\n- 1 jar spaghetti sauce\n- 1 lb spaghetti noodles\n\nDirections:\n1. Preheat oven to 375°F.\n2. In a large bowl, combine ground beef, breadcrumbs, milk, egg, Parmesan cheese, garlic powder, salt, and pepper.\n3. Roll mixture into 1-inch meatballs and place on a baking sheet.\n4. Bake meatballs for 20-25 minutes or until cooked through.\n5. While meatballs are cooking, cook spaghetti noodles according to package instructions.\n6. Heat spaghetti sauce in a large saucepan over medium heat.\n7. Serve meatballs and sauce over spaghetti noodles.\n\nWednesday: Grilled Cheese and Tomato Soup\nIngredients:\n- 8 slices bread\n- 8 slices cheddar cheese\n- Butter\n- 2 cans tomato soup\n- 1 cup milk\n\nDirections:\n1. Heat a large skillet over medium heat.\n2. Butter one side of each slice of bread.\n3. Place a slice of cheese between two slices of bread, buttered side facing out.\n4. Place sandwich in skillet and cook until bread is golden brown and cheese is melted.\n5. Repeat with remaining bread and cheese slices.\n6. In a large saucepan, heat tomato soup and milk over medium heat until heated through.\n7. Serve grilled cheese sandwiches with tomato soup for dipping.\n\nThursday: Beef Stir Fry\nIngredients:\n- 1 lb beef sirloin, sliced\n- 1 red bell pepper, sliced\n- 1 green bell pepper, sliced\n- 1 onion, sliced\n- 2 tbsp vegetable oil\n- 1/4 cup soy sauce\n- 2 tbsp honey\n- 1 tsp garlic powder\n- Salt and pepper to taste\n- Rice\n\nDirections:\n1. In a large skillet or wok, heat vegetable oil over high heat.\n2. Add beef and cook until browned on all sides.\n3. Add bell peppers and onion to the skillet and cook until vegetables are tender.\n4. In a small bowl, whisk together soy sauce, honey, garlic powder, salt, and pepper.\n5. Pour sauce over beef and vegetables and stir to combine.\n6. Serve beef stir fry over rice.\n\nFriday: Margherita Pizza\nIngredients:\n- 1 lb pizza dough\n- 1/2 cup pizza sauce\n- 2 cups shredded mozzarella cheese\n- 2 roma tomatoes, sliced\n- Fresh basil leaves\n\nDirections:\n1. Preheat oven to 425°F.\n2. Roll out pizza dough on a floured surface and transfer to a baking sheet.\n3. Spread pizza sauce over dough, leaving a 1-inch border around the edges.\n4. Sprinkle shredded mozzarella cheese over sauce.\n5. Arrange tomato slices on top of cheese.\n6. Bake pizza for 12-15 minutes or until crust is golden brown and cheese is melted.\n7. Top pizza with fresh basil leaves before serving.\n\nCombined Shopping List:\n- 4 chicken breasts\n- 1 lb ground beef\n- 1 lb beef sirloin\n- 2 red bell peppers\n- 2 green bell peppers\n- 3 onions\n- 2 roma tomatoes\n- Flour tortillas\n- Spaghetti noodles\n- 1 jar spaghetti sauce\n- Bread\n- Cheddar cheese\n- Butter\n- 2 cans tomato soup\n- Milk\n- Soy sauce\n- Honey\n- Garlic powder\n- Salt\n- Pepper\n- Pizza dough\n- Pizza sauce\n- Shredded mozzarella cheese\n- Fresh basil leaves'
      this.getMenuCards(menuString)
    },
    async getRecipes(email) {
      this.loading = true
      const menuString = await recipeService.getWeeklyMenu(email)
      this.getMenuCards(menuString)
    },
    getMenuCards(menuString) {
      try {
        const menuArray = menuString.split('\n\n')
        const menuCards = []

        for (let i = 0; i < this.numCards; i++) {
          const res = menuArray[2*i]+ '\n\n' + menuArray[2*i+1]
          const dayString = res.split(/\n(.*)/s).join('\n\n').split('\n\n')
          const title = dayString.shift()
          const subtitle = dayString.shift()
          const content = dayString.shift()
          menuCards.push({ title, subtitle, content })
        }
        this.loading = false
        this.loadingCard = false
        this.cards = menuCards
      } catch (err) {
        console.log(err)
      }

    },
    async setUserLevel(){
      this.betaUser = localStorage.getItem("userType") === "false";
    }
  },
  created() {
    const email = this.email
    this.getRecipes(email)
    this.setUserLevel()
    },
  mounted(){
    if (localStorage.getItem("token") === null){
      router.push("/")
    }
  }
};
</script>

<style scoped>
.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

}

.card {
  width: 600px;
  margin: 20px;
}

#menu {
  margin: 20px
}
#user-level-recipe {
  text-align: center;
}
</style>
