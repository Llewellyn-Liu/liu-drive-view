import {defineStore} from "pinia";
import {id} from "vuetify/locale";

export const useUserStore = defineStore('current-user', {
    state: () => ({
        id: '',
        name: '',
        password: '',
        token: '',
        userLoggedIn: false,
    }),
    getters: {
        getId: (state) => 'UserId: ' + state.id,
    },
    actions: {
        setUser(id, name, token, isUserLoggedIn) {
            this.id = id;
            this.name = name;
            this.token = token;
            this.userLoggedIn = isUserLoggedIn;
        },

        clearPassword() {
            this.password = '';
        },

        clearUser() {
            this.id = '';
            this.name = '';
            this.password = '';
            this.token = '';
            this.userLoggedIn = false;
        },

        getFormatInfo: function () {
            return 'User{ id: '+ this.id + ', '
                +'name: ' + this.name
                +'}';
        },
    }
})