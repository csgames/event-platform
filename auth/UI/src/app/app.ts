import Vue from 'vue';
import { Component } from 'vue-property-decorator';


@Component({
    template: require('./app.pug')
})
export default class App extends Vue {
}
