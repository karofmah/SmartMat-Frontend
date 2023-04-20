<template>
  <v-sheet width="300" class="mx-auto" >
    <v-form fast-fail @submit.prevent>
      <div id="input-form">
  <div id="login-form">
      <v-text-field
          v-model="email"
          label="Email"
          :rules="emailRules"
      ></v-text-field>

      <v-text-field
          type="password"
          v-model="password"
          label="Password"
          :rules="passwordRules"
      ></v-text-field>
  </div><div id="register-form" v-if="!show">
          <v-text-field
              label="First name"
              v-model="firstname"
              :rules="firstNameRules"
          >
          </v-text-field>
          <v-text-field
              label="Last name"
              v-model="lastname"
              :rules="lastnameRules"
          >
          </v-text-field>
          <v-text-field
              label="Phone number"
              v-model="phoneNumber"
              :rules="phoneNumberRules"
          >
          </v-text-field>
          <v-text-field
              label="Household amount"
              v-model="household"
              :rules="householdRules"
          >
          </v-text-field>
          <v-text-field
              label="Age"
              v-model="age"
              :rules="ageRules"
          >
          </v-text-field>
        </div>
    </div>
    <div id="buttons">
      <div ><v-radio-group inline v-model="value">
        <v-radio
            label="Login"
            value="Login"
            @click="show=true"
        >
        </v-radio>
        <v-radio
            label="Register"
            value="Register"
            @click="show=false"
        >
        </v-radio>
      </v-radio-group></div>
      <v-btn type="submit" block class="mt-2">{{ value }}</v-btn>
    </div>
    </v-form>
  </v-sheet>
</template>

<script>
export default {
  data: () => ({
    show: true,
    value: "Login",
    email: '',
    emailRules: [
      value => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value) ) return true

        return 'You must enter a valid email.'
      },
    ],
    password: '',
    passwordRules: [
      value => {
        if (value?.length > 7) return true

        return 'Password must be at least 8 characters.'
      },
    ],
    firstname:'',
    firstNameRules: [value => {
      if (value?.length > 0) return true

      return 'First name cannot be empty.'
    },
    ],
    lastname:'',
    lastnameRules:[value => {
      if (value?.length > 0) return true

      return 'Last name cannot be empty.'
    },
    ],
    phoneNumber:'',
    phoneNumberRules:[
      value => {
        if (value?.length === 8) return true

        return 'Number must be 8 digits.'
      },
    ],
    household:'',
    householdRules:[value => {
      if (value > 0) return true

      return 'There must be at least 1 household member.'
    },
    ],
    age:'',
    ageRules:[value => {
      if (value >= 16 && value < 123) return true

      return 'You must be between 16-123 years old to use SmartMat.'
    },]

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
  height: 600px;
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
  margin-bottom: 10px;
}

</style>
