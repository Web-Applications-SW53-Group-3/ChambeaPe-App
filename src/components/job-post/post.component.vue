<template>
  <div class="form-container" v-if="userRole === 'E'">
    <form @submit.prevent="publishPost">
      <input class="form-input" v-model="post.title" type="text" :placeholder="$t('title')">
      <input class="form-input" v-model="post.description" type="text" :placeholder="$t('description')">
      <input class="form-input" v-model="post.subtitle" type="text" :placeholder="$t('subtitle')">
      <input class="form-input" v-model="post.imgUrl" type="text" :placeholder="$t('imageURL')">
      <img :src="post.imgUrl || image" class="image-preview" alt="Image preview">
      <button class="form-button" type="submit"> {{ $t('publish') }} </button>
    </form>
  </div>
  <div class="container-worker" v-if="userRole === 'W'" >
    Aqui va el componente de trabajador
  </div>
</template>

<script>
import { ref } from 'vue';
import PublishPostService from "@/services/publish-post.service";

import JwtService from "@/services/jwt.service.js";

export default {
  name: 'PostComponent',
  
  setup() {
    const post = ref({
      title: '',
      description: '',
      subtitle: '',
      imgUrl: ''
    });
    
    const image  = "https://cdn.discordapp.com/attachments/1142626084358193254/1176479214539649074/image.png?ex=656f04a6&is=655c8fa6&hm=fa88615ff30a26799a3fb05d405e205434c733d3ccbbb6239fe1064c3be8d6e9&"

    const publishPostService = new PublishPostService();

    const jwtService = new JwtService();

    const userRole = jwtService.getRole();

    let userId = jwtService.getSub();

    const publishPost = async () => {
      try {
        const response = await publishPostService.postPublishByEmployerId(userId, post.value);
        router.push('/home');
      } catch (error) {
      }
    };

    return { post, publishPost, image, userRole };
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