<script>
import { ref, onMounted } from 'vue';
import EmployerPostService from "@/services/employer-post.service";
import PublishPostService from "@/services/publish-post.service";
import JwtService from "@/services/jwt.service.js";

export default {
  setup() {
    const posts = ref([]);
    const userRole = ref(null);

    onMounted(async () => {
      try {
        const jwtService = new JwtService();
        userRole.value = jwtService.getRole();
        console.log(userRole.value);

        const postService = new PublishPostService();
        const response = await postService.getAllPublish();
        // const employerId = jwtService.getSub();
        // console.log(employerId);
        // console.log(response.data.length);
        // const filteredPosts = [];

        // for (let i = 0; i < response.data.length; i++) {
        //   if (response.data[i].employerId === employerId) {
        //     filteredPosts.push(response.data[i]);
        //   }
        // }

        // console.log(filteredPosts);
        // posts.value = filteredPosts;
        posts.value = response.data;
        console.log(posts.value);
      } catch (error) {
        console.log(error);
      }
    });

    return {
      posts,
      userRole,
    };
  },
  methods: {
    viewPost(postId) {
      this.$router.push({ path: '/posts/' + postId });
    },
  },
};
</script>

<template>
  <div>
    <h1 v-if="userRole === 'E'" class="posts-title" style="text-align: center;">{{ $t("myPosts") }}</h1>
    <h1 v-if="userRole === 'W'" class="posts-title" style="text-align: center;">{{ $t("jobs") }}</h1>
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
              <p v-if="userRole === 'E'">
                {{ $t("viewPost") }}
              </p>
              <p v-if="userRole === 'W'">
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