<script>
import {useUserStore} from "@/stores/user";
import {useImageListStore} from "@/stores/imageList";
import {fi} from "vuetify/locale";

export default {
  setup() {
    const userStore = useUserStore();
    const imageListStore = useImageListStore();
    return {userStore, imageListStore}
  },
  data() {
    return {
      test_base64: "200",
      sc_overlayOn: false,
      sc_overlayDisplayFilename: "",
    }
  },
  methods: {
    async dr_downloadImage(filename) {
      window.open("/drive/image/" + this.userStore.id + "/" + filename)
    }
  }
}

</script>

<template>
    <v-container fluid v-if="userStore.userLoggedIn">

      <v-row>
        <v-col
            v-for="(e, eid) in imageListStore.list"
            class="d-flex"
            cols="1"
        >
          <v-card max-height="15vh" elevation="5">
            <v-img
                cover
                height="100%"
                :src="'http://localhost:8080/drive/image/'+userStore.id+'/'+e.filename+'/thumbnail'"
                class="align-end"
                aspect-ratio="1"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                :alt="'img-'+eid"
            >
              <div style="width:12vh; overflow: hidden">
                <v-card-title class="text-white">{{ e.filename }} </v-card-title>
              </div>

            </v-img>
          </v-card>
        </v-col>

      </v-row>
    </v-container>


  <v-overlay scroll-strategy="none" v-model="sc_overlayOn" id="display-overlay" class="align-center justify-center">
    <v-img width="100vh" :src="'/drive/image/'+userStore.id+'/'+sc_overlayDisplayFilename"></v-img>
  </v-overlay>


</template>

<style scoped>

</style>
