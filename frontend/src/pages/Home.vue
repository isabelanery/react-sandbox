<template>
  <v-btn @click="logout" text class="mb-8">Logout</v-btn>

  <v-container width="800px" class="mt-6">
    <SearchBar v-model="searchQuery" />

    <div v-if="isLoading" width="800px" class="mt-16 centered-loading">
      <v-progress-circular indeterminate size="50" color="primary" class="d-flex justify-center mt-4"></v-progress-circular>
    </div>

    <div v-else>
      <div class="mt-4">
        <v-chip
          v-for="folder in folders"
          :key="folder.id"
          :color="selectedFolder === folder.id ? 'primary' : ''"
          :variant="selectedFolder === folder.id ? 'flat' : 'tonal'"
          @click="filterByFolder(folder.id)"
          class="mr-2"
        >
          {{ folder.name }} ({{ folder.videoCount }})
        </v-chip>
      </div>

      <v-row class="mt-8">
        <v-col v-for="video in filteredVideos" :key="video.id" cols="12" md="4">
          <VideoCard :video="video" @click="openVideo(video.id)" />
        </v-col>
      </v-row>
    </div>


    <EmptyState v-if="!isLoading && filteredVideos.length === 0" message="Nenhum vídeo encontrado." />
  </v-container>
</template>

<script>
import SearchBar from '../components/SearchBar.vue';
import VideoCard from '../components/VideoCard.vue';
import EmptyState from '../components/EmptyState.vue';
import { deleteApiKey, fecthVideosListData, getApiKey, getFolders } from '../api';

export default {
  components: { SearchBar, VideoCard, EmptyState },
  data() {
    return {
      apiKey: '',
      videos: [],
      folders: [],
      selectedFolder: null,
      searchQuery: '',
      isLoading: false,
    };
  },
  computed: {
    filteredVideos() {
      return this.videos.filter(video => {
        const matchesSearch = video.title.toLowerCase().includes(this.searchQuery.toLowerCase());
        const matchesFolder = this.selectedFolder ? video.folder_id === this.selectedFolder : true;

        return matchesSearch && matchesFolder;
      });
    },
  },
  methods: {
    async fetchData() {
      this.isLoading = true;

      try {
        const data = await fecthVideosListData(this.apiKey);
        this.videos = data.videos || [];
        this.folders = await getFolders(this.apiKey) || [];

        this.isLoading = false;
      } catch (error) {
        console.error("Erro ao buscar dados da API:", error);
        this.$router.push('/');
      }
    },
    filterByFolder(folderId) {
      this.selectedFolder = this.selectedFolder === folderId ? null : folderId;
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
  async mounted() {
    this.apiKey = getApiKey() || '';

    if (this.apiKey) {
      await this.fetchData();
    }
  },
};
</script>

<style>
.centered-loading {
  display: flex;
  justify-content: center;
}
</style>
