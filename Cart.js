import { CartItem } from "./CartItem.js";

export const Cart = {
    inject: ['API', 'getJson'],
    components: {
        CartItem
    },
    data() {
        return {
            cartQuantity: 0,
            cartSum: 0,
            cartUrl: '/getBasket.json',
            cartItems: [],
            imgCart: 'imgs/',
            // imgCart: 'https://placehold.it/75x100',
            cartVisibility: false,
        }
    },
    methods: {
        showCart() {    // показать/скрыть корзину
            this.cartVisibility = !this.cartVisibility;
        },
        addProduct(product) {   // добавить товар в корзину
            this.$root.getJson(`${this.API}/addToBasket.json`)
                .then(data => {
                    if (data.result) {
                        let find = this.cartItems.find(el => el.id_product === product.id_product);
                        if (find) {
                            find.quantity++;
                            this.cartQuantity++;
                            this.cartSum += find.price;
                        } else {
                            let addedProduct = Object.assign({ quantity: 1, }, product);
                            this.cartItems.push(addedProduct);
                            this.cartQuantity++;
                            this.cartSum += addedProduct.price;
                        }
                    }
                })
        },
        removeProduct(product) {    // удалить товар из корзины
            this.$root.getJson(`${this.API}/deleteFromBasket.json`)
                .then(data => {
                    if (data.result) {
                        if (product.quantity > 1) {
                            product.quantity--;
                            this.cartQuantity--;
                            this.cartSum -= product.price;
                        } else {
                            this.cartItems.splice(this.cartItems.indexOf(product), 1);
                            this.cartSum -= product.price;
                            this.cartQuantity--;
                        }
                    }
                });
        },
    },
    /** Слуйчай, если товары уже лежат в корзине */
    // mounted() {   // получить данные с сервера и добавить их в соотв. массивы товаров
    //     this.$root.getJson(`${this.API + this.cartUrl}`)
    //         .then(data => {
    //             if (!data) {
    //                 return;
    //             }
    //             for (let product of data.contents) {
    //                 this.cartItems.push(product);
    //             }
    //         });
    // },
    template: `  <div class="cart">
                    <button @click="showCart()" class="btn-cart" type="button">Корзина {{this.cartQuantity}}</button>
                    <div class="cart-block" v-show="cartVisibility">
                        <p v-if="!cartItems.length">Корзина пуста</p>
                        <CartItem v-for="item of cartItems"
                            :key="item.id_product"
                            :img="imgCart"
                            :cartItem="item"
                            @removeProduct="removeProduct">
                        </CartItem>
                        <div class="cart-sum">Итого: {{this.cartSum}} &#8381</div>
                    </div>
                </div>`
}  