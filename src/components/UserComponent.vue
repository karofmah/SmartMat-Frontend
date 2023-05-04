<template>
  <v-card class="user-card" @click="chooseUser">
    <v-card-title id="name">{{ name }} </v-card-title>
    <v-card-subtitle id="type">{{ type }}</v-card-subtitle>
    <div><img src="../assets/logo.png" id="user-image"></div>

    <v-row id="change-info-button">
      <v-dialog
          v-model="edit"
          persistent
          width="400"
      >
        <template v-slot:activator="{ props }">
          <v-btn
              id="changeSubuserInfo"
              color="teal"
              v-if="$route.name !== 'chooseUser' && !betaUser"
              v-bind="props"
              :disabled="betaUser"
              @click="edit = true"
          >
            Change info
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="text-h5">Change user info</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col
                    cols="12"
                >
                  <v-text-field
                      v-model="newName"
                      label="Username*"
                      required
                  ></v-text-field>
                </v-col>
                <v-col
                    cols="12"
                >
                  <v-select
                      :disabled="masterUser"
                      v-model="newType"
                      :items="types"
                      label="User level*"
                      required
                  ></v-select>
                </v-col>
                <v-col
                    cols="12"
                >
                  <v-text-field
                      v-if="newType==='true' || newType===true"
                      v-model="pinCode"
                      label="Pin-Code*"
                      required
                      :rules="[ checkPin ]"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <small>*indicates required field</small>
            <div><small v-if="error" class="error-message">*all required fields are not filled</small></div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="blue-darken-1"
                variant="text"
                @click="edit = false"
            >
              Close
            </v-btn>
            <v-btn
                color="blue-darken-1"
                variant="text"
                @click="updateUser"
            >
              Save info
            </v-btn>
            <v-btn
                v-if="!masterUser"
                color="blue-darken-1"
                variant="text"
                @click="deleteSubuser"
            >
              Delete user
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>


    <v-row justify="center">
      <v-dialog
          v-model="dialog"
          persistent
          width="400"
      >
        <template v-slot:activator="{ props }"></template>
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
      currentUser: false,
      masterUser: false,
      dialog: false,
      pinCheck: false,
      error: false,
      pinCode: '',
      newName: this.name,
      newType: this.type,
      types: ["true", "false"]
    }
  },
  methods:{
    async deleteSubuser(){
      console.log(this.id)
      await settingsService.deleteSubuser(this.id)
      this.$emit('update-users')
    },
    async updateUser(){
      const name = this.newName
      const type = this.newType
      const pinCode = this.pinCode

      const update = {
        "name": name,
        "accessLevel": type,
        "subUserId": this.id,
        "pinCode": pinCode
      }
      if ((type === true && !this.pinCheck) || this.newName === ''){
        this.error = true
      } else {
        await settingsService.updateSubuser(update)
        this.$emit('update-users')
        this.edit = !this.edit
        this.error = false
      }
    },
    async setUserLevel(){
      if (localStorage.getItem("userType") === "false"){
        this.betaUser = true;
      } else {
        this.betaUser = false;
      }
      if (parseInt(localStorage.getItem("subUserId")) === this.id) {
        this.currentUser = true
      } else {
        this.currentUser = false
      }
      if (parseInt(localStorage.getItem("masterUserId")) === this.id){
        this.masterUser = true
      } else {
        this.masterUser = false
      }
    },
    editInfo(){
      this.edit = true
    },
    checkPin(value) {
      if (/^\d{4}$/.test(value)) {
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
        localStorage.setItem("subUserId", this.id)
        router.push("/fridge")
      } else if(this.$route.name === "chooseUser" && this.type === true){
        this.dialog = true
      }
    },
    async chooseSuperUser() {
      const name = this.name
      const type = this.type
      const pinCheck = this.pinCheck
      const check = {
        "subUserId": this.id,
        "pinCode": this.pinCode
      }
      await loginService.checkPinCode(check).then(function (response) {
        //TODO: fikse når feil pin-kode
        console.log(response)
        if (response.status === 200 && pinCheck) {
          localStorage.setItem("username", name)
          localStorage.setItem("userType", type)
          localStorage.setItem("subUserId", check.subUserId)
          router.push("/fridge")
        } else {
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
#change-info-button {
  display:flex;
  align-content:center;
  flex-direction: column;
  padding-bottom: 10px;
}
</style>
