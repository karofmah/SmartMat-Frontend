<template>
  <div id="choose-users">
    <UserComponent class="choose-card" v-for="user in users" :key="user.id" :user="user" :name="user.name" :type="user.type"/>
  </div>
</template>

<script>
import UserComponent from "@/components/UserComponent.vue";
export default {
  components: {UserComponent},
  data() {
    return {
      picked: "Change your information",
      change: false,
      edit: false,
      email: "ola_normann@mail.com",
      firstname: "Ola",
      lastname: "Normann",
      phone: "12345678",
      household: 5,
      users: [
          {name: 'Brukernavn1', type: 'superbruker'},
          {name: 'Brukernavn2', type: 'superbruker'},
          {name: 'Brukernavn3', type: 'barn'},
          {name: 'Brukernavn4', type: 'vanlig bruker'}]
    };
  }
}
</script>

<style>
#choose-users{
  margin-top: 150px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  text-align: center;
}

.choose-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
}
</style>
