<template>
  <div class="review-container">
    <Card style="width: 400px;">
      <h2 class="review-title">Escribe una reseña</h2>
      <div class="p-field">
        <label for="rating" class="review-label">Calificación:</label>
        <pv-rating
            v-model="rating"
            :cancel="false"
            :icon="iconoEstrella"
            class="review-rating"
        />
      </div>
      <div class="p-field">
        <label for="description" class="review-label">Descripción:</label>
        <textarea v-model="description" id="description" class="review-textarea"></textarea>
      </div>
      <button @click="submitReview" class="review-button">Enviar reseña</button>
    </Card>
  </div>
</template>

<script>
import WorkerProfileService from "@/services/worker-profile.service";

export default {
  data() {
    return {
      rating: 5,
      description: "",
      employerName: "Teresa Durgan",
      employerPhoto: "https://loremflickr.com/640/480",
    };
  },
  methods: {
    iconoEstrella(value) {
      if (value >= 8) {
        return "pi pi-star";
      } else if (value >= 5) {
        return "pi pi-star-half";
      } else {
        return "pi pi-star-o";
      }
    },
    async submitReview() {
      const postId = this.$route.query.postId;
      const workerId = this.$route.params.id;
      const review = {
        rating: this.rating,
        description: this.description,
      };

      try {
        await new WorkerProfileService().createReview(review, workerId, postId);
      } catch (error) {
      }
    },
  },
};
</script>

<style>
.review-container {
  margin-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40vh;
}
.review-title {
  font-size: 1.5rem;
  margin: 1rem 0;
}

.review-label {
  font-size: 1rem;
  margin: 0.5rem 0;
}

.review-rating .pi-star {
  color: #f1a636;
  font-size: 1.5rem;
}

.review-textarea {
  width: 100%;
  height: 100px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 8px;
  font-size: 1rem;
  margin: 0.5rem 0;
}

.review-button {
  background-color: #f1a636;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 1rem;
  margin: 1rem 0;
  cursor: pointer;
}

.review-button:hover {
  background-color: #d48f00;
}

.review-info h3 {
  font-size: 1.2rem;
  margin: 0.5rem 0;
}

.review-info img {
  max-width: 100px;
  border-radius: 50%;
}
</style>