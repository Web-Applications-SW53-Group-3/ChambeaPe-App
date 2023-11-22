<script>
import WorkerProfileService from "@/services/worker-profile.service";
import PublishPostService from "@/services/publish-post.service";
import PostulationService from "@/services/postulation.service.js";

import JwtService from "@/services/jwt.service.js";

export default {
  name: "user-list.component",
  data() {
    return {
      post: {
        id: 0,
        title: "",
        description: "",
        subtitle: "",
        imgUrl: ""
      },
      editMode: false,
      userRole: null,
      workers: [],
      workersData: [],
    };

  },
  async mounted() {
    try {
      const jwtService = new JwtService();
      this.userRole = jwtService.getRole();
      const postId = this.$route.params.id;

      if (this.userRole === 'W') {
        await this.fetchWorkersData(postId);
      } else if (this.userRole === 'E') {
        const response = await new PublishPostService().getPublishById(postId);
        this.post = response.data;
      }
    } catch (error) {
    }
  },
  methods: {
    viewPost(workerId) {
      const postId = this.$route.params.id;
      this.$router.push({ path: '/worker/' + workerId, query: { postId: postId } });
    },
    async saveChanges() {
      try {
        const postId = this.$route.params.id;
        const response = await new PublishPostService().putPublishById(postId, this.post);
        this.editMode = false;
      } catch (error) {

      }
    },
    async deletePost() {
      const postId = this.$route.params.id;
      await new PublishPostService().deletePublishById(postId);
      this.$router.push('/posts');
    },
    disableEditMode() {
      this.editMode = false;
    },
    deleteWorker(workerId) {
      let postId = this.$route.params.id;
      new PostulationService().deletePostulationById(workerId);
    },
    async fetchWorkersData(postId) {
    const postulationService = new PostulationService();
    this.workers = await postulationService.getPostsPostulations(postId);
    this.workersData = [];
    for (let i = 0; i < this.workers.data.length; i++) {
      const workerData = await new WorkerProfileService().getWorkerById(this.workers.data[i].workerId);
      this.workersData.push(workerData.data);
    }
  },
  },
};
</script>

<template>
  <pv-card class="post-card">
    <template #header>
      <pv-input-text class="edit" v-if="editMode" type="text" v-model="post.imgUrl" :placeholder="$t('placeUrlImage')">
      </pv-input-text>
      <img v-if="editMode" class="prev-image" :src="post.imgUrl" alt="Post Image">
      <img v-else class="post-image" :src="post.imgUrl" alt="Post Image">
    </template>
    <template #title>
      <pv-input-text class="edit" v-if="editMode" type="text" v-model="post.title"
        :placeholder="$t('placeTitle')"></pv-input-text>
      <h1 v-else class="title">{{ post.title }}</h1>
    </template>
    <template #subtitle>
      <pv-input-text class="edit" v-if="editMode" type="text" v-model="post.subtitle"
        :placeholder="$t('placeSubtitule')"></pv-input-text>
      <h3 v-else>{{ post.subtitle }}</h3>
    </template>
    <template #content>
      <pv-textarea class="edit" v-if="editMode" v-model="post.description" :placeholder="$t('placeDescriptionPost')"
        rows="7" autoResize></pv-textarea>
      <p v-else>
        {{ post.description }}
      </p>
    </template>
    <template #footer>
      <div class="p-card-footer">
        <pv-button v-if="editMode" icon="pi pi-check" :label="$t('btnEdit')" @click="saveChanges" />
        <pv-button v-if="editMode" icon="pi pi-times" :label="$t('cancel')" @click="disableEditMode()"
          severity="secondary" />
        <pv-button v-else icon="pi pi-check" :label="$t('btnEdit')" @click="editMode = true" />
        <pv-button v-if="!editMode" icon="pi pi-times" :label="$t('btnDelete')" @click="deletePost()"
          severity="secondary" />
      </div>
    </template>
  </pv-card>

  <h1 class="title"> {{ $t('chambeadores') }} </h1>
  <div class="container-champ">
    <pv-card v-for="(worker, index) in workersData" :key="index" class="example-card">
      <!-- Cambia post.workers a workersData aquí -->
      <template #header>
        <div class="p-card-image">
          <img alt="user photo" :src="worker.profilePic" />
        </div>
      </template>

      <template #title>
        <span>{{ worker.name }}</span>
        <span class="p-card-subtitle" v-if="worker.status">{{ $t('statusOn') }}</span>
        <span class="p-card-subtitle" v-if="!worker.status">{{ $t('statusOff') }}</span>
      </template>

      <template #content>
        <div class="p-card-content">
          <p>{{ worker.description }}</p>
        </div>
      </template>

      <template #footer>
        <div class="p-card-actions">
          <pv-button @click="viewPost(worker.id)" :label="$t('btnProfile')" class="card-button" style="width: 80%;" />
          <pv-button :label="$t('btnChat')" class="card-button" style="width: 80%;" />
          <pv-button @click="deleteWorker(worker.id)" :label="$t('btnDelete')" class="card-button" style="width: 80%;" />
        </div>
      </template>
    </pv-card>
    <div v-if="workers.length === 0"> {{ $t('existChambeador') }} </div>
  </div>
</template>

<style scoped>
@import url(../../assets/css/employer-post.css);

.post-card {
  width: 60%;
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  text-align: center;

}

.p-card-image {
  padding-top: 2rem;
}

.post-image {
  width: 12rem;
  height: 12rem;
  object-fit: cover;
}

.prev-image {
  display: block;
  margin: 1rem auto;
  width: 12rem;
  height: 12rem;
  object-fit: cover;
}

.p-card-actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.p-card-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.p-card-footer {
  display: flex !important;
  flex-wrap: wrap !important;
  justify-content: center !important;
  gap: 1rem;
}

.edit {
  width: 50rem;
}
</style>