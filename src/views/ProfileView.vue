<script>
import {defineComponent} from 'vue'
import {useGalleryListStore} from "@/stores/GalleryList";
import {useFileListStore} from "@/stores/fileList";
import {useLoggerStore} from "@/stores/logger";
import {useUserStore} from "@/stores/user";

export default defineComponent({
  name: "ProfileView",
  setup(){
    const userStore = useUserStore();
    const galleryListStore = useGalleryListStore();
    const fileListStore = useFileListStore();
    const loggerStore = useLoggerStore();

    return{
      userStore, galleryListStore, fileListStore, loggerStore
    }
  },

  data() {
    return {

      // nav-bar selected value
      nav: ["Users"],

      // content to display
      sc_profile: {
        Users: {
          UserId: "123",
          Username: "123",
          Icon: "https://picsum.photos/200",
        },
        Credentials: {
          "Current Password": "123",
          "New Password": "",
          "Confirm New Password": "",
        }
      }
    }
  },
  created() {

  },

  methods: {
    logout() {
      //Clear all necessary local storage
      this.userStore.clearUser();
      this.fileListStore.clear();
      this.galleryListStore.clear();
    },

  }

})
</script>

<template>
  <v-layout>
    <v-app-bar title="Profile"></v-app-bar>
    <v-navigation-drawer>

      <v-list v-model:selected="nav" nav>
        <v-list-subheader>Settings</v-list-subheader>
        <v-list-item title="Users" value="Users"></v-list-item>
        <v-list-item title="Credentials" value="Credentials"></v-list-item>

        <v-divider></v-divider>
        <v-list nav>
          <v-list-item link @click="logout">Logout</v-list-item>
        </v-list>
      </v-list>

    </v-navigation-drawer>
    <v-main>
      <div class="d-flex flex-wrap justify-center align-center">
        <v-card style="width: 50vw; min-width: 300px">
          <v-list nav>
            <v-list-subheader>{{ nav[0] }}</v-list-subheader>
            <!--List for Users-->
            <div v-show="'Users' === nav[0]" v-for="(v, k) in sc_profile.Users" :key="k">
              <v-list-item>
                <div class="d-flex flex-wrap" style="justify-content: space-between">
                  <div style="margin-left: 10px" class="d-flex flex-wrap justify-center align-center">
                    <div style="width: fit-content;">{{k}}</div>
                  </div>
                  <div v-show="k !== 'Icon'" style="width: fit-content;margin-right: 10px">{{ v }}</div>
                  <div v-show="k === 'Icon'" style="width: fit-content;margin-right: 10px">

                    <v-img :src="v" width="64px"></v-img></div>
                </div>
              </v-list-item>
              <v-divider></v-divider>
            </div>

            <!--List for Credentials-->
            <div v-show="'Credentials' === nav[0]">
              <v-list-item>
                <div class="d-flex flex-wrap" style="justify-content: space-between">
                  <div style="margin-left: 10px" class="d-flex flex-wrap justify-center align-center">
                    <div style="width: fit-content;">Current Password</div>
                  </div>
                  <div disabled style="margin-right: 10px; width: 30%">
                    <v-text-field></v-text-field>
                  </div>
                </div>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item>
                <div class="d-flex flex-wrap" style="justify-content: space-between">
                  <div style="margin-left: 10px" class="d-flex flex-wrap justify-center align-center">
                    <div style="width: fit-content;">New Password</div>
                  </div>
                  <div disabled style="width: 30%;margin-right: 10px">
                    <v-text-field></v-text-field>
                  </div>
                </div>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item>
                <div class="d-flex flex-wrap" style="justify-content: space-between">
                  <div style="margin-left: 10px" class="d-flex flex-wrap justify-center align-center">
                    <div style="width: fit-content;">Confirm New Password</div>
                  </div>
                  <div disabled style="width: 30%;margin-right: 10px">
                    <v-text-field></v-text-field>
                  </div>
                </div>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-subheader>Cloud</v-list-subheader>
              <v-list-item>
                <div class="d-flex flex-wrap" style="justify-content: space-between">
                  <div style="margin-left: 10px" class="d-flex flex-wrap justify-center align-center">
                    <div style="width: fit-content;">AWS</div>
                  </div>
                  <div disabled style="width: 30%;margin-right: 10px">
                    <v-text-field ></v-text-field>
                  </div>
                </div>
              </v-list-item>
            </div>



          </v-list>
        </v-card>
      </div>

    </v-main>

  </v-layout>

</template>

<style scoped>

</style>