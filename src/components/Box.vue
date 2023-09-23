<script>
import {useFileListStore} from "@/stores/fileList";
import {useUserStore} from "@/stores/user";

export default {
  setup() {
    const fileListStore = useFileListStore();
    const userStore = useUserStore();
    return {fileListStore, userStore}
  },
  data() {
    return {

      //Section Controller
      sc_memoDialog: false,

      sc_tempTag: '',
      sc_tempMemo: {
        title: '',
        content: '',
        tag: [],
      },
      sc_uploadDialog: false,
      sc_tempFileData: '',

      sc_filter:[],

      //test
      test_user: {
        id: '',
        description: '',
      },
      test_fileData: '',

    }
  },
  methods: {
    async testFastUpload() {
      const returnValue = await fetch(
          "/service/object/" + this.user.token,
          {
            method: 'POST',
            body: JSON.stringify({
              'filename': 'testFile',
              'data': "This is a demo memo."
            }),
            headers: new Headers({
              'Content-Type': 'application/json'
            })
          }
      ).then((rev) => rev.json()).then((data) => console.log("testFastupload", data))

    },

    sc_addTag() {
      this.sc_tempMemo.tag.push(this.sc_tempTag);
      console.log(JSON.stringify(this.sc_tempMemo))
    },

    sc_removeTag(index) {
      this.sc_tempMemo.tag.splice(index);
    },

    async dr_submitMemo() {
      const result = await this.dr_sendSubmitMemoRequest();

    },

    /**
     * API v0.1.2 M4.2.8
     * @returns {Promise<Response>} Empty
     */
    async dr_sendSubmitMemoRequest() {
      console.log(JSON.stringify(this.sc_tempMemo))
      console.log("Upload memo: userStore: ", this.userStore.id, this.userStore.token);
      return await fetch("/drive/memo", {
            method: "POST",
            body: JSON.stringify({
              'title': this.sc_tempMemo.title,
              'content': this.sc_tempMemo.content,
              'tag': this.sc_tempMemo.tag,
              'accessibility': 0,
              'userId': this.userStore.id,
            }),
            headers: new Headers({'Content-Type': 'application/json'})
          }
      );
    },

    sc_clearMemo() {
      this.sc_tempMemo.title = '';
      this.sc_tempMemo.content = '';
      this.sc_tempMemo.tag = [];

    },

    async sc_loadInputData(event) {

      const data = event.target.files[0]
      const pieces = Math.floor(data.size / 1048576);
      console.log("Select data: pieces:", pieces)
      for (let i = 0; i < pieces; i++) {
        await fetch("/test/large/" + i, {
          method: "POST",
          body: data.slice(i * 1048576, (i + 1) * 1048576, "application/octet-stream") //slice end not included
        })
      }
      await fetch("/test/large/" + pieces, {
        method: "POST",
        body: data.slice(pieces * 1048576, data.size, "application/octet-stream") //slice end not included
      })

    },

    async dr_downloadFile(filename) {

      // const result = await fetch("/drive/object/" + this.userStore.id + "/" + filename, {
      //   method: "GET",
      // });

      window.open("/drive/object/" + this.userStore.id + "/" + filename);

    },

  }
}

</script>

<template>
  <v-container fluid>
    <!--  Checkbox group-->
    <v-row dense>
      <v-col cols="1">
        <v-checkbox
            v-model="sc_filter"
            label="Public"
            value="0"
        ></v-checkbox>
      </v-col>

      <v-col cols="1">
        <v-checkbox
            v-model="sc_filter"
            label="Private"
            value="1"
        ></v-checkbox>
      </v-col>

      <v-col cols="1">

        <v-checkbox
            v-model="sc_filter"
            label="Temp"
            value="2"
        ></v-checkbox>
      </v-col>
    </v-row>

