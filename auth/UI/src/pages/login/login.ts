import Vue from 'vue';
import { Component } from 'vue-property-decorator';

import './login.scss';

@Component({
  components: {
  },
  template: require('./login.pug')
})
export default class LoginComponent extends Vue {
}
