<script>
import EmployerPostService from "@/services/employer-post.service";
import WorkerProfileService from "@/services/worker-profile.service";

export default {
  name: "user-list.component",
  data() {
    return {
      post: {
        id: 0,
        postTitle: "",
        postDescription: "",
        postSubtitle: "",
        postImgUrl: "",
        workers: [],
      },
      editMode: false
    };
  },
  async mounted() {
    try {
      const postId = this.$route.params.id;
      const response = await new EmployerPostService().getByid(postId);
      this.post = response.data;
    } catch (error) {

    }
  },
  methods: {
    viewPost(workerId) {
      const postId = this.$route.params.id;
      this.$router.push({path:'/worker/'+workerId,query:{postId: postId}});
    },
    async saveChanges() {
      try {
        const postId = this.$route.params.id;
        const response = await new EmployerPostService().update(postId, this.post);
        this.editMode = false;
      } catch (error) {

      }

    },
    disableEditMode(){
      this.editMode = false;
    },
    async deletePost(){
      const postId = this.$route.params.id;
      new EmployerPostService().delete(postId);
      await new EmployerPostService().getAll();
      this.$router.push('/posts');
    },
    deleteWorker(workerId){
      let postId = this.$route.params.id;
      new WorkerProfileService().delete(workerId,postId);
      this.post.workers = this.post.workers.filter(worker => worker.id !== workerId);
    }
  },
  watch: {
    $route: {
      async handler() {
        const postId = this.$route.params.id;
        const response = await new EmployerPostService().getByid(postId);
        this.post = response.data;
      },
      immediate: true,
    },
  },
};
</script>

<template>

  <pv-card class="post-card">
    <template #header >
      <pv-input-text  class="edit" v-if="editMode" type="text" v-model="post.postImgUrl" :placeholder="$t('placeUrlImage')">
      </pv-input-text>
      <img v-if="editMode" class="prev-image" :src="post.postImgUrl" alt="Post Image">
      <img v-else class="post-image" :src="post.postImgUrl" alt="Post Image">
    </template>
    <template #title>
      <pv-input-text class="edit"  v-if="editMode" type="text" v-model="post.postTitle" :placeholder="$t('placeTitle')"></pv-input-text>
      <h1 v-else class="title">{{post.postTitle}}</h1>
    </template>
    <template #subtitle>
      <pv-input-text class="edit"  v-if="editMode" type="text" v-model="post.postSubtitle" :placeholder="$t('placeSubtitule')"></pv-input-text>
      <h3 v-else>{{post.postSubtitle}}</h3>
    </template>
    <template #content>
      <pv-textarea class="edit"  v-if="editMode" v-model="post.postDescription" :placeholder="$t('placeDescriptionPost')" rows="7" autoResize ></pv-textarea>
      <p v-else>
        {{post.postDescription}}
      </p>
    </template>
    <template #footer>
      <pv-button v-if="editMode" icon="pi pi-check" :label="$t('btnEdit')" @click="saveChanges"/>
      <pv-button v-if="editMode" icon="pi pi-times" :label="$t('cancel')" @click="disableEditMode()" severity="secondary" style="margin-left: 0.5em" />
      <pv-button v-else icon="pi pi-check" :label="$t('btnEdit')" @click="editMode = true"/>
      <pv-button v-if="!editMode" icon="pi pi-times" :label="$t('btnDelete')" @click="deletePost()" severity="secondary" style="margin-left: 0.5em" />
    </template>
  </pv-card>

  <h1 class="title">Chambeadores</h1>
  <div class="container-champ">
    <pv-card v-for="(worker, index) in post.workers" :key="index" class="example-card">
      <template #header>
        <div class="p-card-image">
          <img alt="user photo" :src="worker.image" />
        </div>
      </template>

      <template #title>
        <span>{{ worker.name }}</span>
        <span class="p-card-subtitle" v-if="worker.status">{{$t('statusOn')}}</span>
        <span class="p-card-subtitle" v-if="!worker.status">{{$t('statusOff')}}</span>
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
  </div>

</template>

<style scoped>
@import url(../../assets/css/employer-post.css);

.post-card{
  width: 60%;
  margin: 0 auto;
  padding: 2rem;
  display: flex;  
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  text-align: center;

}

.p-card-image{
  padding-top: 2rem;
}
.post-image{
  width: 12rem;
  height: 12rem;
  object-fit: cover;
}
.prev-image{
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

.edit {
  width: 50rem;
}
</style>