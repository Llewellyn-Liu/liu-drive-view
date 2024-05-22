<script>
import {defineComponent} from 'vue'
import {lg_sendLoginRequest, sendRegisterRequest} from "@/utils/methods";
import {useUserStore} from "@/stores/user";
import IconWithAlert from "@/components/iconComponent/IconWithAlert.vue";

export default defineComponent({
  name: "LoginCard",
  components: {IconWithAlert},

  props: ['request', "code"],

  setup() {
    const userStore = useUserStore();

    return {userStore}
  },
  data() {
    return {
      user: {
        username: "",
        password: "",
      },

      sc_registerMode: false,

      alert: {
        content: "",
        code: "",
      }
    }
  },
  mounted() {
    if (this.request != null && this.code != null) {
      this.alert = {
        content: this.request,
        code: this.code
      }
    }
  },
  methods: {

    // 注意异步方法的执行顺序
    async login() {
      const response = lg_sendLoginRequest(this.user.username, this.user.password);
      if (response.status === 200) {
        console.log(JSON.stringify(response.data));
        this.userStore.setUser(response.data.userId, response.data.username, response.data.token, true);
        this.$router.push("/" + "app" + "/" + response.data.userId);
      } else {
        this.$router.push({path: "/page", query: {request: "login", code: response.status}});
      }
    },

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
        this.$router.push({path: "/page", query: {request: "register", code: response.status}});
      }
    },

    showAlert(content, code) {
      this.alert = {"content": content, "code": code};
      console.log("showAlert")
    },

    async lg_oauthGithub() {
      const res = await fetch("/oauth2/github", {method: "GET", redirect:"manual"});
      if(res.status === 200){
        const json = await res.json();
        console.log("a",json);
        this.$router.push({path: "/app/"+ json.userId});
      }else if(res.status === 401){
        const json = await res.json();
        console.log("b",json);
        this.$router.push({path: "/register", query: json});
      }

    }
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
          <v-text-field v-model="user.username"></v-text-field>
        </v-card-item>
        <v-card-item style="width: 100%" v-show="sc_registerMode">
          UserId
          <v-text-field v-model="user.userId"></v-text-field>
        </v-card-item>
        <v-card-item style="width: 100%">
          Password
          <v-text-field type="password" v-model="user.password"></v-text-field>
        </v-card-item>
      </div>

      <div class="login-form-control">
        <v-card-actions class="d-flex justify-center">
          <v-btn variant="plain" rounded :disabled="sc_registerMode"
                 @click="this.sc_registerMode = !this.sc_registerMode">
            <u style="font-size: 12px">New User?</u>
          </v-btn>
        </v-card-actions>

        <v-card-actions class="d-flex justify-center">
          <v-btn color="blue" class="elevation-10 ma-0 w-75" @click="login">Login</v-btn>
        </v-card-actions>
        <v-card-actions class="d-flex justify-center">
          <v-btn class="elevation-10 ma-0 w-75" @click="register" :disabled="!sc_registerMode">Register</v-btn>
        </v-card-actions>
        <!--        <div style="height: 20px; font-size: 10px">-->
        <!--          <v-alert v-show="!!alert" :title="'Code: '+ alert.code" :text="alert.content"-->
        <!--                   :type="code<300?'success':'warning'"></v-alert>-->
        <!--        </div>-->

        <v-card-actions class="d-flex justify-center">
          <v-btn prepend-icon="mdi-github" class="elevation-10 ma-5" @click="lg_oauthGithub">Github
          </v-btn>
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