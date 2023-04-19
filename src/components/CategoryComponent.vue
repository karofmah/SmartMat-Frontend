<template>
  <div class="text-center">
    <v-menu
        open-on-hover
    >
      <template v-slot:activator="{ props }">
        <v-btn
            color="primary"
            v-bind="props"
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
  data: () => ({
    desc: "Category",
    items: [
      { title: 'Item One' },
      { title: 'Item Two' },
      { title: 'Item Three' },
      { title: 'Item Four' },
    ],
  }),
}
</script>

<style>
.text-center {
  display: inline-block;
  margin-right: 20px;
  padding: 20px;
  width: 130px;
  height: 50px;
  cursor: pointer;
  margin-bottom: 18px;
  text-align: left;
}

</style>