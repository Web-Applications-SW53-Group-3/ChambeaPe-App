<script>
export default {
  data() {
    return {
      newPassword: "",
      confirmPassword: "",
      requestLoginOnAllDevices: false,
      showPassword: false,
    };
  },
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    submitPassword() {
      this.$emit("password-submitted");
    },
  },
};
</script>

<template>
  <div class="new-password" style="width: 15em">
    <div class="title">Escoge otra contraseña</div>
    <div class="subtitle">
      Para proteger tu cuenta, elige una contraseña segura que no hayas usado antes y que tenga al menos 8 caracteres
    </div>
    <button class="transparent-button color-text">¿Cómo debe ser una contraseña segura?</button>
    <div class="p-inputgroup">
      <span class="p-inputgroup-addon">
        <i class="pi pi-lock" style="margin-right: 0.5rem;"></i>
      </span>
      <input v-if="!showPassword" type="password" v-model="newPassword" class="p-inputtext p-inputtext-large" placeholder="Contraseña nueva" />
      <input v-else type="text" v-model="newPassword" class="p-inputtext p-inputtext-large" placeholder="Contraseña nueva" />
      <button class="transparent-button show-button" @click="togglePasswordVisibility">{{ showPassword ? 'Ocultar' : 'Mostrar' }}</button>
    </div>
    <div class="p-inputgroup">
      <span class="p-inputgroup-addon">
        <i class="pi pi-lock" style="margin-right: 0.5rem;"></i>
      </span>
      <input type="password" v-model="confirmPassword" class="p-inputtext p-inputtext-large" placeholder="Vuelve a escribir tu contraseña" />
    </div>
    <div class="text">
      <input type="checkbox" v-model="requestLoginOnAllDevices" />
      Solicitar que todos los dispositivos inicien sesión con la nueva contraseña
    </div>
    <button class="p-button large-button" style="margin-top: 1rem;" @click="submitPassword">Enviar</button>
  </div>
</template>

<style scoped>
.new-password {
  margin: 0 auto;
  padding: 2rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background-color: white;
  font-size: 1.5rem;
  text-align: center;
}

.title {
  color: black;
  font-weight: bold;
  font-size: 1.8rem;
}

.subtitle {
  margin-top: 1rem;
  font-size: 1.2rem;
}

.transparent-button {
  background-color: transparent;
  border: none;
  font-size: 1rem;
  cursor: pointer;
}

.color-text {
  color: orange;
}

.p-inputgroup {
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.p-inputtext {
  width: 100%;
  padding: 1rem;
  font-size: 1.2rem;
}

.show-button {
  margin-left: 1rem;
}

.text {
  margin-top: 1rem;
  font-size: 1rem;
}
.large-button {
  width: 100%;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  justify-content: center;
  border: none;
}

</style>