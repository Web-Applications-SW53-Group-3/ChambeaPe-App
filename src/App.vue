<script setup>
import NavigationComponent from "./components/layout/nav-component.vue";

</script>

<template>
    <navigation-component></navigation-component>
    <div class="container">
      <router-view></router-view>
    </div>
</template>


<style scoped>
.container {
  padding : 6rem 0 0 0;
}

</style>
