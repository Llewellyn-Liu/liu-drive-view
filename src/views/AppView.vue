<script>
import SideBar from "@/components/SideBar.vue";
import {mapState, storeToRefs} from "pinia";
import {useUserStore} from "@/stores/user";
import {useGalleryListStore} from "@/stores/GalleryList";
import {useFileListStore} from "@/stores/fileList";
import UploadPanel from "@/components/UploadPanel.vue";
import {useLoggerStore} from "@/stores/logger";

import {defineComponent} from 'vue'
import {lg_sendLoginRequest} from "@/utils/methods";

export default defineComponent({
  name: "app-view",
  setup() {
    const userStore = useUserStore();
    const galleryListStore = useGalleryListStore();
    const fileListStore = useFileListStore();
    const loggerStore = useLoggerStore();

    return {userStore, galleryListStore, fileListStore, loggerStore}
  },
  data() {
    const {id, name, password, token} = storeToRefs(this.userStore)
    return {

      // Backend interactive fields
      // Do not delete imgUrl: its value should be the same with imgData when display local images.
      // Change imgData when upload
      imgUrl: "https://www.google.com/logos/doodles/2023/doodle-for-google-2023-us-winner-6753651837109873-2x.png",

      imgData: "Hello data",
      textInput: "this text",

      uploadFile: {
        filename: "",
        accessibility: 0,
        author: "",
        type: "",
        tag: [],
        tempTag: "",
      },

      //Component controllers
      dialog: false,
      lg_switch: true,
      lg_buttonContent: "Login",
      lg_pswdConfirm: '',
      lg_pswdConfirmNotPassed: false,
      dr_uploadPanelOpen: false,
      sc_alertOpen: false,
      sc_alertType: "success",

      sc_testConnection: null,

      //Global status
      sc_alertContent: 'Happy',

      test_imageData: "",

      user: {
        username: "",
        password: "",
        userId: "",
      },

      //rules
      rules: {
        idFormat(val) {
          const pattern = /^\w+$/;
          if (val.match(pattern)) return true;
          else return "Not a valid id"
        }
      },
    }
  },
  methods: {

    loginButtonController() {
      this.dialog = true
    },

    lg_loginButtonController() {
      if (this.lg_switch) {
        this.login();
      } else this.register();
    },

    async login() {
      const response = await lg_sendLoginRequest(this.user.username, this.user.password);
      this.user.password = ""; //For security purpose

      if (response.status === 200) {
        this.userStore.setUser(response.data.userId, response.data.username, response.data.token, true);
        this.dialog = false; //close the login dialog
        this.loggerStore.success("Log in: " + this.userStore.id);
        console.log("Welcome,", this.userStore.id);

        this.switchBarLoginButtonContent()

        //Retrieve data from backend
        await this.dr_refresh();

      } else {
        console.log("Unexpected status",response)
      }
    },


    switchBarLoginButtonContent() {

      this.barLoginButtonContent = this.userStore.userLoggedIn ? "Logout" : "Login";

    },

    logout() {
      //Clear all necessary local storage
      this.userStore.clearUser();
      this.fileListStore.clear();
      this.galleryListStore.clear();

      this.switchBarLoginButtonContent();
      this.$router.push("/");
    },


    lg_switchEventController() {
      this.lg_buttonContent = this.lg_switch ? "Login" : "Register";

      if (!this.lg_switch) {
        this.lg_pswdConfirmNotPassed = !(this.userStore.password === this.lg_pswdConfirm
            && this.userStore.password !== '');
      } else {
        this.lg_pswdConfirmNotPassed = false;
      }

    },

    async register() {

      const response = await this.sendRegisterRequest();
      this.userStore.clearPassword();//For security purpose

      if (response.status === 200) {
        this.dialog = false; //close the login dialog

        //Change the status to before login
        this.lg_switch = true;
        this.lg_switchEventController();

        console.log("status 200:" + JSON.stringify(response))

      } else {
        console.log("Unexpected status", response)
      }
    },

    /**
     * API v0.1.2 M4.1.4
     * @returns {Promise<{data: {}, status: number}|{data: any, status: number}>} {"username":"", "userId":""}
     */
    async sendRegisterRequest() {
      console.log("Register")
      const loginResult = await fetch("/drive/user", {
        method: "POST",
        body: JSON.stringify({
          'username': this.userStore.name,
          'userId': this.userStore.id,
          'password': this.userStore.password
        }),
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
      });

      console.log("status:", loginResult.status)
      if (loginResult.status === 200) {
        //Cleaning
        this.loggerStore.success("Register Success")

        return {
          "data": await loginResult.json(),
          "status": loginResult.status
        };

      } else if (loginResult.status === 400) {
        this.loggerStore.error("Please check your info");
      } else {
        this.loggerStore.error("Unknown error.")
        return {
          "data": {},
          "status": loginResult.status
        }
      }
    },

    //Rules: check if the entry in both boxes match.
    samePassword(val) {
      if (val === this.userStore.password) {
        this.lg_pswdConfirmNotPassed = false;
        return true;
      } else {
        this.lg_pswdConfirmNotPassed = true;
        return "Password doesn't match"
      }
    },


    /**
     * API v0.1.2 M4.3.1
     * @param page Starts from 0
     * @returns {Promise<any>} ImageMeta list
     */
    async dr_galleryGet(page) {
      console.log("Fetch gallery list", page)
      const galleryListRes = await fetch("/drive/gallery/" + this.userStore.id + "/page/" + page, {
        method: "GET",
      }).then((res) => res.json());


      console.log("Gallery Get: ", galleryListRes)
      return galleryListRes;
    },

    sc_toBox() {
    },

    sc_toGallery() {

    },

    /**
     * API v0.1.2 M4.3.1
     * @param page Starts from 0
     * @returns {Promise<any>} ObjectFileMeta list
     */
    async dr_objectFileListGet(page) {
      console.log("Fetch file list", page)
      const fileListRes = await fetch("/drive/object/" + this.userStore.id + "/page/" + page, {
        method: "GET",
      }).then((res) => res.json());


      console.log("GET ObjectFileList: ", fileListRes)
      return fileListRes;
    },

    /**
     * API v0.1.2 M4.3.3
     * @returns {Promise<any>} Memo list
     */
    async dr_memoGet() {
      const fileListRes = await fetch("/drive/memo/" + this.userStore.id, {
        method: "GET",
      }).then((res) => res.json());


      console.log("GET Memos: ", fileListRes)
      return fileListRes;
    },

    async dr_refresh() {
      const galleryFetchResult = await this.dr_galleryGet(0);
      const fileFetchResult = await this.dr_objectFileListGet(0);
      const memoFetchResult = await this.dr_memoGet();

      this.galleryListStore.setList(galleryFetchResult);
      this.fileListStore.setList(fileFetchResult);
      this.fileListStore.setMemo(memoFetchResult);
      console.log("Refreshed")
    },

  },
  computed: {},

  // 这个router跳转处理钩子真nb。提供了一个then callback方法用来处理跳转成功后的内容，c为Component实例本身
  // then外部的为该路由过程的处理，如果代码没通过，则会阻塞路由继续前进（也就是目标页面打不开）
  beforeRouteEnter(to, from, then) {
    then(c => {
      if (from.name === "default") {
        c.dr_refresh()
      }
    })
  },

  components: {
    UploadPanel,
    SideBar
  }
})

