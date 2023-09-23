<script>

export default {
  data() {
    return {
      dr_gallery: [{
        'filename': 'Filename1',
        'url': 'https://picsum.photos/200',
        'accessibility': '0',
        'gridWidth': '1'
      },
        {
          'filename': 'Filename2',
          'url': 'https://picsum.photos/400/200',
          'accessibility': '0',
          'gridWidth': '2'
        },
        {
          'filename': 'Filename1',
          'url': 'https://picsum.photos/200',
          'accessibility': '0',
          'gridWidth': '1'
        },
        {
          'filename': 'Filename2',
          'url': 'https://picsum.photos/400/200',
          'accessibility': '0',
          'gridWidth': '2'
        },
        {
          'filename': 'Filename1',
          'url': 'https://picsum.photos/400',
          'accessibility': '0',
          'gridWidth': '1'
        },
        {
          'filename': 'Filename2',
          'url': 'https://picsum.photos/400/200',
          'accessibility': '0',
          'gridWidth': '2'
        },
        {
          'filename': 'Filename1',
          'url': 'https://picsum.photos/400',
          'accessibility': '0',
          'gridWidth': '1'
        },
        {
          'filename': 'Filename2',
          'url': 'https://picsum.photos/400/200',
          'accessibility': '0',
          'gridWidth': '2'
        },
        {
          'filename': 'Filename1',
          'url': 'https://picsum.photos/200',
          'accessibility': '0',
          'gridWidth': '1'
        },
        {
          'filename': 'Filename2',
          'url': 'https://picsum.photos/400/200',
          'accessibility': '0',
          'gridWidth': '2'
        },
        {
          'filename': 'Filename1',
          'url': 'https://picsum.photos/400',
          'accessibility': '0',
          'gridWidth': '1'
        },
        {
          'filename': 'Filename2',
          'url': 'https://picsum.photos/400/300',
          'accessibility': '0',
          'gridWidth': '2'
        },
        {
          'filename': 'Filename1',
          'url': 'https://picsum.photos/400',
          'accessibility': '0',
          'gridWidth': '1'
        },
        {
          'filename': 'Filename2',
          'url': 'https://picsum.photos/400/200',
          'accessibility': '0',
          'gridWidth': '2'
        }
      ]
    }

  }
}

</script>

<template>


  <v-container fluid>
    <v-row>
      <v-col
          v-for="e in dr_gallery"
          class="d-flex child-flex"
          :cols="e.gridWidth"
      >
        <v-card elevation="5">
          <v-img
              cover
              height="100%"
              :aspect-ratio="e.gridWidth"
              :src="e.url"
              class="align-end">
            <v-card-title>{{e.filename}}</v-card-title>
          </v-img>

        </v-card>
      </v-col>
    </v-row>

  </v-container>

</template>

<style scoped>

</style>
