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
        <v-hover v-slot:default="{ isHovering, props}">
          <template>
            <v-card max-height="15vh" elevation="5" v-bind="props">
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
                  <v-card-title class="text-white">{{ e.filename }}</v-card-title>
                </div>

              </v-img>
              <v-overlay contained :model-value="isHovering" class="align-center justify-center">
                <div class="align-center justify-center layout-opener">
                  <v-btn class="align-center" @click="sc_overlayOn = true">Preview</v-btn>
                </div>
                <div class="align-baseline">
                  <v-btn class="align-center" @click="console.log('Click', eid)" icon="mdi-download"></v-btn>
                </div>
              </v-overlay>
            </v-card>

          </template>
        </v-hover>


      </v-col>

    </v-row>
  </v-container>
  <v-overlay scroll-strategy="none" v-model="sc_overlayOn" id="display-overlay" class="align-center justify-center">
    <v-img width="100vh" :src="'http://localhost:8080/drive/image/'+userStore.id+'/'+e.filename"></v-img>
  </v-overlay>


</template>

<style scoped>

</style>
