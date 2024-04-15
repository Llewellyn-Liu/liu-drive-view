import {defineStore} from "pinia";
import {id} from "vuetify/locale";

export const useGalleryListStore = defineStore('gallery-list', {
    state: () => ({
        list: [],
        size: 0,
    }),
    getters: {
        getList: function (state) {
            return state.list
        }
    },
    actions: {
        setList(fileList) {
            this.list = fileList;
        },

        clear() {
            this.list = [];
            this.memo = [];
        },
    }
})