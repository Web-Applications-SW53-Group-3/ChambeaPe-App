<template>
  <div class="container flex flex-column justify-content-center">
    <div class="container-form flex flex-column gap-4 w-4.2 align-self-center p-5">
      <h2 class="flex justify-content-center">{{$t("tittleRegister")}}</h2>

      <div class="flex flex-column gap-1">
        <div class="grid grid-cols-2 justify-content-center gap-8">
          <div class="flex align-items-center">
            <pv-radiobutton v-model="formData.account" inputId="account1" name="chambeador" value="chambeador" required/>
            <label for="account1" class="ml-2">{{$t("checkEmployer")}}</label>
          </div>
          <div class="flex align-items-center">
            <pv-radiobutton v-model="formData.account" inputId="account2" name="worker" value="worker" />
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
          placeholder="999111138"
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
          @input="validateEmail(formData.email)"
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
          @input="validatePassword(formData.password)"
          required
          placeholder="*********"
        />
      </div>

      <div class="flex flex-column gap-1">
        <div class="grid grid-cols-2 justify-content-center gap-8">
          <div class="flex align-items-center">
            <pv-radiobutton v-model="formData.gender" inputId="gender1" name="female" value="female" />
            <label for="gender1" class="ml-2">{{$t("inGenderWoman")}}</label>
          </div>
          <div class="flex align-items-center">
            <pv-radiobutton v-model="formData.gender" inputId="gender2" name="male" value="male" />
            <label for="gender2" class="ml-2">{{$t("inGenderMan")}}</label>
          </div>
        </div>
      </div>

      <div class="align-self-center">
        <pv-button @click="redirectToHome()">{{$t("btnRegister")}}</pv-button>
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