<template>
  <div class="hover-controller">
    <v-btn>Main Vue</v-btn>
    <v-btn>
      <RouterLink to="/page">Welcome Page</RouterLink>
    </v-btn>
    <v-btn>
      <RouterLink to="/app/123">App Page</RouterLink>
    </v-btn>
  </div>

  <div class="window">
    <RouterView/>
  </div>

</template>

<script>
</script>

<style scoped>
.hover-controller{
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
}

.window{

}

</style>
