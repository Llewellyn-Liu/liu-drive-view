<script>
import {defineComponent} from 'vue'
import IconWithAlert from "@/components/iconComponent/IconWithAlert.vue";
import {sendRegisterRequest} from "@/utils/methods";


export default defineComponent({
  name: "RegisterCard",
  components: {IconWithAlert},

  props: ['userId', 'username'],

  data() {
    return {
      user: {
        username: "",
        userId: "",
        password: "",
      },
    }
  },

  methods: {
    async register() {

      if (this.user.username === "") return;

      const response = await sendRegisterRequest(this.user.username, this.user.userId, this.user.password);

      console.log("debug: ", "status", response, response.status, response.status === 200)
      if (response.status === 200) {
        //Segue to login mode
        this.sc_registerMode = false;
        this.user.password = "";

        this.showAlert("Register Success", "200");
      } else {
        this.$router.push({path: "/app/" + this.user.userId});
      }
    }
    ,
  }
})
</script>

<template>
  <v-card class="rounded-xl elevation-10 register-card">
    <div class="before-login">
      <icon-with-alert v-bind="alert"/>
      <div class="login-form-input">
        <v-card-item style="width: 100%">
          Username
          <v-text-field v-model="user.username" :model-value="username"></v-text-field>
        </v-card-item>
        <v-card-item style="width: 100%">
          UserId
          <v-text-field v-model="user.userId" :model-value="userId" disabled></v-text-field>
        </v-card-item>
        <v-card-item style="width: 100%">
          Password
          <v-text-field type="password" v-model="user.password"></v-text-field>
        </v-card-item>
      </div>

      <div class="login-form-control">
        <v-card-actions class="d-flex justify-center">
          <v-btn class="elevation-10 ma-0 w-75" @click="register">Register</v-btn>
        </v-card-actions>

      </div>


    </div>


  </v-card>
</template>

<style scoped>
.register-card {
  padding: 20px 10px 20px 10px;
  width: 20vw;
  min-width: 300px;
  max-width: 400px;
}
</style>