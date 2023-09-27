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
      console.log(this.post);
    } catch (error) {
      console.error("Error al cargar los datos:", error);
    }
  },
  methods: {
    viewPost(workerId) {
      const postId = this.$route.params.id;
      this.$router.push({path:'/worker/'+workerId,query:{postId: postId}});
    },
    async saveChanges() {
      try {
        const response = await new EmployerPostService().update(this.post);
        console.log(response.data);
        this.editMode = false;
      } catch (error) {
        console.error("Error al guardar los cambios:", error);
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

  <pv-card class="post-card" style="width: 25em">
    <template #header>
      <pv-input-text v-if="editMode" type="text" v-model="post.postImgUrl" placeholder="URL de la imagen"></pv-input-text>
      <img v-else class="post-image" :src="post.postImgUrl" alt="Post Image">
    </template>
    <template #title>
      <pv-input-text v-if="editMode" type="text" v-model="post.postTitle" placeholder="Título del post"></pv-input-text>
      <h1 v-else class="title">{{post.postTitle}}</h1>
    </template>
    <template #subtitle>
      <pv-input-text v-if="editMode" type="text" v-model="post.postSubtitle" placeholder="Subtítulo del post"></pv-input-text>
      <h3 v-else>{{post.postSubtitle}}</h3>
    </template>
    <template #content>
      <pv-textarea v-if="editMode" v-model="post.postDescription" placeholder="Descripción del post"></pv-textarea>
      <p v-else>
        {{post.postDescription}}
      </p>
    </template>
    <template #footer>
      <pv-button v-if="editMode" icon="pi pi-check" label="Guardar" @click="saveChanges"/>
      <pv-button v-if="editMode" icon="pi pi-times" label="Cancelar" @click="disableEditMode()" severity="secondary" style="margin-left: 0.5em" />
      <pv-button v-else icon="pi pi-check" label="Editar" @click="editMode = true"/>
      <pv-button v-if="!editMode" icon="pi pi-times" label="Eliminar" @click="deletePost()" severity="secondary" style="margin-left: 0.5em" />
    </template>
  </pv-card>

  <br>
  <h1 class="title">Chambeadores</h1>
  <br>
  <div class="container-champ">
    <pv-card v-for="(worker, index) in post.workers" :key="index" class="example-card">
      <template #header>
        <div class="p-card-image">
          <img alt="user photo" :src="worker.image" />
        </div>
      </template>

      <template #title>
        <span>{{ worker.name }}</span>
        <span class="p-card-subtitle" v-if="worker.status">Disponible</span>
        <span class="p-card-subtitle" v-if="!worker.status">No Disponible</span>
      </template>

      <template #content>
        <div class="p-card-content">
          <p>{{ worker.description }}</p>
        </div>
      </template>

      <template #footer>
        <div class="p-card-actions">
          <pv-button @click="viewPost(worker.id)" label="Ver perfil" class="card-button" style="width: 80%;" />
          <pv-button label="Chatear" class="card-button" style="width: 80%;" />
          <pv-button @click="deleteWorker(worker.id)" label="Eliminar" class="card-button" style="width: 80%;" />
        </div>
      </template>
    </pv-card>
  </div>

</template>

<style scoped>
@import url(../../assets/css/employer-post.css);
.post-image{
  width: 400px;
  heigth: 300px;
}
</style>