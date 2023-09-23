<script>
import {useUserStore} from "@/stores/user";
import {useImageListStore} from "@/stores/imageList";
import {useFileListStore} from "@/stores/fileList";
import {fi} from "vuetify/locale";

export default {
  setup() {
    const userStore = useUserStore();
    return {userStore}
  },
  data() {
    return {
      imgUpload: {
        url: "",
        data: "",
        name: "",
      },

      fileUpload: {
        data: "",
        filename: "",
        accessibility: 0,
        author: "",
        type: "",
        tag: [],
        size:0,
      },
      sc_tempTag: "",

      //true -> image, false -> file
      sc_toggleDisplayImage: true,
      sc_toggle: 0,

    }
  },
  methods: {
    //'View image before upload' is functioned with 3 functions:
    //showPicture(): using callback to make the process sequential.
    //loadFile(): Pre-steps
    //reloadUrl(): Post-steps
    showPicture(event) {

      this.loadFile(event, this.reloadUrl)
      console.log("event target", event.target.files[0].name);
      this.im
    },

    loadFile(event, callback) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = async function () {
        console.log("output", reader.result)
        callback(reader.result, event.target.files[0].name);
      }
    },

    reloadUrl(readerContent, filename) {
      this.imgUpload.url = readerContent
      this.imgUpload.data = readerContent
      this.imgUpload.name = filename
      console.log("->", this.imgUpload)


    },

    async sc_uploadImage() {
      if (this.imgUpload.data === null) {
        console.log("img data is null")
        return;
      }

      const response = await this.sendImageUploadRequest();
      console.log("Image upload response: ", response);

      if (response.status === 204) {
        this.sc_alertType = "success";
        this.sc_alertContent = "Image uploaded";
        this.sc_alertOpen = true;

        this.imgUpload.data = "";
        this.imgUpload.name = "";
        this.imgUpload.url = "";
      }

    },

    /**
     * API v0.1.2 M4.2.3
     * @returns {Promise<{data: {}, status: number}|{status: number}>} Empty payload
     */
    async sendImageUploadRequest() {

      console.log("Upload Image")
      const imageUploadResult = await fetch("/drive/image", {
        method: "POST",
        body: JSON.stringify({
          'token': this.userStore.token,
          'filename': this.imgUpload.name,
          'data': this.imgUpload.data,
          'type': 'abc',
          'accessibility': '2',
          'author': this.userStore.id,
          'userId': this.userStore.id
        }),
        headers: new Headers({
          'Authorization': 'Basic ' + btoa(this.userStore.name + ':' + this.userStore.password),
          'Content-Type': 'application/json'
        }),
      });

      console.log("Image upload status:", imageUploadResult.status)
      if (imageUploadResult.status === 204) {
        console.log("Image upload success.")

        return {
          "status": imageUploadResult.status
        };

      } else if (imageUploadResult.status === 401) {
        this.sc_alertContent = "UserId already exists."
      } else {
        return {
          "status": imageUploadResult.status
        }
      }
    },

    //File related methods
    sc_updateFileDataToUpload(files) {
      console.log(files);
      const file = files[0];

      if (file) {
        console.log("Test blob:", file.name);
        // this.test_fileData = new Blob([file], {type: file.type});
        this.fileUpload.data = file;
        this.fileUpload.filename = file.name;
        this.fileUpload.size = file.size;
        console.log("Test blob:", this.fileUpload.size);
      }


    },


    sc_uploadFilePushTag() {
      this.fileUpload.tag.push(this.sc_tempTag);
      this.sc_tempTag = ''
    },

    /**
     * API v0.1.2 M4.2.2.1
     * @returns {Promise<void>}
     */
    // async sc_uploadFile() {
    //
    //   if (this.fileUpload.size > 1048576) {
    //
    //     const requestStatus = dr_sendLargeFileMeta();
    //     if(requestStatus === 204) {
    //       for(let i = 0; i< 5; i++){
    //         const unit = this.fileUpload.slice()
    //       }
    //     };
    //       //success;
    //     else ; //failed
    //
    //
    //
    //   } else {
    //     const requestBody = new FormData();
    //     // //meta info as unity
    //     // requestBody.append("part1", new Blob([JSON.stringify({
    //     //   "userId": this.test_user.id,
    //     //   "filename": this.test_fileData.name,
    //     // })], {type: "application/json"}));
    //
    //     requestBody.append("meta", new Blob([JSON.stringify(
    //         {
    //           "userId": this.userStore.id,
    //           "filename": this.fileUpload.filename,
    //           "accessibility": this.fileUpload.accessibility,
    //           "author": this.fileUpload.author,
    //           "type": this.fileUpload.type,
    //           "tag": this.fileUpload.tag,
    //         }
    //     )], {type: "application/json"}))
    //     requestBody.append("file", this.fileUpload.data);
    //
    //     const result = await fetch("/drive/object/form", {
    //       method: "POST",
    //       body: requestBody,
    //     })
    //   }
    //
    // },


  }
}

</script>

<template>
  <v-btn-toggle v-model="sc_toggle" class="align-self-center">
    <v-btn variant="outlined">
      <v-icon>mdi-image-area</v-icon>
    </v-btn>
    <v-btn variant="outlined">
      <v-icon>mdi-file-outline</v-icon>
    </v-btn>
  </v-btn-toggle>
  <v-container>
    <v-row>
      <!--      Image Upload-->
      <v-col :cols="sc_toggle===0?12:0">
        <v-card v-show="sc_toggle===0">
          <v-card-title>Image</v-card-title>

          <v-card-item>
            <v-file-input style="width: 60%; margin-top: 1em" label="File input" variant="outlined" accept="image/*"
                          @input="showPicture($event)"></v-file-input>
            <v-img
                width="20%"
                style="margin-left: 40%"
                aspect-ratio="16/9"
                cover
                :src="imgUpload.url"
                alt="display img"
            ></v-img>

            <v-btn variant="elevated" color="success" @click="sc_uploadImage">Upload</v-btn>
          </v-card-item>

        </v-card>
      </v-col>

      <!--      File Upload-->
      <v-col :cols="sc_toggle===0?0:12">
        <v-card v-show="sc_toggle===1">
          <v-card-title>File</v-card-title>
          <v-card-text class="align-center">
            <v-file-input label="Select File" @update:modelValue="sc_updateFileDataToUpload($event)"></v-file-input>

            <v-container>
              <v-row>
                <v-col cols="6">
                  <v-text-field label="Author" v-model="fileUpload.author"></v-text-field>
                  <v-text-field label="Type" v-model="fileUpload.type"></v-text-field>
                  <v-radio-group inline label="Accessibility" v-model="fileUpload.accessibility">
                    <v-radio label="Public" value="0"></v-radio>
                    <v-radio label="Private" value="1"></v-radio>
                    <v-radio label="Temp" value="2"></v-radio>
                  </v-radio-group>
                  <v-text-field label="Tag" v-model="sc_tempTag" @keyup.enter="sc_uploadFilePushTag"
                                hint="Press Enter to add a tag"></v-text-field>
                  <v-chip class="ma-2" v-for="(t, idx) in fileUpload.tag">
                    {{ t }}
                  </v-chip>
                </v-col>
                <v-col cols="6">
                  <div class="text-h5">File Meta</div>
                  <div>{{ JSON.stringify(this.fileUpload) }}
                  </div>
                </v-col>
              </v-row>
            </v-container>
            <v-divider v-show="false"></v-divider>
            <v-btn @click="sc_uploadFile" variant="elevated" color="success">Upload</v-btn>
          </v-card-text>

        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>

</style>