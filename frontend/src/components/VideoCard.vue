<template>
  <v-card @click="$emit('click')" class="cursor-pointer rounded-lg card_container">
    <v-img :src="video.thumbnail" height="160px"></v-img>
    <v-card-title>{{ video.title }}</v-card-title>
  </v-card>
</template>

<script>
export default {
  props: ['video'],
};
</script>

<style scoped>
  .card_container {
    padding: 16px 4px;
  }

</style>
