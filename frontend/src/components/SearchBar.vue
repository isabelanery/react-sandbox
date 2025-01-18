<template>
  <v-text-field v-model="search" label="Pesquisar vídeos" prepend-inner-icon="mdi-magnify"></v-text-field>
</template>

<script>
export default {
  props: ['modelValue'],
  computed: {
    search: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit('update:modelValue', value);
      },
    },
  },
};
</script>
