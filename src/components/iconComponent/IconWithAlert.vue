<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "IconWithAlert",
  props: ["content", "code"],
  data() {
    return {
      status: "default",
      alert: "",
    }
  },

  mounted() {
    console.log("Inside", this.content)
    console.log("Inside", this.code)
  }
})
</script>

<template>
  <div class="login-card-logo d-flex justify-end">
    <v-alert v-show="!!alert || !!content" :text="content" :type="code < 300 ? 'success' : 'warning'"
             class="icon-alert"></v-alert>
    <div class="login-card-logo-holder" style="width: 64px; height: 64px; margin: 0 10px">
      <img src="/liu-station.svg" alt="icon" class="login-card-icon"/>
    </div>
  </div>
</template>

<style scoped>

.icon-with-alert {
  display: flex;
  justify-content: center;
}

.icon-alert {
  margin-left: 5%;
}

.login-card-icon{
  width: 64px;
  filter: drop-shadow(3px 5px 10px #bdab82);
}

.login-card-icon:hover{
  width: 64px;
  filter: drop-shadow(5px 7px 10px #bdab82);
}


</style>