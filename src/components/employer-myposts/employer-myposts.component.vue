<script>
import employerPostService from "@/services/employer-post.service";
import EmployerPostService from "@/services/employer-post.service";
export default {
  name: "employer-myposts",
  data() {
    return {
      posts: [],
      userRole:this.userRole,
      employerId: '1'
    };
  },
  methods: {
    viewPost(postId) {
      this.$router.push(`/posts/${postId}`);
    },
  },
  async mounted() {
    try {
      if(this.userRole === 'worker'){
        const response = await new EmployerPostService().getAll();
        this.posts = response.data;
      }
      if(this.userRole === 'employer'){
        const response = await new EmployerPostService().getByEmployerId(this.employerId);
        this.posts = response.data;
      }
    } catch (error) {

    }
  },
};
</script>

<template>
  <div>
  <h1 v-if="this.userRole === 'employer'" class="posts-title" style="text-align: center;">{{$t("myPosts")}}</h1>
  <h1 v-if="this.userRole === 'worker'" class="posts-title" style="text-align: center;">{{$t("jobs")}}</h1>
  <div class="container-champ">
    <pv-card v-for="(post, index) in posts" :key="index" class="example-card">
      <template #header>
        <div class="p-card-image">
          <img alt="user photo" :src="post.postImgUrl" />
        </div>
      </template>

      <template #title>
        <div class="title">
          <span>{{ post.postTitle}}</span>
        </div>
      </template>

      <template #subtitle>
        <span>{{post.postSubtitle}}</span>
      </template>

      <template #content>
        <div class="p-card-content">
          <p>{{ post.postDescription }}</p>
        </div>
      </template>

      <template #footer>
        <div class="p-card-actions">
          <pv-button @click="viewPost(post.id)" class="card-button" style="width: 80%;">
            <p v-if="this.userRole === 'employer'">
              {{$t("viewPost")}}
            </p>
            <p v-if="this.userRole === 'worker'">
              {{$t("apply")}}
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

.example-card{
  width: 300px;
  margin: 10px;
}

.p-card-content{
  height: 300px;
  text-align: center;
}

.title{
height: 50px;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  margin: 0 auto;
  width: 100%;
  max-width: 1200px;
}

.posts-title{
  margin: 0 auto;
  width: 100%;
  max-width: 1200px;
  text-align: center;
  font-size: 35px;
  font-weight: bold;
  margin-bottom: 20px;
}

</style>