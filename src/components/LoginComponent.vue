<template>
  <v-sheet width="300" class="mx-auto">
    <v-form fast-fail @submit.prevent>
      <v-text-field
          v-model="email"
          label="Email"
          :rules="emailRules"
      ></v-text-field>

      <v-text-field
          v-model="password"
          label="Password"
          :rules="passwordRules"
      ></v-text-field>

      <v-btn type="submit" block class="mt-2">Submit</v-btn>
    </v-form>
  </v-sheet>

  <!--<div id="container">
    <div id="inputFields">
      <div id="loginFields" v-if="show">
        <div><input id="login-email" placeholder="Email" v-model="email"></div>
        <div><input id="login-password" type="password" placeholder="Password" v-model="password"></div>
      </div>
      <div id="registerFields" v-else>
        <div><input id="email" placeholder="Email" v-model="email"></div>
        <div><input id="password"  type="password" placeholder="Password" v-model="password"></div>
        <div><input id="firstName" placeholder="First name" v-model="firstname"></div>
        <div><input id="lastName" placeholder="Last name" v-model="lastname"></div>
        <div><input id="phone" placeholder="Phone number" v-model="phone"></div>
        <div><input id="household" placeholder="Household" v-model="household"></div>
        <div><input id="age" placeholder="Age" v-model="age"></div>
      </div>
    </div>
    <div id="buttons">
      <div>
        <input type="radio" id="login" value="Login" v-model="picked" @click="show = !show"><label for="login">Login</label>
        <input type="radio" id="register" value="Register new user" v-model="picked" @click="show = !show"><label for="register">Register new user</label></div>
      <div><button id="submitButton" @click="submit()">{{ picked }}</button></div>
      <div><label class="error-message" id="error-message"></label></div>
    </div>
  </div>-->
</template>

<script>
/*export default {
  data() {
    return {
      picked: "Login",
      show: true,
      email: null,
      password: null,
      firstname: null,
      lastname: null,
      phone: null,
      household: null,
      age: null
    }
  },
  methods: {
    login() {
      if (this.email === null || this.password === null) {
        document.getElementById("error-message").innerHTML = "Email and password cannot be empty! >:O";
      } else if (!this.validateEmail(this.email)) {
        document.getElementById("error-message").innerHTML = "You have to enter a valid email address";
      } else {
        document.getElementById("error-message").innerHTML = "Sick! >:D";
      }
    },
    register() {
      if (this.email === null || this.password === null || this.firstname === null || this.lastname === null || this.phone === null || this.household === null || this.age === null) {
        document.getElementById("error-message").innerHTML = "None of the fields can be empty <br> when trying to create a new user! >:O";
      } else if (!this.validateEmail(this.email)) {
        document.getElementById("error-message").innerHTML = "You have to enter a valid email address";
      } else if (this.password.length < 8) {
        document.getElementById("error-message").innerHTML = "Your password have to be over 8 characters";
      } else {
        document.getElementById("error-message").innerHTML = "Sickoo! >:D";
      }
    },
    submit() {
      if (this.show) {
        this.login()
      } else {
        this.register()
      }
    },
    validateEmail(email) {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return true;
      } else {
        return false;
      }
    }
  }
}*/
export default {
  data: () => ({
    email: '',
    emailRules: [
      value => {
        if (value?.length > 3) return true

        return 'Email must be at least 3 characters.'
      },
    ],
    password: '',
    passwordRules: [
      value => {
        if (value?.length > 8) return true

        return 'Password must be at least 8 characters.'
      },
    ],
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
#inputFields{
  height: 250px;
}
#loginFields{
  margin-top: 70%;
}
#registerFields{
  margin-top: 10%;
}
#buttons{
  text-align: center;
}
input{
  margin-bottom: 10px;
}

</style>
