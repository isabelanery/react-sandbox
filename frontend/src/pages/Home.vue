<template>
  <v-btn @click="logout" text class="mb-8">Logout</v-btn>

  <v-container width="800px" class="mt-6">
    <SearchBar v-model="searchQuery" />

    <div width="800px" class="mt-16 centered-loading" v-if="isLoading">
      <v-progress-circular
        indeterminate
        size="50"
        color="primary"
        class="d-flex justify-center mt-4"
      ></v-progress-circular>
    </div>

    <v-row v-else>
      <v-col v-for="video in filteredVideos" :key="video.id" cols="12" md="4">
        <VideoCard :video="video" @click="openVideo(video.id)" />
      </v-col>
    </v-row>

    <EmptyState v-if="!isLoading && filteredVideos.length === 0" message="Nenhum vídeo encontrado." />
  </v-container>
</template>

<script>
import SearchBar from '../components/SearchBar.vue';
import VideoCard from '../components/VideoCard.vue';
import EmptyState from '../components/EmptyState.vue';
import { deleteApiKey, fecthVideosListData, getApiKey } from '../api';

export default {
  components: { SearchBar, VideoCard, EmptyState },
  data() {
    return {
      apiKey: '',
      videos: [],
      searchQuery: '',
      isLoading: false,
    };
  },
  computed: {
    filteredVideos() {
      return this.videos.filter(video =>
        video.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  methods: {
    async fetchVideos() {
      this.isLoading = true;

      try {
        const data = await fecthVideosListData(this.apiKey);
        this.videos = data.videos || [];
        this.isLoading = false;
      } catch (error) {
        console.error("Erro ao buscar vídeos:", error);
        this.$router.push('/');
        return;
      }
    },
    openVideo(id) {
      this.$router.push(`/video/${id}`);
    },
    logout() {
      this.apiKey = '';
      deleteApiKey();
      this.$router.push('/');
    },
  },
  created() {
    const apiKey = getApiKey();
    if (!apiKey) {
      this.$router.push('/');
    }
  },
  mounted() {
    this.apiKey = getApiKey() || '';

    if (this.apiKey) this.fetchVideos();
  },
};
</script>

<style>
  .centered-loading {
    display: flex;
    justify-content: center;
  }
</style>
