<script>
import WorkerProfileService from "@/services/worker-profile.service";
import {ref} from "vue";

export default {
  name: "worker-profile",
  data() {
    return {
      postId: this.$route.query.postId,
      workerId: this.$route.params.id,
      worker: '',
      isWorker:true
    };
  },
  methods: {
    capitalized(str) {
      const capitalizedFirst = str[0].toUpperCase();
      const rest = str.slice(1);
      return capitalizedFirst + rest;
    }
  },
  async mounted() {
    try {
      const response = await new WorkerProfileService().getByid(this.workerId, this.postId);
      this.worker = response.data;
    } catch (error) {

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
    <img class="circular-image" :src="worker.image" alt="Profile Image">
    <div v-if="isWorker" class="settings-icon">
      <i class="pi pi-spin pi-cog gear-icon"></i>
    </div>

    <div class="status">
      <h6 v-if="worker.status">{{$t("statusOn")}} <i class="pi pi-check-circle available"></i></h6>
      <h6 v-else>{{$t("statusOff")}} <i class="pi pi-ban not-available"></i></h6>
    </div>

    <h1 class="worker-name">{{worker.name}}</h1>

    <pv-button class="button"><p>{{$t('btnConect')}}</p></pv-button>


    <div class="description-container">
      <h4 class="subtitle" aria-label="Description">{{$t("description")}}</h4>
      <p class="worker-description">
        {{worker.description}}
      </p>
    </div>

    <div class="skills-container">
      <h4 class="subtitle" aria-label="Habilidades">{{$t("skills")}}</h4>
      <pv-button class="skill-button" v-for="(skill, index) in worker.skills" :key="index">
        {{ capitalized(skill)}}
      </pv-button>
    </div>

    <div class="portfolio-container">
      <h4 class="subtitle" aria-label="Portafolio">{{$t("portfolio")}}</h4>
      <div class="carousel-container">
        <pv-carousel class="carousel" :circular="true" :autoplay-interval="3000" :value="worker.portfolio" :numVisible="1" :responsiveOptions="responsiveOptions">
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
      <h4 class="subtitle" aria-label="Certificados">{{$t("certificates")}}</h4>
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
              <pv-button class="certificate-button">{{$t("viewCertificate")}}</pv-button>
            </div>
          </template>
        </pv-card>
      </div>
      <pv-button>{{$t("viewMore")}}</pv-button>
    </div>

    <div class="reviews">
      <h4 class="subtitle" aria-label="Comentarios">{{$t("reviews")}}</h4>
      <div class="review-card-container">
        <pv-card v-for="(review, index) in worker.reviews" :key="index" class="review-card" style="width: 25em">
          <template #header>
            <img  class="employer-photo" alt="Foto del empleador" :src="review.employerPhoto" />
          </template>
          <template #title> {{review.employerName}}</template>
          <template #content>
            <p>
              {{review.description}}
            </p>
          </template>
          <template #footer>
            <pv-rating v-model="review.rating" :readonly="true" :cancel="false" class="rating-stars"/>
          </template>
        </pv-card>
      </div>
    </div>
    <pv-button>{{$t("viewMore")}}</pv-button>
    <router-link to="/reviews">
      <pv-button style="margin-left: 1rem;">Publicar reseña</pv-button>
    </router-link>
  </div>

</template>

<style scoped>

.profile-container{
  text-align: center;
}

.circular-image {
  border-radius: 50%;
}

.settings-icon{
  position: absolute;
  right: 0;
  top: 5rem;
}

.gear-icon{
  font-size: 1.8rem;
  margin-top: 1rem;
  margin-right: 1rem;
  color: #f1a636;
  cursor: pointer;
}

.status{
  font-size: 1.5rem;
  margin-top:0.5rem;
  margin-bottom: 0.5rem;
}

.not-available{
  color: red;
  font-weight: bold;
}

.available{
  color: green;
  font-weight: bold;
}

.worker-name{
  font-size: 2rem;
  font-weight: bold;
  margin-bottom:1rem;
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
  margin-bottom:1rem;
}

.subtitle{
  font-weight: bold;
  margin-bottom:0.5rem;
}

.description-container{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 1rem;
}

.worker-description{
  margin-left: 2rem;
  margin-right: 2rem;
  max-width: 600px;
}

.skills-container{
  margin-bottom: 1rem;
}

.skills-container .skill-button{
  border: 1px solid #f1a636;
  color:#f1a636;
  border-radius: 1rem;
  padding: 15px;
  margin-right: 0.8rem;
  margin-bottom: 1rem;
  background-color:transparent;
  height: 2.2rem;
}

.portfolio-container{
  margin-bottom: 1rem;
}

.carousel-container{
  display: flex;
  justify-content: center;
  align-items: center;
}

.carousel{
  width: 550px;
}

.certificates-container{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.certificate-card-container, .review-card-container {
  max-width: 700px;
}

.certificate-card, .review-card {
  max-width: 300px;
  margin-bottom: 1.5rem;
  margin-top: 1.5rem;
}

.certificate-card img {
  display: block;
  width: 80%;
}

.img-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  margin-right: 16px;
  height: 250px;
}

.certificate-button {
  width: 150px;
  margin-top: 1rem;
}

.certificate-name{
  font-size: 1rem;
  font-weight: 600;
}


.reviews{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top:1rem;
}

.employer-photo{
  border-radius: 3rem;
  width: 100px;
  height: 100px;
  margin-top:1rem;
}

.rating-stars{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.add-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

</style>