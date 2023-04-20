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
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
export default {
  props: {
    desc: String,
    items: Object
  },
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
