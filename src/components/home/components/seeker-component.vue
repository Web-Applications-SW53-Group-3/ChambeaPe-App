<script setup>
import { ref, onMounted } from 'vue';
import WorkerProfileService from "@/services/worker-profile.service";

const postId = 2;
const employer = ref({
  name: '',
  description: '',
  image: '',
});

onMounted(async () => {
  try {
    const workerService = new WorkerProfileService();
    const response = await workerService.getAll(postId);
    if (response.status === 200 && response.data) {
      const firstEmployer = response.data[0];
      if (firstEmployer) {
        employer.value = firstEmployer;
      } else {
        console.error('No se encontraron empleadores en la respuesta.');
      }
    } else {
      console.error('Error en la respuesta de la solicitud HTTP.');
    }
  } catch (error) {
    console.error('Error al obtener al empleador:', error);
  }
});
</script>

<template>
  <div class="SearchContainer">
    <div class="SearchHeader">
      <div class="SearchBar">
        <i class="pi pi-search SearchIcon"></i>
        <input type="text" class="SearchInput" placeholder="Buscar..." />
      </div>
      <div class="SearchActions">
        <span class="RecentSearches">Últimas Búsquedas</span>
        <button class="EditButton">Editar</button>
      </div>
    </div>
    <div class="SearchResult">
      <div class="Availability">DISPONIBLE</div>
      <div class="UserInfo">
        <img :src="employer.image" alt="Imagen de usuario" class="UserImage" />
        <div class="UserName">{{ employer.name }}</div>
        <div class="UserDescription">{{ employer.description }}</div>
      </div>
      <div class="UserActions">
        <p-button class="p-button ViewProfileButton" >Ver Perfil</p-button>
        <p-button class="p-button ChatButton">Chatear</p-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.SearchContainer {
  width: 80%;
  margin: 0 auto;
  background-color: white;
  padding: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  
  @media (min-width: 768px) {
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
  font-size: 1.5rem;
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
  border: none;
  color: orange;
  cursor: pointer;
  font-size: 1.2rem;
}

.SearchResult {
  padding: 2rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background-color: white;
  font-size: 1.5rem;
  @media (min-width: 768px) {
    grid-column: 1 / span 2;
  }
}

.Availability {
  font-weight: 700;
  color: green;
  font-size: 1.2rem;
  text-align: center;
}

.UserInfo {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
  text-align: center;
}

.UserImage {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 1rem;
}

.UserName {
  font-weight: bold;
  font-size: 1.5rem;
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
  width: 10rem;
  border: none;
  border-radius: 5px;
  justify-content: center;
  border: none;
  font-size: 1rem;
  cursor: pointer;
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
