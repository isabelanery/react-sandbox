<template>
  <v-container class="fill-height d-flex flex-column align-center justify-center">
    <v-icon size="100" color="primary">mdi-alert-circle-outline</v-icon>
    <h1 class="text-h4 mt-4">404 - Página não encontrada</h1>
    <p class="text-body-1">Parece que esta página não existe.</p>

    <v-btn
      class="mt-4"
      color="primary"
      @click="goHome"
    >
      {{ buttonText }}
    </v-btn>
  </v-container>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { authenticationToken } from '../services/login';

const isAuthenticated = authenticationToken();

const buttonText = computed(() => isAuthenticated ? 'Voltar para Home' : 'Ir para Login')

const router = useRouter();

const goHome = () => {
  if (isAuthenticated) {
    router.push('/home')
  } else {
    router.push('/')
  }
}
</script>
