<script setup>
import { ref, onMounted } from 'vue';
import EmployerPostService from "@/services/employer-post.service";

const topEmployers = ref([]);

onMounted(async () => {
  try {
    const employerService = new EmployerPostService();
    const response = await employerService.getAllEmployer();
    const firstFourEmployers = response.data.slice(0, 4);

    topEmployers.value = firstFourEmployers;
  } catch (error) {

  }
});
</script>

<template>
  <div class="TopWorkers">
    <h2 class="TopWorkersTitle">{{ $t("topEmployers") }}</h2>
    <div class="TopWorkersImages">
      <div class="TopWorker" v-for="(employer, index) in topEmployers" :key="index">
        <img :src="employer.profilePic" :alt="employer.firstName" />
        <p> {{ employer.firstName }} {{ employer.lastName }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.TopWorkers {
  margin-top: .625rem;
  background-color: white;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
}

.TopWorkersTitle {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.TopWorkersImages {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.TopWorker {
  margin: 0.5rem;
  width: 200px;
}

.TopWorker img {
  width: inherit;
  height: 12.5rem;
  object-fit: cover;
  border-radius: 8px;
}
</style>

