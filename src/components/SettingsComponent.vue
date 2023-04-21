

<template>
  <div id="settings-container">
  <div id="user-information">
    <div id="information">
      <h1 id="title-settings">Your information:</h1>
      <p class="settings-text"><span class="font-weight-bold">Email: </span><span>{{ email }}</span></p>
      <div v-if="!change">
        <p class="settings-text"><span class="font-weight-bold">First name: </span><span id="first-name-display">{{ firstname }}</span></p>
        <p class="settings-text"><span class="font-weight-bold">Last name: </span><span id="last-name-display">{{ lastname }}</span></p>
        <p class="settings-text"><span class="font-weight-bold">Phone number: </span><span id="phone-number-display">{{ phone }}</span></p>
        <p class="settings-text"><span class="font-weight-bold">Household: </span><span id="household-display">{{ household }}</span></p>
      </div>
      <div v-if="change">
        <v-sheet width="300">
        <div><v-text-field id="first-name-input" label="First name" v-model="firstname" :rules="[ checkName(firstname) ]"></v-text-field></div>
        <div><v-text-field id="last-name-input" label="Last name" v-model="lastname" :rules="[ checkLastName(lastname) ]"></v-text-field></div>
        <div><v-text-field id="phone-number-input" label="Phone number" v-model="phone" :rules="[ checkPhoneNumber(phone) ]"></v-text-field></div>
        <div><v-text-field id="household-input" label="Household number" v-model="household" :rules="[ checkHousehold(household) ]"></v-text-field></div>
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
import settingsService from "@/services/settingsService.js";
export default {
  components: {UserComponent},
  beforeMount(){
    this.getInformation()
  },
  data(){
    return {
      picked: "Change your information",
      change: false,
      edit: false,
      editing: false,
      email: localStorage.getItem("email"),
      firstname: localStorage.getItem("firstname"),
      lastname: localStorage.getItem("lastname"),
      phone: localStorage.getItem("phone"),
      household: localStorage.getItem("household"),
      users: [{name: 'Brukernavn1', type:'superbruker'},{name: 'Brukernavn1', type:'superbruker'},{name: 'Brukernavn1', type:'barn'},{name: 'Brukernavn1', type:'vanlig bruker'}],
      nameValid: false,
      lastNameValid: false,
      phoneValid: false,
      householdValid: false,
    };
  },
  methods: {
    async getInformation(){
      const information = await settingsService.getUserInfo(localStorage.getItem("email"))
      console.log(information)
      localStorage.setItem("firstname", information.firstName)
      localStorage.setItem("lastname", information.lastName)
      localStorage.setItem("phone", information.phoneNumber)
      localStorage.setItem("household", information.household)
    },
    changeInfo(){
      if(!this.editing){
        this.change = !this.change
        this.editing = !this.editing
        this.picked = "Save your new information"
        console.log(this.editing)
      } else {
        if(this.nameValid && this.lastNameValid && this.householdValid && this.phoneValid) {
          this.change = !this.change
          this.editing = !this.editing
          this.picked = "Change your information"
          console.log(this.editing)
        }
      }

    },
    addNewUser(){
      this.users.push(this.users.length + 1)
    },
    editUsers(){
      this.edit = !this.edit
    },
    checkName(value) {
      if (value?.length > 0) {
        this.nameValid = true
        return true
      } else {
        this.nameValid = false
        return 'First name cannot be empty.'
      }
    },
    checkLastName(value) {
      if (value?.length > 0) {
        this.lastNameValid = true
        return true
      } else {
        this.lastNameValid = false
        return 'Last name cannot be empty.'
      }
    },
    checkPhoneNumber(value) {
      if (value?.length === 8) {
        this.phoneValid = true
        return true
      } else {
        this.phoneValid = false
        return 'Number must be 8 digits.'
      }
    },
    checkHousehold(value) {
      if (value > 0) {
        this.householdValid = true
        return true
      } else {
        this.householdValid = false
        return 'There must be at least 1 household member.'
      }
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
