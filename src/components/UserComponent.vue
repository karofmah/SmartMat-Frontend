<template>
  <v-card variant="outlined" class="user-card" >
    <v-card-title v-if="!edit">{{ name }} </v-card-title>
    <v-card-subtitle v-if="!edit">{{ type }}</v-card-subtitle>
    <input v-if="edit" id="edit-name-input">
    <select :type="type" v-if="edit">
      <option v-for="type in types">{{type.name}}</option>
    </select>
    <div><img src="../assets/logo.png" id="user-image"></div>
    <v-card-actions>
      <v-btn v-if="!edit && $route.name !== 'chooseUser'" @click="editInfo">Change info</v-btn>
      <v-btn v-if="edit" @click="editInfo">Save info</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "user-component",
  props: {
    name: String,
    type: String,
  },
  data() {
    return {
      edit: false,
      types: [{name: "superbruker"}, {name: "vanlig bruker"}]
    }
  },
  methods:{
    editInfo(){
      this.edit = !this.edit
    }
  }
}
</script>

<style>
.user-card {
  display: inline-block;
  margin: 20px;
  width: 200px;
  height: 230px;
  cursor: pointer;
  border: 1px solid #39495c;
  text-align: center;
}
.user:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
}
#user-image {
  width: 100px;
  height: 100px;
}
#edit-name-input {
  margin-top: 10px;
}
</style>
