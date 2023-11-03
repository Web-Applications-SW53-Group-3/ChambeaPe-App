<template>
    <li @click="toggleLanguage" :class="{ active: currentLanguage === 'en' }">
      <i class="fa-solid fa-earth-americas"></i>
      <p>{{ currentLanguage === 'en' ? 'ENG' : 'ES' }} </p>
    </li>
</template>

<script>
export default {
  data() {
    return {
      currentLanguage: 'es',
    };
  },
  methods: {
    toggleLanguage() {
      this.currentLanguage = this.currentLanguage === 'en' ? 'es' : 'en';

      this.$i18n.locale = this.currentLanguage;
    },
  },
};
</script>

<style scoped>

li {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: .4rem;

  background: none;
  border: none;
  cursor: pointer;
  margin-right: 10px;
  color: white;

  &:hover {
    color: #fff;
  }
}
</style>
