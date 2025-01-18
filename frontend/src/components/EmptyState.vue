<template>
  <v-container class="text-center">
    <v-icon size="50">mdi-alert-circle-outline</v-icon>
    <p>{{ message }}</p>
  </v-container>
</template>

<script>
export default {
  props: { message: String },
};
</script>
