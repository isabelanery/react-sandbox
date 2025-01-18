<template>
  <v-container>
    <v-card class="mx-auto pa-6" min-width="400">
      <v-card-title class="text-center">Login</v-card-title>
      <v-card-subtitle class="text-center">
        Insira sua API Key para continuar
      </v-card-subtitle>
      <v-card-text>
        <v-text-field
          v-model="apiKey"
          label="API Key"
          outlined
          required
          :error-messages="errorMessage"
        />
      </v-card-text>
      <v-card-actions>
        <v-btn
          block
          color="primary"
          :loading="loading"
          @click="login"
          :disabled="!isFormValid()"
        >
          Entrar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>

import { validateApiKey } from "../api";

export default {
  data() {
    return {
      apiKey: "",
      loading: false,
      errorMessage: ""
    };
  },
  methods: {
    isFormValid() {
      return this.apiKey.trim() !== '';
    },
    async login() {
      if (!this.apiKey.trim()) {
        this.errorMessage = "A API Key é obrigatória!";
        return;
      }

      this.loading = true;
      this.errorMessage = "";

      const isValid = await validateApiKey(this.apiKey);

      if (isValid) {
        localStorage.setItem("apiKey", this.apiKey);
        this.$router.push("/home");
      } else {
        this.errorMessage = "API Key inválida. Verifique e tente novamente.";
      }

      this.loading = false;
    },

  }
};
</script>
