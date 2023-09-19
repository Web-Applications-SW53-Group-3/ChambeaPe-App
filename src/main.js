import './assets/css/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import PrimeVue from 'primevue/config';

import "primevue/resources/primevue.min.css";
import "primevue/resources/themes/lara-light-blue/theme.css";
import "primeicons/primeicons.css";

import Toolbar from 'primevue/toolbar';


import i18n from "@/i18n";
import router from "@/router";

const app = createApp(App);

app.use(i18n);
app.use(router);
app.use(PrimeVue);

app.component('pv-toolbar', Toolbar);

app.mount('#app');

