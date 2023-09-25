<script>
import EmployerPostService from "@/services/employer-post.service";

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
      }
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
  <div class="post-container">
    <h1 class="title">{{post.postTitle}}</h1>
    <br>
    <img :src="post.postImgUrl" alt="Post Image">
    <br>
    <h2>Descripción</h2>
    <br>
    <p class="post-subtitle">Área aproximada: 50m2</p>
    <br>
    <p>
      {{post.postDescription}}
    </p>
  </div>

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
          <pv-button label="Ver perfil" class="card-button" style="width: 80%;" />
          <pv-button label="Chatear" class="card-button" style="width: 80%;" />
        </div>
      </template>
    </pv-card>
  </div>

</template>

<style scoped>
@import url(../../assets/css/employer-post.css);
</style>