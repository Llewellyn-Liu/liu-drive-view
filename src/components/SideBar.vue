<template>
  <v-list>
    <v-list-item v-if="userLoggedIn"
                 prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
                 :title="user.name"
                 subtitle="sandra_a88@gmailcom"
    ></v-list-item>
    <v-list-item>
      <v-btn @click="dialog = true">Press me
      </v-btn>
    </v-list-item>
    <v-divider></v-divider>
    <v-btn @click="passVarToParent">toParent</v-btn>
  </v-list>


  <v-card>
    <v-card-item v-for="sidebarContent in sidebarContents">
      <v-btn width="100%">{{ sidebarContent.name }}</v-btn>
      <v-btn width="100%" @click="getRequest">click event</v-btn>
    </v-card-item>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      //DOM content
      sidebarContents: [{name: 'abc'}, {name: 'def'}, {name: 'ghi'}],
      pictureMetas: [{name: 'pic1', format: 'jpg', data: ''}],

      //User-related logic
      userLoggedIn: false,
      user: {name: '', password: ''},
      dialog: false
    }
  },
  methods: {
    getRequest() {
      // let result = fetch("/test", {
      //   method: "POST"
      // }).then((response) => response.json())
      //   .then((json) => console.log(json));

      console.log("Clicked")
    },
    async login() {
      const response = await this.sendLoginRequest();
      if (response.status === 200) {
        this.userLoggedIn = true;
        this.user.name = response.data.username
        this.dialog = false; //close the login dialog
        console.log("status 200:" + response)
        console.log("status 200:" + this.userLoggedIn)
        console.log("status 200: end")
      } else {
        console.log(response)
      }
    },

    //
    async sendLoginRequest() {
      console.log("login")
      const loginResult = await fetch("/security/auth", {
        method: "POST",
        body: JSON.stringify({
          'username': this.user.name,
          'password': this.user.password
        }),
        headers: new Headers({
          'Authorization': 'Basic ' + btoa(this.user.name + ':' + this.user.password),
          'Content-Type': 'application/json'
        }),
      });
      if (loginResult.status === 200) {
        console.log("Not null");
        return {
          "data": await loginResult.json(),
          "status": loginResult.status
        };
      } else {
        return {
          "data": {},
          "status": loginResult.status
        }
      }
    },

    passVarToParent() {
      this.$emit("passToParent")
    }

  },
  emits: ['passToParent']

}
</script>
