import Vue from 'vue';
import { Component } from 'vue-property-decorator';

import './home.scss';

@Component({
    components: {
    },
    template: require('./home.pug')
})
export default class HomeComponent extends Vue {
}
