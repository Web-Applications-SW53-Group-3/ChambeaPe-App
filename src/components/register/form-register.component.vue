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
          placeholder="999111138"
          required
        />
      </div>
      <div class="flex flex-column gap-1">
        <label for="email">{{$t("description")}}</label>
        <pv-textarea
          id="description"
          v-model="formData.description"
          aria-describedby="email-help"
          :placeholder="$t('descrptionMessage')"
          required
        />
      </div>
      <div class="flex flex-column gap-1">
        <label for="email">{{$t("pictureProfile")}}</label>
        <pv-input
          id="picture"
          v-model="formData.picture"
          aria-describedby="email-help"
          placeholder="https://www.google.com/..."
          required
        />
      </div>
      <div class="flex flex-column gap-1">
        <label for="email">{{$t("occupation")}}</label>
        <pv-input
          id="occupation"
          v-model="formData.occupation"
          aria-describedby="email-help"
          :placeholder="$t('occupationMessage')"
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
        <pv-toast/>
        <pv-button :disabled="!isRegistrationEnabled" @click="registerUser()">{{$t("btnRegister")}}</pv-button>
      </div>

      
    </div>
  </div>

</template>

<script >
import { reactive, ref } from 'vue';
import EmployerService from '@/services/employer.service.js';
import WorkerProfileService from '@/services/worker-profile.service.js';
import { useToast } from 'primevue/usetoast';

export default {
  data(){
    return{
      toast: null
    }
  },
  created() {
    this.toast = useToast();
  }, 
  setup() {
    const toast = useToast();

    const show = () => {
      toast.add({ severity: 'info', summary: 'Info', detail: 'Message Content', life: 3000 });
    };
    return{
      toast,
      show
    }
  },
  
  computed: {
    isRegistrationEnabled() {
      return this.areAllFieldsFilled() && !this.errorMessage;
    },
  },
  methods: {
    areAllFieldsFilled() {
      const requiredFields = [
        this.formData.name,
        this.formData.lastname,
        this.formData.phone,
        this.formData.description,
        this.formData.picture,
        this.formData.occupation,
        this.formData.date,
        this.formData.email,
        // this.formData.password,
        this.formData.gender,
        this.formData.account
      ];

      return requiredFields.every(field => !!field);
    },

    redirectToHome() {
      this.$router.push('/home');
    },

    async registerUser(){
      let data ={
            firstName: this.formData.name,
            lastName: this.formData.lastname,
            email: this.formData.email,
            phoneNumber: this.formData.phone,
            description: this.formData.description,
            birthdate: this.formData.date,
            password: this.formData.password,
            occupation: this.formData.occupation,
            gender: this.formData.gender,
            userRole: this.formData.account,
            profilePic: this.formData.picture
      }
      console.log(data);
      try {
          if (data.userRole === 'W') {
            await new WorkerProfileService().postWorker(data);
          } else if (data.userRole === 'E') {
            await new EmployerService().createEmployer(data);
          }
          this.$toast.add({ severity: 'success', summary: 'success', detail: 'User Created Succesfully', life: 3000 });

      } catch (error) {
        this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Please, check all the fields', life: 3000 });

      }

    }
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
      description: '',
      picture: '',
      occupation: '',
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
      this.$router.push('/home');
    };

    const setIsCandidate = (isCandidate) => {
      formData.isCandidate = isCandidate;
    };
    let toast = ref(null);

    return {
      formData,
      validateEmail,
      validatePassword,
      submitForm,
      setIsCandidate,
      gender,
      account,
      errorMessage,
      toast,
    };
  },
};
</script>

<style scoped>

</style>