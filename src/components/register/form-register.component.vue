<template>
  <div class="container flex flex-column justify-content-center">
    <div class="container-form flex flex-column gap-4 w-4.2 align-self-center p-5">
      <h2 class="flex justify-content-center">Registro</h2>

      <div class="flex flex-column gap-1">
        <div class="grid grid-cols-2 justify-content-center gap-8">
          <div class="flex align-items-center">
            <pv-radiobutton v-model="formData.account" inputId="account1" name="chambeador" value="chambeador" required/>
            <label for="account1" class="ml-2">Chambeador</label>
          </div>
          <div class="flex align-items-center">
            <pv-radiobutton v-model="formData.account" inputId="account2" name="worker" value="worker" />
            <label for="account2" class="ml-2">Empleador</label>
          </div>

        </div>
      </div>

      <div class="flex gap-2">
        <div class="flex flex-column gap-1">
          <label for="name">Nombre</label>
          <pv-input
            id="name"
            v-model="formData.name"
            placeholder="Name"
          />
        </div>
        <div class="flex flex-column gap-1">
          <label for="lastname">Apellido</label>
          <pv-input
            id="lastname"
            v-model="formData.lastname"
            aria-describedby="username-help"
            placeholder="Lastname"
            required
          />
        </div>
      </div>

      <div class="flex flex-column gap-1">
        <label for="phone">Celular</label>
        <pv-input
          id="phone"
          v-model="formData.phone"
          aria-describedby="username-help"
          placeholder="Phone Number"
          required
        />
      </div>

      <div class="card flex justify-content-center flex-column gap-1">
        <label for="calendar">Fecha de Nacimiento</label>
        <pv-calendar
          id="calendar"
          v-model="formData.date"
          showIcon
          required
          placeholder="Select a date"
        />
      </div>

      <div class="flex flex-column gap-1">
        <label for="email">Correo</label>
        <pv-input
          id="email"
          v-model="formData.email"
          aria-describedby="email-help"
          placeholder="Email"
          @input="validateEmail(formData.email)"
          required
        />
      </div>

      <div class="flex flex-column gap-1">
        <label for="password">Contraseña</label>
        <pv-password
          class="w-100%"
          id="password"
          v-model="formData.password"
          :feedback="false"
          @input="validatePassword(formData.password)"
          required
          placeholder="*********"
        />
      </div>

      <div class="flex flex-column gap-1">
        <div class="grid grid-cols-2 justify-content-center gap-8">
          <div class="flex align-items-center">
            <pv-radiobutton v-model="formData.gender" inputId="gender1" name="female" value="female" />
            <label for="gender1" class="ml-2">Mujer</label>
          </div>
          <div class="flex align-items-center">
            <pv-radiobutton v-model="formData.gender" inputId="gender2" name="male" value="male" />
            <label for="gender2" class="ml-2">Hombre</label>
          </div>
        </div>
      </div>

      <div class="align-self-center">
        <pv-button @click="redirectToHome()">Registro</pv-button>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from 'vue';

export default {
  methods: {
    redirectToHome() {
      this.$router.push('/home');
    },
  },
  name: 'FormRegister',
  setup() {
    const formData = reactive({
      gender: '',
      account: '',
      name: '',
      lastname: '',
      date: null,
      email: '',
      password: '',
      phone: '',
      document: '',
    });

    const gender = ref('');
    const account = ref('');
    const errorMessage = ref(null);
    

    const validateEmail = (email) => {
      const regex = /\S+@\S+\.\S+/;
      if (!regex.test(email)) {
        errorMessage.value = 'Invalid email';
      } else {
        errorMessage.value = '';
      }
    };

    const validatePassword = (password) => {
      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
      if (!regex.test(password)) {
        errorMessage.value = 'Invalid password';
      } else {
        errorMessage.value = '';
      }
    };


    const submitForm = () => {
      console.log('Form Data', formData);
      this.$router.push('/home');
    };

    const setIsCandidate = (isCandidate) => {
      formData.isCandidate = isCandidate;
    };

    return {
      formData,
      validateEmail,
      validatePassword,
      submitForm,
      setIsCandidate,
      gender,
      account,
      errorMessage
    };
  },
};
</script>

<style scoped>

</style>