<template>
  <div class="form-container">
    <form @submit.prevent="publishPost">
      <input class="form-input" v-model="post.title" type="text" placeholder="Title">
      <input class="form-input" v-model="post.description" type="text" placeholder="Description">
      <input class="form-input" v-model="post.subtitle" type="text" placeholder="Subtitle">
      <input class="form-input" v-model="post.imgUrl" type="text" placeholder="Image URL">
      <img :src="post.imgUrl" alt="Image preview" class="image-preview">
      <button class="form-button" type="submit">Publish</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import PublishPostService from "@/services/publish-post.service";
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

export default {
  name: 'PostComponent',

  setup() {
    const post = ref({
      title: '',
      description: '',
      subtitle: '',
      imgUrl: ''
    });

    const publishPostService = new PublishPostService();

    const userToken = Cookies.get('userToken');
    let userId;
    if (userToken) {
      const decodedToken = jwtDecode(userToken);
      userId = decodedToken.sub;
    }

    const publishPost = async () => {
      try {
        const response = await publishPostService.postPublishByEmployerId(userId, post.value, userToken);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    };

    return { post, publishPost };
  },
};
</script>

<style lang="scss" scoped>
.form-container {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.form-input {
  display: block;
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-button {
  display: block;
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.image-preview {
  width: 100%;
  max-height: 300px;
  object-fit: cover;
  margin-bottom: 10px;
}
</style>