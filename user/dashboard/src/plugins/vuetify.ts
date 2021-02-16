import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                // TODO: evaluate a better colors combination 
                // that helps us improve the user experience
                primary: '#1f6485',
                secondary: '#7db6d1',
                info: '#bea69a',
                accent: '#288d7a',
                success: '#54c9ff',
                warning: '#999999',
                error: '#B00020',
            },
        },
    },
});
