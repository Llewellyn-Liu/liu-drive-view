import {defineStore} from "pinia";
import {tr} from "vuetify/locale";

export const useLoggerStore = defineStore("logger-center", {
    state: () => ({
        display: false,
        type: "error" | "success" | "warning" | "info",
        in: "",
        out: "",
    }),
    getters: {
        getLoggerIn: function (state) {
            return state.in;
        }
    },
    actions: {
        setLoggerIn(logStr){
            this.in = logStr;
        },

        success(str){
          this.type = "success";
          this.in = str;
          this.display = true;
        },

        info(str){
            this.type = "info";
            this.in = str;
            this.display = true;
        },

        error(str) {
            this.type = "error";
            this.in = str;
            this.display = true;
        }
    }
})