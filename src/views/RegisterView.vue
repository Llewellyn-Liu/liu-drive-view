<script>
import {defineComponent} from 'vue'
import LoginCard from "@/components/LoginCard.vue";
import RegisterCard from "@/components/RegisterCard.vue";

export default defineComponent({
  name: "RegisterView",
  components: {RegisterCard, LoginCard}
})
</script>

<template>
  <div class="card-display">
    <register-card :userId="$route.query.userId" :username="$route.query.username"/>
  </div>
</template>

<style scoped>
.card-display {
  margin: 0 10px;

  background: rgb(189, 171, 130);
  height: 100vh;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
}


</style>