<template>
  <v-btn @click="logout" text class="mb-8">Logout</v-btn>

  <v-container width="800px" class="mt-6">
    <SearchBar v-model="searchQuery" />

    <div class="videos-container">
      <div v-if="videos.length > 0">
        <div class="mt-4">
          <v-chip
            :color="selectedFolder === null ? 'primary' : ''"
            :variant="selectedFolder === null ? 'flat' : 'tonal'"
            @click="clearFolderFilter"
            class="mr-2"
          >
            Todos ({{ totalVideos }})
          </v-chip>

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

      <div v-if="isLoading || (currentPage < totalPages)" width="800px" class="mt-16 centered-loading">
        <v-progress-circular indeterminate size="50" color="primary" class="d-flex justify-center mt-4"></v-progress-circular>
      </div>
    </div>

    <EmptyState v-if="!isLoading && filteredVideos.length === 0" message="Nenhum vídeo encontrado." />
  </v-container>
</template>

<script>
import SearchBar from '../components/SearchBar.vue';
import VideoCard from '../components/VideoCard.vue';
import EmptyState from '../components/EmptyState.vue';
import { deleteApiKey, fetchVideosListData, getApiKey, getFolders } from '../api';

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
      currentPage: 1,
      totalPages: 1,
      totalVideos: 0,
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
    async fetchVideos() {
      this.isLoading = true;

      try {
        const data = await fetchVideosListData(this.apiKey, this.currentPage);

        this.videos = [...this.videos, ...data.videos];
        this.isLoading = false;
        this.totalPages = data.pages || 1;
        this.totalVideos = data.total || 1;
      } catch (error) {
        console.error("Erro ao buscar videos:", error);
        this.$router.push('/');
      }
    },
    async fetchFolders() {
      this.isLoading = true;

      try {
        this.folders = await getFolders(this.apiKey) || [];
        this.isLoading = false;
      } catch (error) {
        console.error("Erro ao buscar pastas:", error);
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
    onScroll() {
      const bottom = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight) === window.innerHeight + window.scrollY;
      if (bottom && !this.isLoading && this.currentPage < this.totalPages) {
        this.currentPage++;
        this.fetchVideos();
      }
    },
    clearFolderFilter() {
      this.selectedFolder = null;
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
      await this.fetchFolders();
      await this.fetchVideos();
    }

    window.addEventListener('scroll', this.onScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll);
  },
};
</script>

<style>
.centered-loading {
  display: flex;
  justify-content: center;
}

.videos-container {
  min-height: 80vh;
}
</style>
