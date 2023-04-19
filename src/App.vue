<script>
import ToolbarComponent from "@/components/ToolbarComponent.vue"
export default {
  components: {ToolbarComponent}
}
</script>

<template>
  <div>
    <ToolbarComponent/>
  </div>
  <div>
    <RouterView />
  </div>
</template>

<style>
.error-message{
  color: red;
}
</style>
