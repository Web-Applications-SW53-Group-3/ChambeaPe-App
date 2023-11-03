<script setup>
import { ref, onMounted } from 'vue';
import WorkerProfileService from "@/services/worker-profile.service";


const topWorkers = ref([]);


onMounted(async () => {
  try {
    
    const workerService = await new WorkerProfileService();
    const response = await workerService.getAllWorker();
    const firstFourWorkers = response.data.slice(0, 4);

    topWorkers.value = firstFourWorkers;

  } catch (error) {

  }
});
</script>

<template>
  <div class="TopWorkers">
    <h2 class="TopWorkersTitle">{{$t("topChambeadores")}}</h2>
    <div class="TopWorkersImages">
      <div class="TopWorker" v-for="(worker, index) in topWorkers" :key="index">
        <img :src="worker.profilePic" :alt="worker.firstName" />
        <p> {{ worker.firstName }} {{ worker.lastName }}</p>

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
