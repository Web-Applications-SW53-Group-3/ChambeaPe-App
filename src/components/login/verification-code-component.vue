<script>
export default {
  data() {
    return {
      verificationCode: "",
    };
  },
  methods: {
    submitVerificationCode() {
      this.$emit("verification-code-submitted");
    },
  },
};
</script>

<template>
  <div class="verification-code" style="width: 15em">
    <div class="title">{{ $t("titleCodeEmail") }}</div>
    <div class="subtitle">
      {{ $t("textSendCode") }}
      <pv-button class="transparent-button color-text" :label="$t('btnChangePassword')"></pv-button>
    </div>
    <div class="p-inputgroup">
      <span class="p-inputgroup-addon">
        <i class="pi pi-lock" style="margin-right: 0.5rem;"></i>
      </span>
      <input type="text" v-model="verificationCode" class="p-inputtext large-input" :placeholder="$t('placeCodeText')" />
    </div>
    <div class="footer">
      <button class="transparent-button left-align color-text">{{ $t('resendCode') }}</button>
    </div>
    <div class="footer">
      <button class="p-button large-button" @click="submitVerificationCode">{{ $t('send') }}</button>
    </div>
    <p>
      {{ $t("textSpam") }}
      <br />
      <pv-button class="transparent-button color-text" :label="$t('noAccesEmail')"></pv-button>
    </p>
  </div>
</template>

<style scoped>
.verification-code {
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
  font-size: 1rem;
  display: flex;
  align-items: center;
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

.left-align {
  text-align: left;
}

.large-button {
  width: 100%;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  justify-content: center;
  border: none;
}

p {
  margin-top: 1rem;
  font-size: 1rem;
}
</style>