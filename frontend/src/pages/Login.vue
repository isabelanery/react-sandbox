<template>
  <v-container>
    <v-card class="mx-auto pa-6 rounded-lg" min-width="400">
      <v-card-title class="text-center">LOGIN</v-card-title>
      <v-card-subtitle class="text-center">
        Insira seu email e senha para continuar
      </v-card-subtitle>
      <v-card-text>
        <v-text-field
          v-model="email"
          label="Email"
          outlined
          required
          type="email"
          :error-messages="emailError"
          @blur="validateEmail"
        />
        <v-text-field
          v-model="password"
          label="Senha"
          outlined
          required
          type="password"
          :error-messages="errorMessage"
          @keyup.enter="login"
        />
      </v-card-text>
      <v-card-actions>
        <v-btn
          block
          color="primary"
          size="large"
          rounded="lg"
          variant="flat"
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
import { authenticationToken, loginUser, saveSession } from "../services/login";

export default {
  data() {
    return {
      email: "",
      password: "",
      loading: false,
      errorMessage: "",
      emailError: "",
    };
  },
  beforeMount() {
    const isAuthenticated = authenticationToken();
    if (isAuthenticated) {
      this.$router.push("/home");
    }
  },
  methods: {
    isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },
    validateEmail() {
      if (!this.isValidEmail(this.email)) {
        this.emailError = "Por favor, insira um email válido!";
      } else {
        this.emailError = "";
      }
    },
    isFormValid() {
      return this.email.trim() !== '' && this.password.trim() !== '' && !this.emailError;
    },
    async login() {
      this.errorMessage = "";
      this.emailError = "";

      if (!this.email.trim() || !this.password.trim()) {
        this.errorMessage = "Email e senha são obrigatórios!";
        return;
      }

      this.loading = true;

      try {
        const response = await loginUser(this.email, this.password);
        if (response.token) {
          saveSession(response.token);
          this.$router.push("/home");
        }
      } catch (error) {
        this.errorMessage = "Erro ao realizar o login. Tente novamente.";
      }

      this.loading = false;
    },
  },
};
</script>
