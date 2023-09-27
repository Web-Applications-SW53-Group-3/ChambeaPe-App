<script>
import ForgotPasswordComponent from "@/components/login/forgot-password-component.vue";
import VerificationCodeComponent from "@/components/login/verification-code-component.vue";
import NewPasswordComponent from "@/components/login/new-password-component.vue";
import UpdatedPasswordComponent from "@/components/login/updated-password-component.vue";

window.handleCredentialResponse = (response) => {
  console.log("Encoded JWT ID token: " + response.credential);
};

export default {
  name: "login",
  components: {
    ForgotPasswordComponent,
    VerificationCodeComponent,
    NewPasswordComponent,
    UpdatedPasswordComponent,
  },
  data() {
    return {
      password: "",
      email: "",
      showForgotPassword: false,
      showVerificationCode: false,
      showNewPassword: false,
      showUpdatedPassword: false,
    };
  },
  methods: {
    handleCredentialResponse(response) {
      console.log("JWT ID token: " + response.credential);

      // TO-DO: Decode JWT Token and map to user object
      let user = {
        firstName: "User",
        lastName: "Test",
        email: "user_test@gmail.com",
        profilePic: "https://google.com",
      };

      this.LoginService.create(user)
          .then((response) => {
            if (response.status === 201) {
              alert("User created " + response.data.id);
            } else {
              alert("Error creating user");
            }
          })
          .catch((error) => {
            console.log("An error has occurred: ", error);
            alert(error.message);
          });
      this.$router.push("/home");
    },
    showForgotPasswordComponent() {
      this.showForgotPassword = true;
      this.showVerificationCode = false;
      this.showNewPassword = false;
      this.showUpdatedPassword = false;
    },

    showVerificationCodeComponent() {
      this.showForgotPassword = false;
      this.showVerificationCode = true;
      this.showNewPassword = false;
      this.showUpdatedPassword = false;
    },

    showNewPasswordComponent() {
      this.showForgotPassword = false;
      this.showVerificationCode = false;
      this.showNewPassword = true;
      this.showUpdatedPassword = false;
    },

    showUpdatedPasswordComponent() {
      this.showForgotPassword = false;
      this.showVerificationCode = false;
      this.showNewPassword = false;
      this.showUpdatedPassword = true;

    },

    closeOverlay() {
      this.showForgotPassword = false;
      this.showVerificationCode = false;
      this.showNewPassword = false;
      this.showUpdatedPassword = false;
    },
  },
  created() {
    window.addEventListener('reset-password-clicked', this.showVerificationCodeComponent);
  },
  beforeUnmount() {
    window.removeEventListener('reset-password-clicked', this.showVerificationCodeComponent);
  },
};
</script>

<template>
  <div class="login-container">
    <div class="overlay" v-if="showForgotPassword || showVerificationCode || showNewPassword || showUpdatedPassword" @click="closeOverlay"></div>
    <div class="wrapper">
      <h1>Log in</h1>
      <br>
      <span class="p-float-label">
        <pv-input-text id="mail" class="mail" v-model="email" />
        <label for="mail">{{$t("email")}}</label>
      </span>
      <br>
      <span class="p-float-label">
        <pv-password v-model="password" toggleMask :feedback="false" input-id="password" />
        <label for="password">Password</label>
      </span>
      <pv-button class="login" label="Log in"></pv-button>
      <a  @click="showForgotPasswordComponent" class="forgot">¿Olvidaste tu contraseña?</a>
      <div class="forgot-password-modal" v-if="showForgotPassword">
        <ForgotPasswordComponent @reset-password-clicked="showVerificationCodeComponent" />
      </div>
      <div class="verification-code-modal" v-if="showVerificationCode">
        <VerificationCodeComponent @verification-code-submitted="showNewPasswordComponent" />
      </div>
      <div class="new-password-modal" v-if="showNewPassword">
        <NewPasswordComponent @password-submitted="showUpdatedPasswordComponent" />
      </div>
      <div class="updated-password-modal" v-if="showUpdatedPassword">
        <UpdatedPasswordComponent />
      </div>
      <div
          id="g_id_onload"
          data-client_id="1011507135159-kl3lu14n4b4p85drsin8mjq6i7d1ro34.apps.googleusercontent.com"
          data-context="signin"
          data-ux_mode="popup"
          data-callback="handleCredentialResponse"
          data-itp_support="true"
      ></div>
      <div
          class="g_id_signin"
          data-type="standard"
          data-shape="pill"
          data-theme="outline"
          data-text="signin_with"
          data-size="large"
          data-logo_alignment="left"
      ></div>
    </div>
  </div>
</template>

<style scoped>

@import url(../../assets/css/login-component.css);

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
}

.forgot-password-modal,
.verification-code-modal,
.new-password-modal,
.updated-password-modal{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
}

.login {
  width: 15.5rem;
}

.forgot {
  font-size: 0.8rem;
  font-weight: 700;
  color: #eeae48;
  cursor: pointer;
}
</style>

