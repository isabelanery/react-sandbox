<template>
  <v-container width="670px">
    <div class="button_container">
      <v-btn class="mb-8" @click="goHome" text>Voltar para Home</v-btn>
    </div>

    <v-alert v-if="error" type="error" class="mb-4">
      {{ error }}
    </v-alert>


    <div v-if="isLoading" class="loading_container">
      <v-progress-circular
        indeterminate
        size="50"
        color="primary"
        class="d-flex justify-center mt-4"
      ></v-progress-circular>
    </div>

    <v-card v-if="video && !error" class="rounded-lg p-4">
      <v-card-text>
        <iframe
          v-if="video.video_player"
          :src="video.video_player"
          width="600px"
          height="400"
          frameborder="0"
          allowfullscreen
        ></iframe>
        <v-alert v-else type="warning">O vídeo ainda não está disponível.</v-alert>
      </v-card-text>

      <v-card-title class="d-flex align-center">
        <template v-if="isEditing">
          <v-text-field
            v-model="editedTitle"
            label="Editar título"
            dense
            outlined
            hide-details
            class="mr-2"
          ></v-text-field>
          <div class="gap">
            <v-btn color="success" icon @click="saveTitle">
              <v-icon icon="mdi-check"></v-icon>
            </v-btn>
            <v-btn color="error" icon @click="cancelEdit">
              <v-icon icon="mdi-close"></v-icon>
            </v-btn>
          </div>
        </template>

        <template v-else>
          <div class="title-wrapper gap">
            <p class="text-overflow">
              {{ video.title || "Vídeo sem título" }}
            </p>
            <v-btn color="primary" icon class="ml-2" @click="startEdit">
              <v-icon icon="mdi-pencil" ></v-icon>

            </v-btn>
          </div>
        </template>
      </v-card-title>

      <v-card-text>
        <p><strong>Descrição:</strong> {{ video.description || "Sem descrição disponível" }}</p>
        <p><strong>Duração:</strong> {{ formatLength(video.length) }}</p>
        <p><strong>Resoluções:</strong> {{ video.playback?.join(", ") || "N/A" }}</p>
        <p><strong>Data de Criação:</strong> {{ formatDate(video.created_at) }}</p>
      </v-card-text>
    </v-card>

    <v-alert v-if="saveError" type="error" class="mt-2">
      {{ saveError }}
    </v-alert>
  </v-container>
</template>

<script>
import { getVideoData, updateVideoTitle } from "../services/api";
import { authenticationToken } from "../services/login";

export default {
  data() {
    return {
      jwtToken: '',
      videoId: '',
      video: null,
      isLoading: true,
      error: null,
      isEditing: false,
      editedTitle: "",
      saveError: null,
    };
  },
  methods: {
    async fetchVideo() {
      this.isLoading = true;

      try {
        const videoData = await getVideoData(this.jwtToken, this.videoId);
        if (!videoData || !videoData.id) {
          throw new Error("Vídeo não encontrado ou ID inválido.");
        }

        this.video = videoData;
        this.error = null;
      } catch (err) {
        this.error = err.message || "Não foi possível carregar os dados do vídeo.";
      }
      this.isLoading = false;
    },
    startEdit() {
      this.editedTitle = this.video.title;
      this.isEditing = true;
      this.saveError = null;
    },
    cancelEdit() {
      this.isEditing = false;
      this.saveError = null;
    },
    async saveTitle() {
      if (!this.editedTitle.trim()) {
        this.saveError = "O título não pode estar vazio.";
        return;
      }
      try {
        const success = await updateVideoTitle(this.jwtToken, this.videoId, this.editedTitle);
        if (success) {
          this.video.title = this.editedTitle;
          this.isEditing = false;
        }
      } catch (err) {
        this.saveError = "Falha ao salvar o título. Tente novamente.";
      }
    },
    goHome() {
      this.$router.push("/home");
    },
    formatDate(dateString) {
      if (!dateString) return "N/A";
      return new Date(dateString).toLocaleDateString("pt-BR", {
        day: "2-digit", month: "2-digit", year: "numeric",
      });
    },
    formatLength(seconds) {
      if (!seconds) return "N/A";
      const minutes = Math.floor(seconds / 60);
      const sec = Math.floor(seconds % 60);
      return `${minutes}m ${sec}s`;
    },
  },
  created() {
    this.jwtToken = authenticationToken();
    this.videoId = this.$route.params.videoId;

    if (!this.jwtToken || !this.videoId) {
      this.error = "Erro: ID do vídeo inválido.";
      return;
    }
  },
  async mounted() {
    if (this.jwtToken && this.videoId) {
      await this.fetchVideo();
    }
  },
};
</script>

<style scoped>
.v-container {
  max-width: 800px;
}

.title-wrapper {
  display: flex;
  width: 100%;
  padding: 4px;
  max-width: 600px;
  justify-content: space-between;
  align-items: center;
  height: 56px;
  font-size: 28px;
}

.gap {
  display: flex;
  gap: 8px;
}

.text-overflow {
  overflow: hidden;
  text-overflow: ellipsis;
}

.loading_container {
  width: 100%;
  height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.p-4 {
  padding: 4px;
}
</style>
