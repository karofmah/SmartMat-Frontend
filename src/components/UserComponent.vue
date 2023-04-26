<template>
  <v-card variant="outlined" class="user-card" @click="chooseUser">
    <v-card-title v-if="!edit">{{ name }} </v-card-title>
    <v-card-subtitle v-if="!edit">{{ type }}</v-card-subtitle>
    <input v-if="edit" id="edit-name-input" placeholder="Your username">
    <select :type="type" v-if="edit" id="edit-userlevel-input">
      <option v-for="type in types">{{type.name}}</option>
    </select>
    <div><img src="../assets/logo.png" id="user-image"></div>
    <v-card-actions>
      <!--LEGGE TIL AT ENDRE KNAPPEN FORVINNER PÅ STARTSIDEN-->
      <v-btn v-if="!edit && $route.name !== 'chooseUser'" @click="editInfo">Change info</v-btn>
      <div v-if="edit"><v-btn @click="editInfo">Save info</v-btn></div><v-btn v-if="edit && !betaUser" @click="deleteSubuser">Delete</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import settingsService from "@/services/settingsService";
import router from "@/router"
export default {
  name: "user-component",
  props: {
    name: String,
    type: Boolean
  },
  data() {
    return {
      edit: false,
      betaUser: false,
      types: [{name: "true"}, {name: "false"}]
    }
  },
  methods:{
    async deleteSubuser(){
      const subuser = {
        "name": this.name,
        "accessLevel": this.type,
        "masterUser": localStorage.getItem("email")
      }
      console.log(subuser)
      await settingsService.deleteSubuser(subuser)
    },
    async setUserLevel(){
      if (localStorage.getItem("userType") === "false"){
        this.betaUser = true;
      } else {
        this.betaUser = false;
      }
    },
    editInfo(){
      this.edit = !this.edit
    },
    chooseUser(){
      if (this.$route.name === "chooseUser"){
        localStorage.setItem("username", this.name)
        localStorage.setItem("userType", this.type)
        router.push("/fridge")
      }
    }
  },
  created(){
    this.setUserLevel()
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
  border: 1px solid #39495c;
}
#edit-userlevel-input {
  border: 1px solid #39495c;
  width: 85%;
}
</style>
