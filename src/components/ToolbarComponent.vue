<template>
  <nav>
    <v-toolbar flat app>
      <v-toolbar-title class="text-uppercase grey--text">
        <span class="font-weight-light">Smart</span>
        <span>Mat</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-tab flat color="grey" to="/fridge">Fridge<v-icon icon="mdi-fridge"></v-icon></v-tab>
      <v-tab flat color="grey" to="/list">Shopping list<v-icon icon="mdi-format-list-checkbox"></v-icon></v-tab>
      <v-tab flat color="grey" to="/recipe">Menus<v-icon icon="mdi-silverware"></v-icon></v-tab>
      <v-tab flat color="grey" to="/settings">Settings<v-icon icon="mdi-cog"></v-icon></v-tab>
      <v-tab flat color="grey" to="/">Sign out<v-icon icon="mdi-exit-to-app"></v-icon></v-tab>
    </v-toolbar>
  </nav>
</template>

<script>
export default {

}
</script>
