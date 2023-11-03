<script setup>
import { ref, onMounted } from 'vue';
import WorkerProfileService from "@/services/worker-profile.service";

const employer = ref({
  name: '',
  description: '',
  image: '',
});

onMounted(async () => {
  try {
    const workerService = new WorkerProfileService();
    const response = await workerService.getAllWorker();
    if (response.status === 200 && response.data) {
      const firstEmployer = response.data[0];
      if (firstEmployer) {
        employer.value = firstEmployer;
      } else {

      }
    } else {

    }
  } catch (error) {

  }
});
</script>

<template>
  <div class="SearchContainer">
    <div class="SearchHeader">
      <div class="SearchBar">
        <i class="pi pi-search SearchIcon"></i>
        <input type="text" class="SearchInput" :placeholder="$t('cancel')" />
      </div>
      <div class="SearchActions">
        <span class="RecentSearches">{{$t("lastSearch")}}</span>
        <pv-button class="EditButton">{{$t("btnEdit")}}</pv-button>
      </div>
    </div>
    <div class="SearchResult">
      <div class="Availability">{{$t("statusOn")}}</div>
      <div class="UserInfo">
        <img :src="employer.profilePic" alt="Imagen de usuario" class="UserImage" />
        <div class="UserName">{{ employer.firstName }} {{ employer.lastName }} </div>
        <div class="UserDescription">{{ employer.description }}</div>
      </div>
      <div class="UserActions">
        <p-button class="p-button ViewProfileButton">{{$t("btnViewProfile")}}</p-button>
        <p-button class="p-button ChatButton">{{$t("btnChat")}}</p-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.SearchContainer {
  width: 100%;
  margin: 0 auto;
  background-color: white;
  padding: 1rem;
  border-radius: 8px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  
  @media (min-width: 768px) {
    width: 50%;
    grid-template-columns: 1fr;
  }
}

.SearchHeader {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.SearchBar {
  display: flex;
  align-items: center;
  background-color: #f0f0f0;
  border-radius: 4px;
  padding: 1rem;
}

.SearchIcon {
  font-size: 1rem;
  margin-right: 0.5rem;
}

.SearchInput {
  border: none;
  outline: none;
  background: none;
  width: 100%;
  font-size: 1rem;

  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
}

.SearchActions {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
}

.RecentSearches {
  margin-right: 1rem;
}

.EditButton {
  background-color: transparent;
  border: 1px solid #f2af4a;
  cursor: pointer;
  font-size: 1rem;
  color: #f2af4a;

  @media (min-width: 768px) {
    font-size: 1.2rem;
  }
}

.SearchResult {
  padding: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background-color: white;
  font-size: 1rem;

  @media (min-width: 768px) {
    padding: 2rem;
    grid-column: 1 / span 2;
  }
}

.Availability {
  font-weight: 700;
  color: green;
  font-size: 1rem;
  text-align: center;

  @media (min-width: 768px) {
    font-size: 1.2rem;
  }
}

.UserInfo {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
  text-align: center;
}

.UserImage {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    width: 80px;
    height: 80px;
  }
}

.UserName {
  font-weight: bold;
  font-size: 1.2rem;

  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
}

.UserDescription {
  margin-top: 0.5rem;
}

.UserActions {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0.5rem;
  gap: 1rem;
}

.ViewProfileButton,
.ChatButton {
  display: flex;
  align-items: center;
  width: 100%;
  border: none;
  border-radius: 5px;
  justify-content: center;
  border: none;
  font-size: 0.8rem;
  cursor: pointer;

  &:hover{
    opacity: 0.8;
  }

  @media (min-width: 768px) {
    width: 10rem;
    font-size: 1rem;
  }
}

.ChatButton {
  margin-left: 0;
}

@media (min-width: 768px) {
  .SearchResult {
    width: auto;
  }
}
</style>