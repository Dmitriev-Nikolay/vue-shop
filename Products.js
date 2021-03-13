import { Product } from "./Product.js";

export const Products = {
    inject: ['API', 'getJson'],
    components: {
        Product,
        // Footer,
    },
    data() {
        return {
            catalogUrl: '/catalogData.json',
            products: [],
            imgCatalog: 'imgs/',
            // imgCatalog: 'https://placehold.it/200x150',
        }
    },
    computed: {
        filtered() {
            return this.products.filter(item => new RegExp(this.$root.$refs.search.searchProduct, 'i').test(item.product_name));
        }
    },
    mounted() {   // получить данные с сервера и добавить их в соотв. массивы товаров
        this.$root.getJson(`${this.API + this.catalogUrl}`)
            .then(data => {
                if (!data) {
                    return;
                }
                for (let product of data) {
                    this.products.push(product);
                }
            });
        this.$root.getJson(`getProducts.json`)
            .then(data => {
                if (!data) {
                    return;
                }
                for (let product of data) {
                    this.products.push(product);
                }
            });
    },
    template: ` <div class="products">
                    <Product v-for="el of filtered" 
                        :key="el.id_product"
                        :img="imgCatalog"
                        :product="el">
                    </Product>
                </div>`
}