//import HelloWorld from '@/components/SideBar.vue'

// let result = fetch("/test", {
//   method: "GET"
// })  .then((response) => response.json())
//   .then((json) => console.log(json));
</script>

<template>
  <v-app>
    <v-app-bar title="Drive">
      <!--      <v-btn @click="dr_uploadPanelOpen=true" :disabled="!userStore.userLoggedIn" density="default"-->
      <v-btn @click="dr_uploadPanelOpen=true" density="default"
             icon="mdi-plus"></v-btn>
      <v-btn @click="loginButtonController" v-show="!this.userStore.userLoggedIn">Login</v-btn>
      <v-btn @click="logout" v-show="this.userStore.userLoggedIn">Logout</v-btn>
      <v-card style="width: 20vw; max-width: 25em" v-if="userStore.userLoggedIn">
        <v-card-item prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg">
          <div class="text-h6 mb-1">{{ userStore.id }}</div>
          <div class="text-h7  mb-1">{{ userStore.name }}</div>
        </v-card-item>
      </v-card>
      <v-btn @click="dr_refresh" icon="mdi-refresh"></v-btn>
      <v-btn>Gallery
        <RouterLink :to="'/gallery/' + userStore.id"></RouterLink>
      </v-btn>

      <v-btn>Box
        <RouterLink :to="'/box/'+userStore.id"></RouterLink>
      </v-btn>
    </v-app-bar>

    <!--    <v-navigation-drawer-->
    <!--        expand-on-hover-->
    <!--        rail>-->
    <!--      <SideBar @passToParent="console.log('received')"/>-->
    <!--    </v-navigation-drawer>-->

    <v-main>
      <RouterView/>
    </v-main>

    <!--    Login Dialog-->
    <v-dialog
        v-model="dialog"
        width="35%"
        id="sc_loginDialog"
    >
      <v-card height="auto">
        <v-card-text>
          Login
          <v-form @submit.prevent>
            <v-text-field label="Username" v-model="user.username"></v-text-field>
            <v-text-field label="Id" v-model="user.userId" v-if="!lg_switch" :rules="[rules.idFormat]"></v-text-field>
            <v-text-field label="Password" v-model="user.password" type="password"></v-text-field>
            <v-text-field label="Confirm" v-model="lg_pswdConfirm" v-if="!lg_switch"
                          type="password" :rules="[samePassword]"></v-text-field>
            <v-btn @click="lg_loginButtonController" :disabled="lg_pswdConfirmNotPassed">{{
                lg_buttonContent
              }}
            </v-btn>
          </v-form>

          <v-divider></v-divider>
          <v-switch v-model="lg_switch" @update:modelValue="lg_switchEventController" :label="lg_buttonContent">
            Switch
          </v-switch>
        </v-card-text>

        <v-card-actions>
          <v-btn color="primary" block @click="dialog = false">Close Dialog</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!--    Upload Dialog-->
    <v-dialog v-model="dr_uploadPanelOpen" width="55vw" min-height="50vh">
      <v-card>
        <v-card-title class="align-end">Upload</v-card-title>

        <upload-panel/>
      </v-card>
      <v-card-actions>
        <v-btn variant="flat" color="green" @click="dr_uploadPanelOpen=false" icon="mdi-close"></v-btn>
      </v-card-actions>

    </v-dialog>

    <v-snackbar v-model="this.loggerStore.display" color="white" timeout="2000">
      <v-alert :type="this.loggerStore.type">{{ this.loggerStore.in }}</v-alert>
      <template v-slot:actions>
        <v-btn variant="text" @click="sc_alertOpen = false" color="black">CLOSE</v-btn>
      </template>
    </v-snackbar>


  </v-app>

</template>


<style scoped>

</style>