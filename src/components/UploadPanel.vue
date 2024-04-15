<script>
import {useUserStore} from "@/stores/user";
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
        accessibility: 0,
        tags: [],
        config: {
          method: "",
          compressed: "",
        }
      },

      fileUpload: {
        userId: this.userStore.id,
        data: "",
        filename: "",
        accessibility: 0,
        author: "",
        type: "",
        tags: [],
        size: 0,
        config:{
          method: "local",
          compressed: "0",
          token: "abcdefg",
        },
      },

      superUpload: {
        data: "",
        filename: "",
        accessibility: 0,
        author: "",
        type: "",
        tag: [],
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
    loadImage(event) {

      this.loadFile(event, this.reloadUrl)
      // console.log("event target", event.target.files[0].name);
      // console.log("event target", event);
      // 使用@input方式和@update:modelValue方式的区别在于后者等于前者.target.files
      console.log("event target", event.target.files[0]);


    },

    loadFile(event, callback) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = async function () {
        callback(reader.result, event.target.files[0]);
      }
    },

    reloadUrl(readerContent, file) {
      this.imgUpload.data = readerContent
      this.imgUpload.name = file.name

      // Set default url
      this.imgUpload.url = this.userStore.id + "/" + "image" + "/" + this.imgUpload.name;
      this.imgUpload.type = file.type
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
      // Pre-processing
      console.log("Debug: Upload Image: ", JSON.stringify({
        'token': this.userStore.token,
        'filename': this.imgUpload.name,
        'data': this.imgUpload.data.substring(0, 20),
        'type': this.imgUpload.type,
        'accessibility': this.imgUpload.accessibility,
        'author': this.imgUpload.author,
        'userId': this.userStore.id,
        'url': this.imgUpload.url,
        'configuration': this.imgUpload.config,
      }));

      // Request
      const imageUploadResult = await fetch("/drive/image", {
        method: "POST",
        body: JSON.stringify({
          'token': this.userStore.token,
          'filename': this.imgUpload.name,
          'data': this.imgUpload.data,
          'type': this.imgUpload.type,
          'accessibility': this.imgUpload.accessibility,
          'author': this.imgUpload.author,
          'userId': this.userStore.id,
          'tags': this.imgUpload.tags,
          'url': this.imgUpload.url,
          'configuration': this.imgUpload.config,
        }),
        headers: new Headers({
          'Authorization': 'Basic ' + btoa(this.userStore.name + ':' + this.userStore.password),
          'Content-Type': 'application/json'
        }),
      });

      // Post-processing
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
    sc_loadFile(files) {
      console.log("Debug: file event:", files);
      const file = files[0];

      if (file) {

        this.fileUpload.data = file;
        this.fileUpload.filename = file.name;
        this.fileUpload.size = file.size;
        this.fileUpload.type = file.type;
        // Set default url
        this.imgUpload.url = this.userStore.id + "/" + "file" + "/" + this.fileUpload.name;
      }


    },


    sc_uploadImagePushTag() {
      this.imgUpload.tags.push(this.sc_tempTag);
      this.sc_tempTag = ''
    },

    sc_uploadFilePushTag() {
      this.fileUpload.tags.push(this.sc_tempTag);
      this.sc_tempTag = ''
    },

    sc_superUploadPushTag() {
      this.superUpload.tag.push(this.sc_tempTag);
      this.sc_tempTag = ''
    },

    /**
     * API v0.1.2 M4.2.2.1
     * @returns {Promise<void>}
     */
    async sc_uploadFile() {
      // Pre-processing

      // Request
      if (this.fileUpload.size > 1048576) {
        console.log("File too big to upload.")
      } else {
        const requestBody = new FormData();
        // //meta info as unity
        // requestBody.append("part1", new Blob([JSON.stringify({
        //   "userId": this.test_user.id,
        //   "filename": this.test_fileData.name,
        // })], {type: "application/json"}));

        requestBody.append("meta", new Blob([JSON.stringify(
            {
              "userId": this.userStore.id,
              "filename": this.fileUpload.filename,
              "accessibility": this.fileUpload.accessibility,
              "author": this.fileUpload.author,
              "type": this.fileUpload.type,
              "tags": this.fileUpload.tags,
              "url": this.fileUpload.url,
            }
        )], {type: "application/json"}))
        requestBody.append("file", this.fileUpload.data);
        requestBody.append("config", new Blob([JSON.stringify(this.fileUpload.config)], {type: "application/json"}))

        const result = await fetch("/drive/object/form", {
          method: "POST",
          body: requestBody,
        })

        // Post-processing
        console.log("Upload File: status code:", result.status);
      }

    },

    sc_superUploadFileReader(event) {
      console.log(event.target.files);
      const file = event.target.files[0];
      // const file = files[0];
      //
      if (file) {
        this.superUpload.data = file;
        this.superUpload.filename = file.name;
        this.superUpload.size = file.size;
        this.superUpload.type = file.type;
      }

    },

    test_sendFileAsStream() {

      if (!this.superUpload.data) {
        console.log("Super upload file is empty")
      }

      if (this.superUpload.data) {
        const newConnection = new WebSocket('ws://' + window.location.host + '/stream');

        const userStoreRef = this.userStore;
        const fileRef = this.superUpload;

        newConnection.onmessage = function (e) {
          console.log(e.data, e.data === "ACK")
          if (e.data === "ACK") {
            const file = fileRef.data;

            const patches = Math.floor(file.size / 1048576);
            const patchSize = 1048576;

            for (let i = 0; i < patches; i++) {
              newConnection.send(file.slice(i * patchSize, (i + 1) * patchSize));
              console.log("sending: ", i)
            }
            newConnection.send(file.slice(patches * patchSize, file.size));
            newConnection.close()
            console.log("File:", fileRef.filename, "upload successfully")
          } else console.log(e.data)

        }

        newConnection.onerror = console.error;
        newConnection.onopen = function () {
          const meta = new Blob([JSON.stringify({
            filename: fileRef.filename,
            type: fileRef.type,
            userId: userStoreRef.id,
            author: fileRef.author,
            tags: fileRef.tag,
            accessibility: fileRef.accessibility,
          })], {type: 'application/json'});

          newConnection.send(meta);
        }
      }

    },


  }
}

