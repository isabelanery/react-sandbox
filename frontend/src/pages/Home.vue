<template>
  <v-btn @click="logout" text class="mb-8">Logout</v-btn>

  <v-container width="800px" class="mt-6">
    <SearchBar v-model="searchQuery" />
    <v-row>
      <v-col v-for="video in filteredVideos" :key="video.id" cols="12" md="4">
        <VideoCard :video="video" @click="openVideo(video.id)" />
      </v-col>
    </v-row>
    <EmptyState v-if="filteredVideos.length === 0" message="Nenhum vídeo encontrado." />
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
      try {
        const data = await fecthVideosListData(this.apiKey);
        this.videos = data.videos || [];
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
