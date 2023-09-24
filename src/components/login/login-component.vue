<script>

window.handleCredentialResponse=(response)=> {
  console.log("Encoded JWT ID token: " + response.credential);
}
export default {
  name: "login",
  data() {
    return {
      password: "",
      email: "",
    };
  },
  methods: {
    handleCredentialResponse(response) {
      console.log("Encoded JWT ID token: " + response.credential);

      //TO-DO: Decode JWT Token and map to user object
      let user={
        firstName: "Pedro",
        lastName: "Gomez",
        email: "pedro_gomez@gmail.com",
        profilePic: "https://google.com"
      }

      this.LoginService
          .create(user)
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
    },
  },
};
</script>

<template>
  <div class="login-container">
    <div class="wrapper">
      <h1>Log in</h1>
      <br>
      <span class="p-float-label">
        <pv-input-text id="mail" class="mail" v-model="email" />
        <label for="mail">Email</label>
      </span>
      <br>
      <span class="p-float-label">
        <pv-password v-model="password" toggleMask :feedback="false" input-id="password" />
        <label for="password">Password</label>
      </span>
      <pv-button label="Log in"></pv-button>
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
</style>
