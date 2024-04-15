<script>
import {defineComponent} from 'vue'

export default defineComponent({
      name: "Intro",
      data() {
        return{
          test_value: "abc",
        }
      }
    }
)
</script>

<template>
  <v-btn>Hello1</v-btn>

  <v-bottom-navigation>
    <v-btn>{{ test_value }}</v-btn>
  </v-bottom-navigation>

</template>

<style scoped>

</style>