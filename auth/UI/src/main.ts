import './themes';

import Vue from 'vue';
import VueRouter from 'vue-router';
import VueI18n from 'vue-i18n';
import Home from './pages/home/home';
import Login from './pages/login/login';

Vue.use(VueRouter);
Vue.use(VueI18n);

import App from './app/app';

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: Home
        },
        {
            path: '/login',
            component: Login
        },
    ]
});

const messages = {
    en: require('./i18n/en.json'),
    fr: require('./i18n/fr.json')
};

const i18n = new VueI18n({
    locale: 'fr',
    messages,
});

new Vue({
    i18n,
    router,
    el: '#app',
    components: {
        App
    },
    render: (h) => h(App)
});
