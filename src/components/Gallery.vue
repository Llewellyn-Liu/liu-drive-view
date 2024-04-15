<script>
import {useUserStore} from "@/stores/user";
import {useGalleryListStore} from "@/stores/GalleryList";

export default {
  setup() {
    const userStore = useUserStore();
    const galleryListStore = useGalleryListStore();
    return {userStore, galleryListStore}
  },
  data() {
    return {
      test_base64: "200",
      sc_overlayOn: false,
      sc_overlayDisplay: {
        url: "",
        type: "",
      },
    }
  },
  methods: {
    async dr_downloadImage(filename) {
      window.open("/drive/image/" + this.userStore.id + "/" + filename)
    },

    async dr_deleteImage() {
      const result = await fetch("/drive/image/" + this.sc_overlayDisplay.url, {
        method: "DELETE",
      });

      if (result.status === 200) {
        console.log("image " + this.sc_overlayDisplay.url + " deleted");
      } else if (result.status === 400) {
        console.log("image " + this.sc_overlayDisplay.url + " failed to delete.")
      } else console.log("An error occurs, please check the source code")
    },

    sc_getThumbnailUrlOfElement(e) {
      const type = e.type.toLowerCase();
      if (type.startsWith("image")) {
        console.log("Debug: e.url:", e.url);
        return "/drive/thumb/" + e.url;
      } else if (type.startsWith("video")) {
        return "https://picsum.photos/200";
      } else {
        console.log("Wrong type of element found in galleryList:", e);
        return "/error"
      }
    },

    sc_prepareAndDisplayOverlay(e) {
      this.sc_overlayDisplay.url = e.url;
      if (e.type.toLowerCase().startsWith('image')) this.sc_overlayDisplay.type = 'image';
      else if (e.type.toLowerCase().startsWith('video')) this.sc_overlayDisplay.type = 'video';
      else {
        console.log("Wrong type in element", JSON.stringify(e));
      }

      this.sc_overlayOn = true

      console.log("Debug: displayurl", this.sc_overlayDisplay.url);
    },
  },

}

</script>

<template>
  <div class="flex-container">
    <div v-for="e in galleryListStore.list">

      <v-hover>
        <template v-slot:default="{isHovering, props}">
          <v-card v-bind="props" :class="'block-'+e.scale+' rounded-xl'" :elevation="isHovering?15:5"
                  @click="sc_prepareAndDisplayOverlay(e)">
            <v-img :src="sc_getThumbnailUrlOfElement(e)"
                   cover=""></v-img>
          </v-card>
        </template>
      </v-hover>

    </div>
  </div>

  <!--  <v-overlay scroll-strategy="none" v-model="sc_overlayOn" id="display-overlay" class="align-center justify-center">-->
  <v-overlay scroll-strategy="block" v-model="sc_overlayOn" id="display-overlay"
             style="display:flex; align-items: center; justify-content: center">

    <div class="media-display-image" :disabled="sc_overlayDisplay.type !== 'image'"  v-show="this.sc_overlayDisplay.type === 'image'">
      <v-img
             :src="sc_overlayDisplay.type === 'image'?'/drive/image/'+sc_overlayDisplay.url : ''"></v-img>
    </div>


    <div class="media-display-video" v-show="sc_overlayDisplay.type === 'video'">
      <video
          style="width: 100%; height: 100%"
          id="my-player"
          class="video-js rounded-xl"
          controls
          preload="auto"
          poster="https://picsum.photos/400/200"
          data-setup='{}'>
        <source :src="sc_overlayDisplay.type === 'video'?'/drive/video/'+sc_overlayDisplay.url : ''" type="video/mp4">
        <p class="vjs-no-js">
          To view this video please enable JavaScript, and consider upgrading to a
          web browser that
          <a href="https://videojs.com/html5-video-support/" target="_blank">
            supports HTML5 video
          </a>
        </p>
      </video>
    </div>
    <v-sheet style="padding: 0" class="rounded-xl image-view-controller">
      <v-btn color="error" class="ma-5" @click="dr_deleteImage">Delete</v-btn>
    </v-sheet>
  </v-overlay>

</template>

<style scoped>
.flex-container {
  display: flex;
  flex-wrap: wrap; /* Problem solved by ChatGPT */
  height: 100%;
  width: 100vw;
  align-content: start;
  justify-content: start;
  background: rgb(106, 95, 128);
}

.block-1 {
  width: 12vh;
  height: 12vh;
  margin: 1vh 1vh;
  cursor: pointer;
}

.block-2 {
  width: 26vh; /* height + height + 2 * margin*/
  height: 12vh;
  margin: 1vh 1vh;
  cursor: pointer;
}

.image-view-controller {
  margin: 2vh auto;
  width: 50vw;
  height: 10vh;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  overflow-x: auto;
}


/* ref: https://zxuqian.cn/css-how-to-hide-scrollbars/*/
.image-view-controller::-webkit-scrollbar {
  display: none;
}

.media-display-image{
  max-height: 75vh;
}
.media-display-video{

  height: 50vh; width: 50vw

}

</style>
