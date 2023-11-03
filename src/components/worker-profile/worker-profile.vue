<script>
import WorkerProfileService from "@/services/worker-profile.service";
import EmployerPostService from "@/services/employer-post.service";
import { ref } from "vue";

export default {
  name: "worker-profile",
  data() {
    return {
      workerId: this.$route.params.id,
      worker: '',
      employer: [],
      isWorker: true
    };
  },
  methods: {

  },
  async mounted() {
    try {
      const response = await new WorkerProfileService().getWorkerById(this.workerId);
      this.worker = response.data;

      for (let review of this.worker.reviews) {
        const employerResponse = await new EmployerPostService().getEmployerById(review.employerId);
        review.employerData = employerResponse.data;
      }
    } catch (error) {
      console.error(error);
    }
  },
};
const responsiveOptions = ref([
  {
    breakpoint: '1199px',
    numVisible: 1
  },
  {
    breakpoint: '991px',
    numVisible: 1
  },
  {
    breakpoint: '767px',
    numVisible: 1
  }
]);
</script>

<template>
  <div class="profile-container">
    <img class="circular-image" :src="worker.profilePic" alt="Profile Image">
    <div v-if="isWorker" class="settings-icon">
      <i class="pi pi-spin pi-cog gear-icon"></i>
    </div>

    <h1 class="worker-name">{{ worker.firstName }} {{ worker.lastName }} </h1>

    <pv-button class="button">
      <p>{{ $t('btnConect') }}</p>
    </pv-button>


    <div class="description-container">
      <h4 class="subtitle" aria-label="Description">{{ $t("description") }}</h4>
      <p class="worker-description">
        {{ worker.description }}
      </p>
    </div>

    <div class="skills-container">
      <h4 class="subtitle" aria-label="Habilidades">{{ $t("skills") }}</h4>
      <pv-button class="skill-button" v-for="(skill, index) in worker.skills" :key="index">
        {{ skill.content }}
      </pv-button>
    </div>

    <div class="portfolio-container">
      <h4 class="subtitle" aria-label="Portafolio">{{ $t("portfolio") }}</h4>
      <div class="carousel-container">
        <pv-carousel class="carousel" :circular="true" :autoplay-interval="3000" :value="worker.portfolio" :numVisible="1"
          :responsiveOptions="responsiveOptions">
          <template #item="image">
            <div class="images-container">
              <div class="mb-3">
                <img :src="image.data" alt="Portfolio Image" class="w-25rem shadow-2 border-round-2xl" />
              </div>
            </div>
          </template>
        </pv-carousel>
      </div>
    </div>

    <div class="certificates-container">
      <h4 class="subtitle" aria-label="Certificados">{{ $t("certificates") }}</h4>
      <div v-if="isWorker" class="add-icon">
        <i class="pi pi-plus-circle gear-icon"></i>
      </div>
      <div class="certificate-card-container">
        <pv-card v-for="(certificate, index) in worker.certificates" :key="index" class="certificate-card">
          <template #header>
            <div class="img-container">
              <img class="certificate-image" :src="certificate.imgUrl" alt="">
            </div>
          </template>
          <template #title>
            <p class="certificate-name">{{ certificate.certificateName }}</p>
          </template>
          <template #content>
            <div class="certificate-description">
              <p>{{ certificate.institutionName }}</p>
              <pv-button class="certificate-button">{{ $t("viewCertificate") }}</pv-button>
            </div>
          </template>
        </pv-card>
      </div>
      <pv-button>{{ $t("viewMore") }}</pv-button>
    </div>

    <div class="reviews">
      <h4 class="subtitle" aria-label="Comentarios">{{ $t("reviews") }}</h4>
      <div class="review-card-container">
        <pv-card v-for="(review, index) in worker.reviews" :key="index" class="review-card" style="width: 25em">
          <template #header>
            <img v-if="review.employerData" class="employer-photo" alt="Foto del empleador"
              :src="review.employerData.profilePic">
          </template>
          <template #title>
            <span v-if="review.employerData">{{ review.employerData.firstName }} {{ review.employerData.lastName }}</span>
          </template>
          <template #content>
            <p>
              {{ review.description }}
            </p>
          </template>
        </pv-card>
      </div>
    </div>
    <pv-button>{{ $t("viewMore") }}</pv-button>
    <router-link to="/reviews">
      <pv-button style="margin-left: 1rem;">Publicar reseña</pv-button>
    </router-link>
  </div>
</template>

<style scoped>
.profile-container {
  text-align: center;
  max-width: 900px;
  margin: 0 auto;
  padding: 0 1rem;
  width: 100%;
}

.circular-image {
  border-radius: 50%;
  width: 100px;
  height: 100px;
}

.settings-icon, .add-icon {
  position: absolute;
  right: 1rem;
  top: 1rem;
  font-size: 1.5rem;
  cursor: pointer;
}

.gear-icon {
  color: #f1a636;
}

.worker-name {
  font-size: 2rem;
  margin: 1rem 0;
}

.button {
  width: 6.25rem;
  height: 2.5rem;
  border-radius: 0.5rem;
  font-size: 1rem;
  margin-bottom: 1rem;
  text-align: center;
}

.subtitle {
  font-size: 1.5rem;
  margin: 1rem 0;
}

.description-container, .skills-container, .portfolio-container, .certificates-container, .reviews {
  margin-bottom: 2rem;
}



.worker-description {
  max-width: 600px;
  margin: 0 auto;
}

.skill-button {
  border: 1px solid #f1a636;
  color: #f1a636;
  border-radius: 1rem;
  padding: 0.5rem;
  margin: 0.5rem;
  background-color: transparent;
  text-align: center;
}

.carousel {
  max-width: 550px;
  margin: 0 auto;
}

.certificate-card-container, .review-card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.certificate-card-container {
  justify-content: space-around;
  gap : 1rem;
}

.certificate-card, .review-card {
  max-width: 300px;
  margin: 1rem;
}

.certificate-card img {
  width: 80%;
  margin: 0 auto;
}

.certificate-button {
  width: 9.375rem;
  margin-top: 1rem;
  justify-content: center;

}

.employer-photo {
  border-radius: 50%;
  width: 100px;
  height: 100px;
}

@media (max-width: 768px) {
  .circular-image {
    width: 80px;
    height: 80px;
  }

  .worker-name {
    font-size: 1.5rem;
  }

  .subtitle {
    font-size: 1.2rem;
  }

  .worker-description {
    max-width: 100%;
  }

  .carousel {
    max-width: 100%;
  }

  .certificate-card, .review-card {
    max-width: 100%;
  }

  .certificate-card img {
    width: 100%;
  }

  .employer-photo {
    width: 80px;
    height: 80px;
  }
}
</style>