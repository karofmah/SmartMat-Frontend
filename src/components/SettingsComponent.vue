<template>
  <div id="settings-container">
  <div id="user-information">
    <div id="information">
      <h1 id="title-settings">Your information:</h1>
      <p class="settings-text"><span class="font-weight-bold">Email: </span><span>{{ email }}</span></p>
      <div v-if="!change">
        <p class="settings-text"><span class="font-weight-bold">First name: </span><span>{{ firstname }}</span></p>
        <p class="settings-text"><span class="font-weight-bold">Last name: </span><span>{{ lastname }}</span></p>
        <p class="settings-text"><span class="font-weight-bold">Phone number: </span><span>{{ phone }}</span></p>
        <p class="settings-text"><span class="font-weight-bold">Household: </span><span>{{ household }}</span></p>
      </div>
      <div v-if="change">
        <v-sheet width="300">
        <div><v-text-field label="First name" v-model="firstname"></v-text-field></div>
        <div><v-text-field label="Last name" v-model="lastname"></v-text-field></div>
        <div><v-text-field label="Phone number" v-model="phone"></v-text-field></div>
        <div><v-text-field label="Household number" v-model="household"></v-text-field></div>
        </v-sheet>
      </div>
    </div>
    <div>
    <div class="settings-buttons"><v-btn id="info-button" @click="changeInfo">{{ picked }}</v-btn></div>
    <div class="settings-buttons"><v-btn id="add-new-user" @click="addNewUser">Add new user</v-btn></div>
    </div>
  </div>
  <div id="users">
    <UserComponent v-for="user in users" :key="user.id" :user="user" :name="user.name" :type="user.type"/>
  </div>
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
      users: [{name: 'Brukernavn1', type:'superbruker'},{name: 'Brukernavn1', type:'superbruker'},{name: 'Brukernavn1', type:'barn'},{name: 'Brukernavn1', type:'vanlig bruker'}]
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
#settings-container {
  display: flex;
  flex-wrap: wrap;
}
#user-information{
  width: 500px;
}
#users{
  width: 750px;
  height: 580px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  text-align: center;
}
#user-information{
  margin: 40px;
}
#title-settings{
  margin-bottom: 10px;
}

.settings-text {
  margin-bottom: 30px;
  font-size: 25px;
}

.settings-buttons {
  margin-top: 20px;
}
</style>
