<template>
  <v-app>
    <div>
      <v-card id="menu" class="mx-auto" max-width="800">
        <v-card-title>Weekly menu</v-card-title>
        <v-card-subtitle>Choose the number of days you want to have a menu for and click generate</v-card-subtitle>
        <v-slider
        v-model="numCards" 
        min="1"
        max="7"
        :step="1"
        show-ticks="always"
        :ticks="tickLabels"
      >
        <template v-slot:append>
          <v-btn @click="generateCards">Generate recipes</v-btn>
        </template>
      </v-slider>
      
      </v-card>
    
      <div class="card-container">
        <v-card v-for="(card, index) in cards.slice(0, numCards)" :key="index" class="card">
          <v-card-title>{{ card.title }}</v-card-title>
          <v-card-subtitle>{{ card.subtitle }}</v-card-subtitle>
          <v-card-text>{{ card.content }}</v-card-text>
        </v-card>
      </div>
    </div>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      cards: [
        { title: 'Recipe 1', subtitle: 'Subtitle 1', content: 'Content for Recipe 1' },
        { title: 'Recipe 2', subtitle: 'Subtitle 2', content: 'Content for Recipe 2' },
        { title: 'Recipe 3', subtitle: 'Subtitle 3', content: 'Content for Recipe 3' },
        { title: 'Recipe 4', subtitle: 'Subtitle 4', content: 'Content for Recipe 4' },
        { title: 'Recipe 5', subtitle: 'Subtitle 5', content: 'Content for Recipe 5' },
        { title: 'Recipe 6', subtitle: 'Subtitle 6', content: 'Content for Recipe 6' },
        { title: 'Recipe 7', subtitle: 'Subtitle 7', content: 'Content for Recipe 7' }
      ],
      numCards: 3,
      tickLabels: {
        1: 1,
        2: 2,
        3: 3,
        4: 4,
        5: 5,
        6: 6,
        7: 7,
      }
    };
  },
  methods: {
    generateCards() {

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
  margin-bottom: 20px;
  margin: 20px;
}

#menu {
  margin: 20px
}
</style>