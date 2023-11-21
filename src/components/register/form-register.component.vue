<template>
  <div class="container flex flex-column justify-content-center">
    <div class="container-form flex flex-column gap-4 w-4.2 align-self-center p-5">
      <h2 class="flex justify-content-center">{{$t("tittleRegister")}}</h2>

      <div class="flex flex-column gap-1">
        <div class="grid grid-cols-2 justify-content-center gap-8">
          <div class="flex align-items-center">
            <pv-radiobutton v-model="formData.account" inputId="account1" name="E" value="E" required/>
            <label for="account1" class="ml-2">{{$t("checkEmployer")}}</label>
          </div>
          <div class="flex align-items-center">
            <pv-radiobutton v-model="formData.account" inputId="account2" name="W" value="W" />
            <label for="account2" class="ml-2">{{$t("checkChambeador")}}</label>
          </div>

        </div>
      </div>

      <div class="flex gap-2">
        <div class="flex flex-column gap-1">
          <label for="name">{{$t("inName")}}</label>
          <pv-input
            id="name"
            v-model="formData.name"
            placeholder="Juan"
          />
        </div>
        <div class="flex flex-column gap-1">
          <label for="lastname">{{$t("inLastName")}}</label>
          <pv-input
            id="lastname"
            v-model="formData.lastname"
            aria-describedby="username-help"
            placeholder="Perez"
            required
          />
        </div>
      </div>

      <div class="flex flex-column gap-1">
        <label for="phone">{{$t("inPhone")}}</label>
        <pv-input
          id="phone"
          v-model="formData.phone"
          aria-describedby="username-help"
          placeholder="999XXXXXX"
          required
        />
      </div>
      <div class="flex flex-column gap-1">
        <label for="email">Descripcion</label>
        <pv-textarea
          id="description"
          v-model="formData.description"
          aria-describedby="email-help"
          placeholder="Me considero una persona ..."
          required
        />
      </div>
      <div class="flex flex-column gap-1">
        <label for="email">Foto de Perfil</label>
        <pv-input
          id="picture"
          v-model="formData.picture"
          aria-describedby="email-help"
          placeholder="example@example.com"
          required
        />
      </div>
      <div class="flex flex-column gap-1">
        <label for="email">Ocupacion</label>
        <pv-input
          id="occupation"
          v-model="formData.occupation"
          aria-describedby="email-help"
          placeholder="example@example.com"
          required
        />
      </div>

      <div class="card flex justify-content-center flex-column gap-1">
        <label for="calendar">{{$t("inBirthDate")}}</label>
        <pv-calendar
          id="calendar"
          v-model="formData.date"
          showIcon
          required
          :placeholder="$t('pickDate')"
        />
      </div>

      <div class="flex flex-column gap-1">
        <label for="email">{{$t("inEmail")}}</label>
        <pv-input
          id="email"
          v-model="formData.email"
          aria-describedby="email-help"
          placeholder="example@example.com"
          required
        />
      </div>

      <div class="flex flex-column gap-1">
        <label for="password">{{$t("inPassword")}}</label>
        <pv-password
          class="w-100%"
          id="password"
          v-model="formData.password"
          :feedback="false"

          required
          placeholder="*********"
        />
      </div>

      <div class="flex flex-column gap-1">
        <div class="grid grid-cols-2 justify-content-center gap-8">
          <div class="flex align-items-center">
            <pv-radiobutton v-model="formData.gender" inputId="gender1" name="F" value="F" />
            <label for="gender1" class="ml-2">{{$t("inGenderWoman")}}</label>
          </div>
          <div class="flex align-items-center">
            <pv-radiobutton v-model="formData.gender" inputId="gender2" name="M" value="M" />
            <label for="gender2" class="ml-2">{{$t("inGenderMan")}}</label>
          </div>
        </div>
      </div>

      <div class="align-self-center">
        <pv-toast ref="toastRef" />
        <pv-button :disabled="isRegistrationEnabled" @click="registerUser()">{{$t("btnRegister")}}</pv-button>
      </div>
      </div>
  </div>
</template>

<script>
import { reactive } from 'vue';
import EmployerService from '@/services/employer.service.js';
import WorkerProfileService from '@/services/worker-profile.service.js';
import { useToast } from 'primevue/usetoast';

export default {
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
      description: '',
      picture: '',
      occupation: '',
    });

    const toast = useToast();

    const showSuccess = () => {
      toast.add({ severity: 'success', summary: 'Success', detail: 'User registered successfully', life: 3000 });
    };

    const isRegistrationEnabled = () => {
      const requiredFields = [
        formData.name,
        formData.lastname,
        formData.phone,
        formData.description,
        formData.picture,
        formData.occupation,
        formData.date,
        formData.email,
        formData.gender,
        formData.account
      ];

      return requiredFields.every(field => !!field);
    };
    const validateEmail = () => {
      const regex = /\S+@\S+\.\S+/;
      if (!regex.test(formData.email)) {
      } else {
      }
    };

    const registerUser = async () => {
      const data = {
        firstName: formData.name,
        lastName: formData.lastname,
        email: formData.email,
        phoneNumber: formData.phone,
        description: formData.description,
        birthdate: formData.date,
        password: formData.password,
        occupation: formData.occupation,
        gender: formData.gender,
        userRole: formData.account,
        profilePic: formData.picture
      };


      try {
        if (data.userRole === 'W') {
          await new WorkerProfileService().postWorker(data);
        } else if (data.userRole === 'E') {
          await new EmployerService().createEmployer(data);
        }
        showSuccess();
      } catch (error) {
        toast.add({ severity: 'error', summary: 'Error', detail: error, life: 3000 });
      }
    };

    return {
      formData,
      isRegistrationEnabled,
      registerUser,
      showSuccess,
    };
  },
};
</script>

<style scoped>
</style>