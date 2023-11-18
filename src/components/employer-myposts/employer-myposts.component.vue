<script>
import { ref, onMounted } from 'vue';
import EmployerPostService from "@/services/employer-post.service";
import PublishPostService from "@/services/publish-post.service";

export default {
  setup() {
    const posts = ref([]);

    onMounted(async () => {
      try {
        const postService = new PublishPostService();
        const response = await postService.getAllPublish();
        posts.value = response.data;
        console.log(posts.value);
      } catch (error) {
        console.log(error);
      }
    });

    return {
      posts,
    };
  },
  methods: {
    viewPost(postId) {
      this.$router.push({path:'/posts/'+postId});
    },
  },
};
</script>

<template>
  <div>
    <h1 v-if="this.userRole === 'employer'" class="posts-title" style="text-align: center;">{{ $t("myPosts") }}</h1>
    <h1 v-if="this.userRole === 'worker'" class="posts-title" style="text-align: center;">{{ $t("jobs") }}</h1>
    <div class="container-champ">
      <pv-card v-for="post in posts" :key="post.postId" class="example-card">
        <template #header>
          <div class="p-card-image">
            <img alt="user photo" :src="post.imgUrl" />
          </div>
        </template>
        <template #title>
          <div class="title">
            <span>{{ post.title }}</span>
          </div>
        </template>
        <template #subtitle>
          <span>{{ post.subtitle }}</span>
        </template>
        <template #content>
          <div class="p-card-content">
            <p>{{ post.description }}</p>
          </div>
        </template>
        
        <template #footer>
          <div class="p-card-actions">
            <pv-button @click="viewPost(post.postId)" class="card-button" style="width: 80%;">
              <p v-if="this.userRole === 'employer'">
                {{ $t("viewPost") }}
              </p>
              <p v-if="this.userRole === 'worker'">
                {{ $t("apply") }}
              </p>
            </pv-button>
          </div>
        </template>
      </pv-card>
    </div>
  </div>
</template>

<style scoped>
.container-champ {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  width: 100%;
  max-width: 1200px;
  text-align: center;
}

.card-button {
  margin: 0 auto;
  width: 100%;
  justify-content: center;
}

.p-card-image img {
  width: 300px;
  height: 200px;
  object-fit: cover;
}

.example-card {
  width: 300px;
  margin: 10px;
}

.p-card-content {
  height: 300px;
  text-align: center;
}

.title {
  height: 50px;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  margin: 0 auto;
  width: 100%;
  max-width: 1200px;
}

.posts-title {
  margin: 0 auto;
  width: 100%;
  max-width: 1200px;
  text-align: center;
  font-size: 35px;
  font-weight: bold;
  margin-bottom: 20px;
}
</style>