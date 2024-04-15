<script>
import {defineComponent} from 'vue'
import {lg_sendLoginRequest, sendRegisterRequest} from "@/utils/methods";
import {useUserStore} from "@/stores/user";

export default defineComponent({
  name: "WelcomeView",

  setup(){
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
    }
  },
  methods:{

    // 注意异步方法的执行顺序
    async login(){
      const response = await lg_sendLoginRequest(this.user.username, this.user.password);
      if(response.status === 200){
        console.log(JSON.stringify(response.data));
        this.userStore.setUser(response.data.userId, response.data.username, response.data.token, true);
        this.$router.push("/" + "app" + "/" + response.data.userId);
      }else {
        this.$router.push({path : "/page", query: {code: response.status}} );
      }
    },

    async register(){
      const response = sendRegisterRequest(this.user.username, this.user.userId, this.user.password);
      if(response.status === 200){
        this.sc_registerMode = false;

      }else {
        this.$router.push({path : "/page", query: {code: response.status}} );
      }
    },

  }
})
</script>

<template>

  <div class="right-display d-lg-none" style="width: 100%">
    <v-card class="rounded-xl elevation-10 login-card-fix-size">
      <div class="before-login" v-if="!this.$route.query.code&&!this.$route.query.error">
        <div class="login-card-logo d-flex justify-center">
          <div class="login-card-logo-holder" style="width: 64px; height: 64px">
            <v-img src="https://upload.wikimedia.org/wikipedia/commons/6/6f/Logo_of_Twitter.svg"></v-img>
          </div>

        </div>
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
            <v-btn color="blue" class="elevation-10 ma-0 w-75" @click="login">Login</v-btn>
          </v-card-actions>
          <v-card-actions class="d-flex justify-center">
            <v-btn color="blue" class="elevation-10 ma-0 w-75" @click="" :disabled="!sc_registerMode">Register</v-btn>
          </v-card-actions>
          <v-card-actions class="d-flex justify-center">
            <v-btn prepend-icon="mdi-github" class="elevation-10 ma-5">
              <a href="/oauth2/github">GitHub Login</a>
            </v-btn>
          </v-card-actions>
        </div>


      </div>


    </v-card>
  </div>


  <!--v-container contains default margin and paddings, as well as v-row-->
  <v-container class="d-none d-lg-block" style="width: 100vw; max-width: none; padding: 0">
    <v-row dense>

      <!--Left display panel-->
      <v-col cols="8" >
        <div class="left-display d-flex flex-wrap justify-center align-content-center">

          <v-btn @click="this.$router.push('/app/lrl')">Jump</v-btn>
        </div>
      </v-col>

      <!--Right display panel-->
      <v-col cols="4">
        <div class="right-display" style="width: 100%">
          <v-card class="rounded-xl elevation-10 login-card">
            <div class="before-login" v-if="!this.$route.query.code&&!this.$route.query.error">
              <div class="login-card-logo d-flex justify-center">
                <div class="login-card-logo-holder" style="width: 64px; height: 64px">
                  <v-img src="https://upload.wikimedia.org/wikipedia/commons/6/6f/Logo_of_Twitter.svg"></v-img>
                </div>

              </div>
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
                <v-card-actions class="d-flex justify-center">
                  <v-btn prepend-icon="mdi-github" class="elevation-10 ma-5">
                    <a href="/oauth2/github">GitHub Login</a>
                  </v-btn>
                </v-card-actions>
              </div>


            </div>


          </v-card>
        </div>

      </v-col>
    </v-row>

  </v-container>


</template>

<style scoped>

.left-display {
  background: #00acc1;
  height: 100vh;
}

.right-display {
  background: #00c853;
  height: 100vh;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
}

.login-card {
  padding: 20px 10px 20px 10px;
  width: 20vw;
}

.login-card-fix-size {
  padding: 20px 10px 20px 10px;
  width: 360px;
}

</style>