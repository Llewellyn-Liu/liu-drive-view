import {defineStore} from "pinia";
import {id} from "vuetify/locale";

export const useFileListStore = defineStore('file-list', {
    state: () => ({
        list: [],
        memo: [
        ],
    }),
    getters: {
        getList: (state) => {
            return state.list
        },
        getFilter: (state) => {
            return (list) => state.list.filter(e => list.includes(e.accessibility.toString()));
        },
    },
    actions: {
        setList(fileList) {
            this.list = fileList;
        },

        setMemo(memoList) {
            this.memo = memoList;
        },

        clear() {
            this.list = [];
            this.memo = [];
        },

    }
})