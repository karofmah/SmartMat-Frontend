<template>
  <v-sheet width="300" class="mx-auto" >
    <v-form ref="form" fast-fail @submit.prevent>
      <div id="input-form">
  <div id="login-form">
      <v-text-field
          id="email-input"
          v-model="email"
          label="Email"
          :rules="[ checkEmail ]"
      ></v-text-field>

      <v-text-field
          id="password-input"
          type="password"
          v-model="password"
          label="Password"
          :rules="[ checkPassword ]"
      ></v-text-field>
  </div><div id="register-form" v-if="!show">
          <v-text-field
              id="firstname-input"
              label="First name"
              v-model="firstname"
              :rules="[ checkFirstName ]"
          >
          </v-text-field>
          <v-text-field
              id="lastname-input"
              label="Last name"
              v-model="lastname"
              :rules="[ checkLastName ]"
          >
          </v-text-field>
          <v-text-field
              id="phone-input"
              label="Phone number"
              v-model="phoneNumber"
              :rules="[ checkPhoneNumber ]"
          >
          </v-text-field>
          <v-text-field
              id="household-input"
              label="Household amount"
              v-model="household"
              :rules="[ checkHousehold ]"
          >
          </v-text-field>
          <v-text-field
              id="age-input"
              label="Age"
              v-model="age"
              :rules="[ checkAge ]"
          >
          </v-text-field>
        <v-text-field
            type="password"
            id="pin-code-input"
            label="PIN-CODE"
            v-model="pinCode"
            :rules="[ checkPin ]"
        >
        </v-text-field>
        </div>
    </div>
    <div id="buttons">
      <div ><v-radio-group inline v-model="value">
        <v-radio
            id="login-radiobutton"
            label="Login"
            value="Login"
            @click="show=true"
        >
        </v-radio>
        <v-radio
            id="register-radiobutton"
            label="Register"
            value="Register"
            @click="show=false"
        >
        </v-radio>
      </v-radio-group></div>
      <v-btn id="submit-button" type="submit" block class="mt-2" @click="submit">{{ value }}</v-btn>
      <p id="error-message-submit" class="error-message"></p>
    </div>
    </v-form>
  </v-sheet>
</template>

