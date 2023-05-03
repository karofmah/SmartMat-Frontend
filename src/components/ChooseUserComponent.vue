<template>
  <div id="choose-users">
    <UserComponent class="choose-card" v-for="user in users" :key="user.id" :user="user" :name="user.name" :type="user.accessLevel" :id="user.subUserId" :pin="user.pinCode"/>
  </div>
</template>

<script>
import UserComponent from "@/components/UserComponent.vue";
import settingsService from "@/services/settingsService";
export default {
  components: {UserComponent},
  data() {
    return {
      users: null
    }
  },
  methods: {
    async getSubusers(){
      this.users = await settingsService.getAllSubusers(localStorage.getItem("email"))
    }
  },
  beforeMount(){
    this.getSubusers()
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
