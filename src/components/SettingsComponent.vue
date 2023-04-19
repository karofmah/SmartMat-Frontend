<template>
  <div id="user-information">
    <div id="information">
      <h1>Your information:</h1>
      <h4>Email: {{ email }}</h4>
      <h4 v-if="!change">First name: {{ firstname }}</h4>
      <div><input v-if="change" placeholder="First name" v-model="firstname"></div>
      <h4 v-if="!change">Last name: {{ lastname }}</h4>
      <div><input v-if="change" placeholder="Last name" v-model="lastname"></div>
      <h4 v-if="!change">Phone number: {{ phone }}</h4>
      <div><input v-if="change" placeholder="Phone number" v-model="phone"></div>
      <h4 v-if="!change">Household: {{ household }}</h4>
      <div><input v-if="change" placeholder="Household" v-model="household"></div>
    </div>
    <div><button id="info-button" @click="changeInfo">{{ picked }}</button></div>
    <div><button id="add-new-user" @click="addNewUser">Add new user</button></div>
  </div>
  <div id="users">
    <div><UserComponent v-for="user in users" :key="user.id" :user="user"/></div>
    <!--<UserComponent/><UserComponent/><UserComponent/><UserComponent/>-->
  </div>
</template>

<script>
import UserComponent from "@/components/UserComponent.vue";
export default {
  components: {UserComponent},
  data(){
    return {
      picked: "Change your information",
      change: false,
      edit: false,
      email: "ola_normann@mail.com",
      firstname: "Ola",
      lastname: "Normann",
      phone: "12345678",
      household: 5,
      users: [{name: '1'},{name: '2'},{name: '3'},{name: '4'}]
    };
  },
  methods: {
    changeInfo(){
      this.change = !this.change
      if (this.change){this.picked = "Save your new information"}
      else {this.picked = "Change your information"}
    },
    addNewUser(){
      this.users.push(this.users.length + 1)
    },
    editUsers(){
      this.edit = !this.edit
    }
  }
}
</script>

<style>
#users{
  text-align: center;
}
</style>
