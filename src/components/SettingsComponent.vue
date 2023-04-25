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
    <div class="settings-buttons"><v-btn id="info-button" @click="changeInfo" :disabled="betaUser">{{ picked }}</v-btn></div>
    <div id="newSubUser" class="settings-buttons"> <v-row>
      <v-dialog
          v-model="dialog"
          persistent
          width="400"
      >
        <template v-slot:activator="{ props }">
          <v-btn
              id="addNewSubuserButton"
              color="green"
              v-bind="props"
              :disabled="betaUser"
          >
            Add new user
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="text-h5">New user</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col
                    cols="12"
                >
                  <v-text-field
                      v-model="username"
                      label="Username*"
                      required
                  ></v-text-field>
                </v-col>
                <v-col
                    cols="12"
                >
                  <v-select
                      v-model="userType"
                      :items="types"
                      label="User level*"
                      required
                  ></v-select>
                </v-col>
              </v-row>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="blue-darken-1"
                variant="text"
                @click="dialog = false"
            >
              Close
            </v-btn>
            <v-btn
                color="blue-darken-1"
                variant="text"
                @click="addSubuser"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    </div>
    </div>
    <div><p v-if="betaUser">You are not authorized to make changes</p></div>
  </div>
  <div id="users">
    <UserComponent v-for="user in users" :key="user.id" :user="user" :name="user.name" :type="user.accessLevel"/>
  </div>
  </div>
</template>

<script>
import UserComponent from "@/components/UserComponent.vue";
import settingsService from "@/services/settingsService.js";
export default {
  components: {UserComponent},
  data(){
    return {
      betaUser: true,
      username: null,
      userType: null,
      types: ["true", "false"],
      dialog: false,
      picked: "Change your information",
      change: false,
      editing: false,
      email: localStorage.getItem("email"),
      firstname: localStorage.getItem("firstname"),
      lastname: localStorage.getItem("lastname"),
      phone: localStorage.getItem("phone"),
      household: localStorage.getItem("household"),
      users: null,
      nameValid: false,
      lastNameValid: false,
      phoneValid: false,
      householdValid: false,
    };
  },
  methods: {
    async setUserLevel(){
      if (localStorage.getItem("userType") === "false"){
        this.betaUser = true;
      } else {
        this.betaUser = false;
      }
    },
    async getInformation(){
      const information = await settingsService.getUserInfo(localStorage.getItem("email"))
      localStorage.setItem("firstname", information.firstName)
      localStorage.setItem("lastname", information.lastName)
      localStorage.setItem("phone", information.phoneNumber)
      localStorage.setItem("household", information.household)
    },
    async getSubusers(){
      this.users = await settingsService.getAllSubusers(localStorage.getItem("email"))
    },
    async addSubuser(){
      const subuser = {
        "name": this.username,
        "accessLevel": this.userType,
        "masterUser": localStorage.getItem("email")
      }
      await settingsService.addNewSubuser(subuser)
      await this.getSubusers()
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
  },
  beforeMount(){
    this.getInformation()
    this.getSubusers()
    this.setUserLevel()
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

#newSubUser {
  margin-left: 10px;
  margin-bottom: 12px;
}
</style>
