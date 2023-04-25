<template>
  <div class="text-center">
    <v-menu
        open-on-hover
    >
      <template v-slot:activator="{ props }">
        <v-btn
            color="green"
            v-bind="props"
            id="category-button"
        >{{ desc }}
        </v-btn>
      </template>

      <v-list>
        <v-list-item
            v-for="(item, index) in items"
            :key="index"
        >
          <v-list-item-title>{{ item.name }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
import fridgeService from "@/services/fridgeService";
export default {
  props: {
    id: Number,
    desc: String,
  },
  data(){
    items: null
  },
  methods: {
    async getAllItemsByCategory(){
      this.items = await fridgeService.getAllItemsByCategory(this.id)
    }
  },
  beforeMount(){
    this.getAllItemsByCategory()
  }
}
</script>

<style>
.text-center {
  display: inline-block;
  margin-right: 20px;
  min-width: 140px;
  height: 50px;
  cursor: pointer;
  margin-bottom: 18px;
}

#category-button {
  width: 150px;
}

</style>
