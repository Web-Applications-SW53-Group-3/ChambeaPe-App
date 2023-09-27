<script>
export default {
  data() {
    return {
      email: "",
    };
  },
  methods: {
    resetPassword() {
      this.$emit("reset-password-clicked");
    },
    goBack() {
      this.$emit("back-clicked");
    },
  },
};
</script>
<template>
  <div class="forgot-password" style="width: 15em;">
    <div class="title">¿Has olvidado tu contraseña?</div>
    <div class="subtitle">Restablecer contraseña en dos pasos rápidos</div>
    <div class="p-inputgroup">
      <span class="p-inputgroup-addon">
        <i class="pi pi-envelope" style="margin-right: 0.5rem;"></i>
      </span>
      <input type="text" v-model="email" class="p-inputtext large-input" placeholder="Correo Electrónico o número" />
    </div>
    <div class="footer">
      <pv-button icon="pi pi-check" label="Restablecer Contraseña" @click="resetPassword" class="large-button" />
    </div>
    <div class="footer">
      <pv-button icon="pi pi-arrow-left" label="Cancelar" @click="goBack" class="p-button-secondary small-button" />
    </div>
  </div>
</template>

<style scoped>
.forgot-password {
  text-align: center;
  display: block;
  z-index: 10;
  margin: 0 auto;
  padding: 2rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background-color: #fff;
  font-size: 1.8rem;
}

.title {
  color: black;
  font-weight: bold;
  font-size: 2rem;
}

.subtitle {
  margin-top: 1rem;
  font-size: 1rem;
}

.p-inputgroup {
  margin-bottom: 1rem;
}

.large-input {
  width: 100%;
  padding: 1rem;
  font-size: 1.2rem;
}

.footer {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}

.large-button {
  width: 100%;
  font-size: 1.1rem;
  padding: 0.5rem 1rem;
  border-radius: 5px;
}

.p-button-secondary {
  background-color: transparent;
  color: black;
  border: none;
}

.small-button {
  width: 120px;
  font-size: 1rem;
  border-radius: 5px;
}

</style>