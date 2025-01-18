<template>
  <v-card @click="$emit('click')" class="cursor-pointer">
    <v-img :src="video.thumbnail" height="200px"></v-img>
    <v-card-title>{{ video.title }}</v-card-title>
  </v-card>
</template>

<script>
export default {
  props: ['video'],
};
</script>
