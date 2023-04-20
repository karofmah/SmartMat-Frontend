<template>
  <div id="user-information">
    <div id="information">
      <h1>Your information:</h1>
      <h4>Email: {{ email }}</h4>
      <div v-if="!change">
        <h4>First name: {{ firstname }}</h4>
        <h4>Last name: {{ lastname }}</h4>
        <h4>Phone number: {{ phone }}</h4>
        <h4>Household: {{ household }}</h4>
      </div>
      <div v-if="change">
        <div><v-text-field label="First name" v-model="firstname"></v-text-field></div>
        <div><v-text-field label="Last name" v-model="lastname"></v-text-field></div>
        <div><v-text-field label="Phone number" v-model="phone"></v-text-field></div>
        <div><v-text-field label="Household number" v-model="household"></v-text-field></div>
      </div>
    </div>
    <div><v-btn id="info-button" @click="changeInfo">{{ picked }}</v-btn></div>
    <div><v-btn id="add-new-user" @click="addNewUser">Add new user</v-btn></div>
  </div>
  <div id="users">
    <div><UserComponent v-for="user in users" :key="user.id" :user="user" :name="user.name" :type="user.type"/></div>
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
      users: [{name: '1', type:'superbruker'},{name: '2', type:'superbruker'},{name: '3', type:'barn'},{name: '4', type:'vanlig bruker'}]
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
