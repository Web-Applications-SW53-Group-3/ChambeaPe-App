<script setup>
import { ref, onMounted } from 'vue';
import WorkerProfileService from "@/services/worker-profile.service";

const postId = 6;
const topEmployers = ref([]);

onMounted(async () => {
  try {
    const workerService = new WorkerProfileService();
    const response = await workerService.getAll(postId);
    const firstSixEmployers = response.data.slice(0, 6);

    topEmployers.value = firstSixEmployers;
  } catch (error) {
    console.error('Error al obtener la lista de empleadores:', error);
  }
});
</script>

<template>
  <div class="TopWorkers">
    <h2 class="TopWorkersTitle">Top Empleadores</h2>
    <div class="TopWorkersImages">
      <div class="TopWorker" v-for="(worker, index) in topEmployers" :key="index">
        <img :src="worker.image" :alt="worker.name" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.TopWorkers {
  background-color: white;
  padding: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
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
  width: 100%;
  height: auto;
  border-radius: 8px;
}
</style>