</script>

<template>

  <div class="d-flex h-100 flex-column">
    <v-btn-toggle v-model="sc_toggle" class="justify-center">
      <v-btn variant="outlined">
        <v-icon>mdi-image-area</v-icon>
      </v-btn>
      <v-btn variant="outlined">
        <v-icon>mdi-file-outline</v-icon>
      </v-btn>
      <v-btn variant="outlined">
        <v-icon>mdi-file-upload</v-icon>
      </v-btn>
    </v-btn-toggle>


    <v-container>
      <v-row>
        <!--      Image Upload-->
        <v-col :cols="sc_toggle===0?12:0">
          <v-card v-show="sc_toggle===0">
            <v-card-title>Image</v-card-title>

            <v-card-item>
              <v-file-input style="width: 100%; margin-top: 1em" label="File input" variant="outlined" accept="image/*"
                            @input="loadImage($event)"></v-file-input>
            </v-card-item>

            <v-container>
              <v-row>
                <v-col cols="6">
                  <v-card-item class="d-flex pa-1">
                    <v-radio-group inline label="Accessibility" v-model="imgUpload.accessibility">
                      <v-radio label="Public" value="0"></v-radio>
                      <v-radio label="Private" value="1"></v-radio>
                      <v-radio label="Temp" value="2"></v-radio>
                    </v-radio-group>

                    <v-text-field label="Tag" v-model="sc_tempTag" @keyup.enter="sc_uploadImagePushTag"
                                  hint="Press Enter to add a tag"></v-text-field>
                    <v-chip class="ma-2" v-for="(t, idx) in imgUpload.tags">
                      {{ t }}
                    </v-chip>

                    <v-text-field label="Url" v-model="imgUpload.url"></v-text-field>

                    <v-radio-group inline label="Method" v-model="imgUpload.config.method">
                      <v-radio label="local" value="local"></v-radio>
                    </v-radio-group>
                    <v-radio-group inline label="Compressed" v-model="imgUpload.config.compressed">
                      <v-radio label="Default" value="0"></v-radio>
                    </v-radio-group>

                    <v-btn class="align-self-end" variant="elevated" color="success" @click="sc_uploadImage">Upload
                    </v-btn>
                  </v-card-item>

                </v-col>
                <v-col cols="6">
                  <v-card-item>
                    <v-img
                        width="10vw"
                        style="margin-left: 40%"
                        aspect-ratio="16/9"
                        cover
                        :src="imgUpload.data"
                        alt="display img"
                    ></v-img>
                  </v-card-item>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>

        <!--      File Upload-->
        <v-col :cols="sc_toggle===1?12:0">
          <v-card v-show="sc_toggle===1">
            <v-card-title>File</v-card-title>
            <v-card-text class="align-center">
              <v-file-input label="Select File" @update:modelValue="sc_loadFile($event)"></v-file-input>

              <v-container>
                <v-row>
                  <v-col cols="6">
                    <v-text-field label="Author" v-model="fileUpload.author"></v-text-field>
                    <v-text-field label="Type" v-model="fileUpload.type"></v-text-field>
                    <v-text-field label="Url" v-model="fileUpload.url"></v-text-field>
                    <v-radio-group inline label="Accessibility" v-model="fileUpload.accessibility">
                      <v-radio label="Public" value="0"></v-radio>
                      <v-radio label="Private" value="1"></v-radio>
                      <v-radio label="Temp" value="2"></v-radio>
                    </v-radio-group>
                    <v-text-field label="Tag" v-model="sc_tempTag" @keyup.enter="sc_uploadFilePushTag"
                                  hint="Press Enter to add a tag"></v-text-field>
                    <v-chip class="ma-2" v-for="(t, idx) in fileUpload.tags">
                      {{ t }}
                    </v-chip>
                  </v-col>
                  <v-col cols="6">
                    <div class="text-h5">File Meta Preview</div>
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

        <!--      super upload-->
        <v-col :cols="sc_toggle===2?12:0">
          <div v-show="sc_toggle===2">
            <!--          <v-file-input label="Select File" @update:modelValue="sc_superUploadFileReader($event)"></v-file-input>-->
            <v-file-input label="Select File" @input="sc_superUploadFileReader($event)"></v-file-input>
            <v-container>
              <v-row>
                <!--            attr setter-->
                <v-col cols="6">
                  <v-text-field label="Author" v-model="superUpload.author"></v-text-field>
                  <v-text-field label="Extension/MIME Type" v-model="superUpload.type"></v-text-field>
                  <v-radio-group inline label="Accessibility" v-model="superUpload.accessibility">
                    <v-radio label="Public" value="0"></v-radio>
                    <v-radio label="Private" value="1"></v-radio>
                    <v-radio label="Temp" value="2"></v-radio>
                  </v-radio-group>

                  <v-text-field label="Tag" v-model="sc_tempTag" @keyup.enter="sc_superUploadPushTag"
                                hint="Press Enter to add a tag"></v-text-field>
                  <v-chip class="ma-2" v-for="(t, idx) in superUpload.tag">
                    {{ t }}
                  </v-chip>
                </v-col>
                <!--            preview-->
                <v-col cols="6">
                  <div class="text-h5">File Meta Preview</div>
                  <div>{{ JSON.stringify(this.superUpload) }}
                  </div>
                </v-col>
              </v-row>
            </v-container>
            <v-btn color="success" @click="test_sendFileAsStream">Upload</v-btn>
          </div>

        </v-col>
      </v-row>
    </v-container>
  </div>

</template>

<style scoped>

</style>