<script>
import router from "@/router";
import loginService from "@/services/loginService.js";
import settingsService from "@/services/settingsService";
export default {
  methods:{
    checkEmail(value){
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value) ) {
        this.emailCheck = true;
        return true;
      } else {
        this.emailCheck = false;
        return 'You must enter a valid email.'
      }
    },
    checkPassword(value){
      if (value?.length > 7) {
        this.passwordCheck = true;
        return true
      } else {
        this.passwordCheck = false;
        return 'Password must be at least 8 characters.'
      }
    },
    checkFirstName(value){
      if (value?.length > 0) {
        this.firstNameCheck = true;
        return true
      } else {
        this.firstNameCheck = false;
        return 'First name cannot be empty.'
      }
    },
    checkLastName(value){
      if (value?.length > 0) {
        this.lastNameCheck = true;
        return true
      } else {
        this.lastNameCheck = false;
        return 'Last name cannot be empty.'
      }
    },
    checkPhoneNumber(value){
      if (value?.length === 8) {
        this.phoneCheck = true;
        return true
      } else {
        this.phoneCheck = false;
        return 'Number must be 8 digits.'
      }
    },
    checkHousehold(value){
      if (value > 0) {
        this.householdCheck = true;
        return true
      } else {
        this.householdCheck = false;
        return 'There must be at least 1 household member.'
      }
    },
    checkAge(value){
      if (value >= 16 && value < 123) {
        this.ageCheck = true;
        return true
      } else {
        this.ageCheck = false;
        return 'You must be between 16-123 years old to use SmartMat.'
      }
    },
    checkPin(value) {
      if (/^((?!(0))\d{4})$/.test(value)) {
        this.pinCheck = true;
        return true
      } else {
        this.pinCheck = false;
        return 'PIN must be 4 digits and cannot start with 0.'
      }
    },
    async login(){
      const info = {
        "email": this.email,
        "password": this.password
      }
      await loginService.login(info).then(async function (response) {
        console.log(response)
        if (response.status === 200){
          localStorage.setItem("email", info.email)
          await loginService.getFridgeId(localStorage.getItem("email"))
          const information = await settingsService.getUserInfo(localStorage.getItem("email"))
          localStorage.setItem("firstname", information.firstName)
          localStorage.setItem("lastname", information.lastName)
          localStorage.setItem("phone", information.phoneNumber)
          localStorage.setItem("household", information.household)
          console.log(localStorage.getItem("fridgeId"))
          const masterUser = await settingsService.getAllSubusers(localStorage.getItem("email"))
          localStorage.setItem("masterUserId",masterUser[0].subUserId)
          router.push("/user")
        } else {
          document.getElementById("error-message-submit").innerHTML = response.data
        }
      }).catch(function (err) {
        console.log(err.response)
        console.log(err)
      })
    },
    async register(){
      const info = {
        "email": this.email,
        "password": this.password,
        "firstName": this.firstname,
        "lastName": this.lastname,
        "household": this.household,
        "age": this.age,
        "phoneNumber": this.phoneNumber
      }

      const firstname = this.firstname
      const pinCode = this.pinCode

      await loginService.registerUser(info).then(async function (response) {
        console.log(response.status)
        if (response.status === 201){
          localStorage.setItem("email", info.email)
          await loginService.getFridgeId(localStorage.getItem("email"))
          console.log(localStorage.getItem("fridgeId"))
          localStorage.setItem("pin-code", pinCode)
          const subuser = {
            "name": firstname,
            "accessLevel": true,
            "userEmail": localStorage.getItem("email"),
            "pinCode": pinCode
          }
          await settingsService.addNewSubuser(subuser)
          const information = await settingsService.getUserInfo(localStorage.getItem("email"))
          localStorage.setItem("firstname", information.firstName)
          localStorage.setItem("lastname", information.lastName)
          localStorage.setItem("phone", information.phoneNumber)
          localStorage.setItem("household", information.household)
          const masterUser = await settingsService.getAllSubusers(localStorage.getItem("email"))
          localStorage.setItem("masterUserId", masterUser[0].subUserId)
          router.push("/user")
        } else {
          document.getElementById("error-message-submit").innerHTML = response.data
        }
      }).catch(function (err) {
        console.log(err)
      })
    },
    async submit(){
      if (this.value === "Login" && this.emailCheck && this.passwordCheck) {
        await this.login()
      } else if (this.value === "Register" && this.emailCheck && this.passwordCheck && this.firstNameCheck && this.lastNameCheck && this.phoneCheck && this.householdCheck && this.ageCheck && this.pinCheck) {
        await this.register()
      }
    },
    async getInformation(){
      console.log(await settingsService.getUserInfo(localStorage.getItem("email")))
      const information = await settingsService.getUserInfo(localStorage.getItem("email"))
      localStorage.setItem("firstname", information.firstName)
      localStorage.setItem("lastname", information.lastName)
      localStorage.setItem("phone", information.phoneNumber)
      localStorage.setItem("household", information.household)
    },
  },
  data: () => ({
    emailCheck: false,
    passwordCheck: false,
    firstNameCheck: false,
    lastNameCheck: false,
    phoneCheck: false,
    householdCheck: false,
    ageCheck: false,
    pinCheck: false,
    show: true,
    value: "Login",
    email: null,
    password: null,
    firstname:'',
    lastname:'',
    phoneNumber:'',
    household:'',
    age:'',
    pinCode: ''
  }),
}
</script>

<style>
#container{
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 150px;
}
#input-form{
  display: grid;
  height: 700px;
  float: bottom;
  margin-top: 10%;
  align-content: center;
}
#login-form{
}
#buttons{
  display: flex;
  flex-direction: column;
  align-items: center;
}
input{
  margin-bottom: 5px;
}

</style>
