<script>
import WorkerProfileService from "@/services/worker-profile.service";
export default {
  name: "worker-profile",
  data() {
    return {
      postId: this.$route.query.postId,
      workerId: this.$route.params.id,
      worker: ''
    };
  },
  methods: {

  },
  async mounted() {
    try {
      const response = await new WorkerProfileService().getByid(this.workerId, this.postId);
      console.log(response.data);
      this.worker = response.data;
    } catch (error) {
      console.error("Error al cargar el perfil:", error);
    }
  },
};
</script>

<template>

  <div class="profile-container">
    <br>
    <img class="circular-image" :src="worker.image" alt="Profile Image">
    <h1>{{worker.name}}</h1>
    <p>{{worker.status}}</p>
    <br>
    <pv-button class="button">{{$t('btnConect')}}</pv-button>
    <br>
    <h6 style="font-weight: bold"></h6>
    <p>{{worker.description}}</p>
  </div>
</template>

<style scoped>

.profile-container{
  text-align: center;
}

.circular-image {
  border-radius: 50%;
}

.button {
  width: 15.5rem;
  height: 2.5rem;
  border-radius: 0.5rem;
  color: #fff;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.5rem;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

</style>