import './assets/css/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import PrimeVue from 'primevue/config';

import "primevue/resources/primevue.min.css";
import '@/assets/css/theme.css'
import Sidebar from 'primevue/sidebar';

import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import TreeSelect from 'primevue/treeselect';
import Steps from 'primevue/steps';
import Toolbar from 'primevue/toolbar';
import Password from "primevue/password";
import InputMask from 'primevue/inputmask';
import InputText from 'primevue/inputtext';
import Button from "primevue/button";
import Card from "primevue/card";
import Dropdown from 'primevue/dropdown';
import Calendar from 'primevue/calendar';
import SelectButton from 'primevue/selectbutton';
import InlineMessage from 'primevue/inlinemessage';
import RadioButton from 'primevue/radiobutton';
import Checkbox from 'primevue/checkbox';

import Textarea from "primevue/textarea";
import FileUpload from 'primevue/fileupload';


import i18n from "@/i18n";
import router from "@/router";

const app = createApp(App);

app.use(i18n);
app.use(router);
app.use(PrimeVue);


app.component('pv-toolbar', Toolbar);
app.component('pv-input-mask', InputMask);
app.component('pv-input-text', InputText);
app.component('pv-button', Button);
app.component('pv-sidebar', Sidebar);
app.component('pv-card', Card)
app.component('pv-input', InputText);
app.component('pv-calendar', Calendar);
app.component('pv-password', Password);
app.component('pv-selectbutton', SelectButton);
app.component('pv-radiobutton', RadioButton);
app.component('pv-checkbox', Checkbox);
app.component('pv-steps', Steps);
app.component('pv-treeselect', TreeSelect);
app.component('pv-textarea', Textarea)
app.component('pv-fileupload', FileUpload)
app.component('pv-dropdown', Dropdown);
app.component('pv-inline-message', InlineMessage);

app.mount('#app');

