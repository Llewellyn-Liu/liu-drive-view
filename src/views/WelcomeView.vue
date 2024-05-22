<script>
import {defineComponent} from 'vue'
import {lg_sendLoginRequest, sendRegisterRequest} from "@/utils/methods";
import {useUserStore} from "@/stores/user";
import LoginCard from "@/components/LoginCard.vue";

export default defineComponent({
  name: "WelcomeView",
  components: {LoginCard},

  setup() {
    const userStore = useUserStore();

    return {userStore}
  },
  data() {
    return {
      loginStatus: {
        request: "",
        code: "",
      },
    }
  },
  methods: {},
  created() {

    // Attributes pass information of the result of requests
    this.loginStatus.process = this.$route.query.request;
    this.loginStatus.method = this.$route.query.method;
    this.loginStatus.code = this.$route.query.code;

    console.log(this.loginStatus.code)

    if(this.loginStatus.process === "login"){
      if(this.loginStatus.method === "github"){
        if(this.loginStatus.code === 401){
          this.loginStatus.userId = this.$route.query.userId;
          this.loginStatus.url = this.$route.query.url;
          this.$router.push({path: "/register", query:{"userId": this.loginStatus.userId, "url":this.loginStatus.url}});
        }
        if(this.loginStatus.code === 200){
          this.loginStatus.userId = this.$route.query.userId;
          this.$router.push({path: "/app/"+this.loginStatus.userId});
        }
      }
    }
  }
})
</script>

<template>

  <!--  <div class="right-display d-lg-none" style="width: 100%">-->
  <!--    <login-card :request="$route.query.request" :code="$route.query.code"/>-->
  <!--  </div>-->


  <!--  &lt;!&ndash;v-container contains default margin and paddings, as well as v-row&ndash;&gt;-->
  <!--  <v-container class="d-none d-lg-block" style="width: 100vw; max-width: none; padding: 0">-->
  <!--    <v-row dense>-->

  <!--      &lt;!&ndash;Left display panel&ndash;&gt;-->
  <!--      <v-col cols="8" >-->
  <!--        <div class="left-display d-flex flex-wrap justify-center align-content-center">-->

  <!--          <v-btn @click="this.$router.push('/app/lrl')">Jump</v-btn>-->
  <!--        </div>-->
  <!--      </v-col>-->

  <!--      &lt;!&ndash;Right display panel&ndash;&gt;-->
  <!--      <v-col cols="4">-->
  <!--        <div class="right-display" style="width: 100%">-->

  <!--          <LoginCard :request="$route.query.request" :code="$route.query.code"/>-->
  <!--        </div>-->

  <!--      </v-col>-->
  <!--    </v-row>-->

  <!--  </v-container>-->


  <div class="bg-layer">
    <div class="img-positioner">
      <img src="/sketch.png" style="position: fixed; height: 150vh; margin-left: 10vw;">

      <img src="/liu-station.svg" class="app-icon">
    </div>
    <div class="container">
      <div class="left-display"></div>
      <div class="right-display">
        <login-card :request="$route.query.request" :code="$route.query.code"/>
      </div>
    </div>
  </div>


</template>

<style scoped>
/*recommended approach via chatGPT in scaling layout*/
.container {
  display: flex;
}

.left-display {
  width: 70%;

  background: rgb(238, 231, 215);
  height: 100vh;
}

.right-display {
  width: 30%;
  margin: 0 10px;

  background: rgb(189, 171, 130);
  height: 100vh;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
}

@media (max-width: 1280px) {
  .left-display {
    display: none;
  }

  .right-display {
    width: 100%;
    margin: 0;
  }
}

.app-icon {
  position: fixed;
  left: 15%;
  bottom: 10%;
  width: 10%;

  /* Syntax: drop-shadow(offset-x offset-y blur-radius spread-radius color)*/
  filter: drop-shadow(10px 10px 10px #676767);
}

.app-icon:hover {
  position: fixed;
  left: 15%;
  bottom: 10%;
  width: 10%;

  /* Syntax: drop-shadow(offset-x offset-y blur-radius spread-radius color)*/
  filter: drop-shadow(10px 10px 12px #676767);
}


</style>