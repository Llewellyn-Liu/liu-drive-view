import {defineStore} from "pinia";
import {id} from "vuetify/locale";

export const useImageListStore = defineStore('image-list', {
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
        }
    }
})