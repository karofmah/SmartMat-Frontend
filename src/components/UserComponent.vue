<template>
  <v-card variant="outlined" class="user-card" @click="chooseUser">
    <v-card-title v-if="!edit" id="name">{{ name }} </v-card-title>
    <v-card-subtitle v-if="!edit" id="type">{{ type }}</v-card-subtitle>
    <input v-if="edit" id="edit-name-input" v-model="newName" placeholder="Your username">
    <select :type="type" v-if="edit" v-model="newType" id="edit-userlevel-input">
      <option v-for="type in types">{{type.name}}</option>
    </select>
    <input v-if="edit && (newType === 'true' || type === true)" id="edit-pincode-input" v-model="pinCode" placeholder="New pin">
    <div><img src="../assets/logo.png" id="user-image"></div>
    <v-row justify="center">
      <v-dialog
          v-model="dialog"
          persistent
          width="400"
      >
        <template v-slot:activator="{ props }">
        </template>
        <v-card>
          <v-card-title>
            <span class="text-h5">Enter PIN code</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col
                    cols="12"
                >
                  <v-text-field
                      label="Pin*"
                      v-model="pinCode"
                      type="password"
                      :rules="[ checkPin ]"
                  ></v-text-field>
                </v-col>
                <v-col
                    cols="12"
                >
                </v-col>
              </v-row>
            </v-container>
            <small>*indicates required field</small>
            <div><small v-if="error" class="error-message">*all required fields are not filled</small></div>
            <div><small class="error-message" id="error-pinCode"></small></div>
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
                @click="chooseSuperUser"
            >
              Login
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <v-card-actions>
      <v-btn v-if="!edit && $route.name !== 'chooseUser'" @click="editInfo">Change info</v-btn>
      <div v-if="edit"><v-btn @click="updateUser">Save info</v-btn></div><v-btn v-if="edit && !betaUser" @click="deleteSubuser">Delete</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import settingsService from "@/services/settingsService";
import router from "@/router"
import loginService from "@/services/loginService";
export default {
  name: "user-component",
  props: {
    name: String,
    type: Boolean,
    pin: Number,
    id: Number
  },
  data() {
    return {
      edit: false,
      betaUser: false,
      dialog: false,
      pinCheck: false,
      error: false,
      pinCode: "",
      newName: "",
      newType: "",
      types: [{name: "true"}, {name: "false"}]
    }
  },
  methods:{
    async deleteSubuser(){
      console.log(this.id)
      await settingsService.deleteSubuser(16)
      this.$emit('update-users')
    },
    async updateUser(){
      const name = this.newName
      const type = this.newType
      const pinCode = this.pinCode
      // TODO: legge til at man kan endre pinkode

      const update = {
        "name": name,
        "accessLevel": type,
        "subUserId": this.id
      }

      await settingsService.updateSubuser(update)
      this.$emit('update-users')
      this.edit = !this.edit
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
    checkPin(value) {
      if (value?.length === 4) {
        this.pinCheck = true;
        this.error = false
        return true
      } else {
        this.error = true
        this.pinCheck = false;
        return 'PIN must be 4 digits.'
      }
    },
    chooseUser(){
      if (this.$route.name === "chooseUser" && this.type === false){
        localStorage.setItem("username", this.name)
        localStorage.setItem("userType", this.type)
        router.push("/fridge")
      } else if(this.$route.name === "chooseUser" && this.type === true){
        this.dialog = true
      }
    },
    async chooseSuperUser() {
      const name = this.name
      const type = this.type
      const check = {
        "subUserId": this.id,
        "pinCode": this.pinCode
      }
      await loginService.checkPinCode(check).then(function (response) {
        //TODO: fikse når feil pin-kode
        console.log(response)
        if (response.status === 200) {
          localStorage.setItem("username", name)
          localStorage.setItem("userType", type)
          router.push("/fridge")
        } else if (response.status === 404){
          document.getElementById("error-pinCode").innerHTML = response.data
        }
      }).catch(function (error) {
        console.log(error)
      })
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
#edit-pincode-input {
  margin-top: 10px;
  border: 1px solid #39495c;
}
</style>
