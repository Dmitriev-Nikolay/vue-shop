import { Products } from "./Products.js";
import { Cart } from "./Cart.js";
import { Search } from "./Search.js";
import { Error } from "./Error.js";
import { Basement } from "./Basement.js";

const Shop = {
  components: {
    Products,
    Cart,
    Search,
    Error,
    Basement,
  },
  data() {
    return {
      API: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses',
    }
  },
  provide() {
    return {
      API: this.API,
      getJson: this.getJson,
    }
  },
  methods: {
    getJson(url) {    // получить данные по url (result : result.json ? error)
      return fetch(url)
        .then(result => result.json())
        .catch(error => this.$refs.error.setError(error));
    },
  },
};
Vue.createApp(Shop).mount('#app');