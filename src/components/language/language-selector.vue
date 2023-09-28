<script>
export default {
  data() {
    return {
      currentLanguage: 'es',
    };
  },
  methods: {
    changeLanguage(language) {
      this.currentLanguage = language;

      this.$i18n.locale = language;
    },
  },
};
</script>

<template>
  <div class="language-selector">
    <button @click="changeLanguage('en')" :class="{ active: currentLanguage === 'en' }">English</button>
    <button @click="changeLanguage('es')" :class="{ active: currentLanguage === 'es' }">Español</button>
  </div>
</template>

<style scoped>
.language-selector {
  display: flex;
  justify-content: center;
  align-items: center;
}

.language-selector button {
  background: none;
  border: none;
  cursor: pointer;
  margin-right: 10px;
  color: #4e2900;
}

.language-selector button.active {
  font-weight: bold;
}
</style>
