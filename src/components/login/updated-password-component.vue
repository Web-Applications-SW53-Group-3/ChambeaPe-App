<script>
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();

    const redirectToHome = () => {
      router.push('/home');
    };

    return {
      redirectToHome,
    };
  },
};
</script>

<template>
  <div class="updated-password" style="width: 15em">
    <div class="title">{{ $t("changePasswordSuccess") }}</div>
    <img src="https://cdn.discordapp.com/attachments/1037343952694685706/1155673854576971869/Group_110.png" alt="Imagen" class="card-image" />
    <button @click="redirectToHome" class="p-button large-button">{{ $t("goToChambea") }}</button>
    <div class="verification-box">
      <pv-button class="transparent-button orange-text"  :label="$t('activate2FA')"></pv-button>
      <div class="verification-text">
        {{ $t("text2FA") }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.updated-password {
  text-align: center;
  margin: 0 auto;
  padding: 2rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background-color: white;
  font-size: 1.5rem;
}

.title {
  color: black;
  font-weight: bold;
  font-size: 1.8rem;
  margin-bottom: 1rem;
}

.card-image {
  width: 100%;
  max-height: 300px;
  object-fit: cover;
  margin-bottom: 1rem;
}

.large-button {
  width: 100%;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  justify-content: center;
  border: none;
  margin-bottom: 1rem;
}

.verification-box {
  background-color: #f4f4f4;
  padding: 1rem;
  border-radius: 5px;
}

.transparent-button {
  background-color: transparent;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  color: orange;
}

.verification-text {
  font-size: 1rem;
  margin-top: 1rem;
}
</style>