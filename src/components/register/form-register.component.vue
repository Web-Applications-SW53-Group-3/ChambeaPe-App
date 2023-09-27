<template>
  <div class="container flex flex-column justify-content-center">
    <div class="container-form flex flex-column gap-4 w-4.2 align-self-center p-5">
      <h2 class="flex justify-content-center">Register</h2>

      <div class="flex flex-column gap-1">
        <div class="grid grid-cols-2 justify-content-center gap-8">
          <pv-button
            :selected="formData.selectedRole === 'worker'"
            @click="setRole('worker')"
          >
            Worker
          </pv-button>
          <pv-button
            :selected="formData.selectedRole === 'employer'"
            @click="setRole('employer')"
          >
            Employer
          </pv-button>
        </div>
      </div>

      <div class="flex gap-2">
        <div class="flex flex-column gap-1">
          <label for="name">Name</label>
          <pv-input
            id="name"
            v-model="formData.name"
            aria-describedby="username-help"
            placeholder="Name"
            required
          />
        </div>
        <div class="flex flex-column gap-1">
          <label for="lastname">Lastname</label>
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
        <label for="phone">Phone Number</label>
        <pv-input
          id="phone"
          v-model="formData.phone"
          aria-describedby="username-help"
          placeholder="Phone Number"
          required
        />
      </div>

      <div class="card flex justify-content-center flex-column gap-1">
        <label for="calendar">BirthDate</label>
        <pv-calendar
          id="calendar"
          v-model="formData.date"
          showIcon
          required
          placeholder="Select a date"
        />
      </div>

      <div class="flex flex-column gap-1">
        <label for="email">Email</label>
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
        <label for="password">Password</label>
        <pv-password
          class="w-100%"
          id="password"
          v-model="formData.password"
          :feedback="false"
          @input="validatePassword(formData.password)"
          required
          placeholder="password"
        />
      </div>

      <div class="flex flex-column gap-1">
        <label for="gender">Gender</label>
        <div class="grid grid-cols-2 justify-content-center gap-8">
          <pv-button
            :selected="formData.selectedGender === 'female'"
            @click="setGender('female')"
          >
            Female
          </pv-button>
          <pv-button
            :selected="formData.selectedGender === 'male'"
            @click="setGender('male')"
          >
            Male
          </pv-button>
        </div>
      </div>

      <div class="align-self-center">
        <pv-button @click="submitForm">Register</pv-button>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue';

export default {
  name: 'FormRegister',
  setup() {
    const formData = reactive({
      name: '',
      lastname: '',
      date: null,
      email: '',
      password: '',
      phone: '',
      document: '',
      selectedGender: '',
      selectedRole: '',
    });

    const setRole = (role) => {
      formData.selectedRole = role;
    };

    const setGender = (gender) => {
      formData.selectedGender = gender;
    };

    const validateEmail = (email) => {
      // Aquí puedes usar una expresión regular o una librería para validar el formato del email
    };

    const validatePassword = (password) => {
      // Aquí puedes usar una condición o una librería para validar la longitud mínima de la contraseña
    };

    const submitForm = () => {
      console.log('Form Data', formData);

      // Lógica de envío del formulario
    };

    return {
      formData,
      setRole,
      setGender,
      validateEmail,
      validatePassword,
      submitForm,
    };
  },
};
</script>

<style scoped>
/* Estilos específicos del componente ... */
</style>