<!--    fileList-->
    <v-row>
      <!--left display section-->
      <v-col cols="9">
        <v-container class="fileWall">
          <v-row>
            <v-col>
              <v-table density="compact">
                <thead>
                <tr>
                  <th class="text-left">
                    Name
                  </th>
                  <th class="text-left">
                    Type
                  </th>
                  <th class="text-left">
                    Accessibility
                  </th>
                  <th class="text-left">
                    Tag
                  </th>
                  <th class="text-left">
                    Action
                  </th>
                </tr>
                </thead>
                <tbody>
                <tr
                    v-for="f in fileListStore.getFilter(sc_filter)"
                    :key="f.filename"
                >
                  <td>{{ f.filename }}</td>
                  <td>{{ f.type }}</td>
                  <td>{{ f.accessibility }}</td>
                  <td>
                    <v-chip v-for="tag in f.tag">{{ tag }}</v-chip>
                  </td>
                  <td>
                    <v-chip @click="dr_downloadFile(f.filename)" icon="mdi-download"></v-chip>
                  </td>
                </tr>
                </tbody>
              </v-table>
            </v-col>
          </v-row>

        </v-container>
      </v-col>


      <!--right display section-->
      <v-col cols="3">
        <v-container class="memoWall">
          <v-btn @click="sc_memoDialog=!sc_memoDialog;console.log(sc_memoDialog)">Memos
            <v-tooltip activator="parent" location="end">Press to create memos</v-tooltip>
          </v-btn>
          <v-row>
            <v-col cols="6" v-for="(m, midx) in fileListStore.memo">
              <v-card>
                <v-card-title>{{ m.title }} - {{ midx }}</v-card-title>
                <v-card-subtitle>
                  <v-chip v-for="tag in m.tag">{{ tag }}</v-chip>
                </v-card-subtitle>
                <v-card-text> {{ m.content }}</v-card-text>
              </v-card>

            </v-col>
          </v-row>
        </v-container>


      </v-col>


    </v-row>

  </v-container>


  <v-dialog v-model="sc_uploadDialog" width="25vw">
    <v-card>
      <v-card-title>File Uploader</v-card-title>
      <v-card-text>
        <!--        <v-file-input accept="video/*" chips @input="sc_loadInputData($event)"></v-file-input>-->
        <v-file-input chips @input="sc_loadInputData($event)"></v-file-input>
      </v-card-text>
      <v-card-actions>
        <v-btn>Upload</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-dialog class="memoDialog" v-model="sc_memoDialog">

    <v-card>
      Create Memo
      <v-card-title>
        Title
        <v-text-field hint="Title" v-model="sc_tempMemo.title"></v-text-field>
      </v-card-title>
      <v-card-text>Content
        <v-textarea v-model="sc_tempMemo.content"></v-textarea>
      </v-card-text>
      <v-card-text>Tags
        <v-text-field v-model="sc_tempTag" @keyup.enter="sc_addTag"></v-text-field>
        <v-chip closable class="ma-2" v-for="(t, idx) in sc_tempMemo.tag" @click:close="sc_removeTag(idx)">
          {{ t }}
        </v-chip>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="dr_submitMemo">Submit</v-btn>
        <v-btn @click="sc_clearMemo">Clear</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>


  <!--  <div> This is BOX - id: {{ user.id }}, token: {{ user.token }}</div>-->
  <!--  <v-btn @click="testFastUpload">TestFastUpload</v-btn>-->
</template>

<style scoped>
.fileListData {
  /* ChatGPT 生成 */
  /* 用于展示文件的内容摘要 */
  width: 200px; /* 设置容器宽度 */
  white-space: nowrap; /* 防止换行 */
  overflow: hidden; /* 隐藏溢出内容 */
  text-overflow: ellipsis; /* 使用省略号表示被截断的文本 */
}

.memoWall {
  /* ChatGPT 生成 */
  /* 用于展示文件的内容摘要 */
  max-height: 88vh; /* 手调的，多出来的会顶到外面的滚动条 */
  overflow: auto;
}

/* ChatGPT 生成 */
/* 添加这段CSS代码来隐藏滚动条 */
.memoWall::-webkit-scrollbar {
  width: 0; /* 隐藏滚动条的宽度 */
}

/*复制自memoWall相关样式*/
.fileWall {
  max-height: 88vh;
  overflow: auto;
}

.memoDialog {
  width: 50vw;
}

</style>
