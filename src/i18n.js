import { createI18n } from 'vue-i18n'

const i18n = createI18n({
    locale: 'en',
    messages: {
        en: {
        welcome: 'Welcome to Your Vue.js App'
        },
        fr: {
        welcome: 'Bienvenue dans votre application Vue.js'
        }
    }
})


export default i18n
