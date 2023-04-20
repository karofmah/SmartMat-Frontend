<template>
  <div class="user">
    <div><img src="../assets/logo.png" id="user-image"></div>
    <div id="felt">
      <div v-if="!edit">
        <p>{{ name }}</p>
        <p>user level: {{ type }}</p>
      </div>
      <div v-if="edit">
         <input :name="name" >
         <select :type="type" >
           <option v-for="type in types">{{type.name}}</option>
         </select>
      </div>
    </div>
    <div v-if="!edit"><v-btn @click="editInfo">Edit user</v-btn></div>
    <div v-if="edit"><v-btn @click="editInfo">Save changes</v-btn></div>
  </div>
</template>

<script>
export default {
  name: "user-component",
  props: {
    name: String,
    type: String,
  },
  data() {
    return {
      edit: false,
      types: [{name: "superbruker"}, {name: "vanlig bruker"}]
    }
  },
  methods:{
    editInfo(){
      this.edit = !this.edit
    }
  }
}
</script>

<style>
.user {
  display: inline-block;
  margin: 20px;
  width: 200px;
  height: 200px;
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
#felt {
  height: 100px;
  border: 1px solid white;
}
</style>
