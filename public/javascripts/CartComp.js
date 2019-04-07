Vue.component('cart', { // eslint-disable-line
  data() {
    return {
      imgCart: '/img/grey.jpg',
      cartUrl: '/getBasket.json',
      cartItems: [],
      cartAmount: 0,
      showCart: false,
    };
  },
  methods: {
    addProduct(product) {
      const find = this.cartItems.find(el => el.id_product === product.id_product);
      if (find) {
        this.$parent.putJson(`/api/cart/${find.id_product}`, { quantity: 1 })
          .then((data) => {
            if (data.result === 1) {
              find.quantity += 1;
              this.cartAmount += +find.price;
            }
          });
      } else {
        const prod = Object.assign({ quantity: 1 }, product);
        this.$parent.postJson('/api/cart', prod)
          .then((data) => {
            if (data.result === 1) {
              this.cartItems.push(prod);
              this.cartAmount += +prod.price;
            }
          });
      }
    },
    remove(product) {
      for (let i = 0; i < this.cartItems.length; i += 1) {
        if (this.cartItems[i].id_product === +product.id_product) {
          this.$parent.deleteJson(`/api/cart/${this.cartItems[i].id_product}`, this.cartItems[i])
            .then((data) => {
              if (data.result === 1) {
                this.cartItems[i].quantity -= 1;
                this.cartAmount -= this.cartItems[i].price;
                if (this.cartItems[i].quantity === 0) {
                  this.cartItems.splice(i, 1);
                }
              }
            });
        }
      }
    },


  },
  mounted() {
    // this.$on('remove', this.remove);
    this.$parent.getJson('/api/cart')
      .then((data) => {
        this.cartAmount = data.amount;
        for (const el of data.contents) { // eslint-disable-line
          this.cartItems.push(el);
        }
      });
  },
  template: `
  <div id="cart" class="cart" @click="showCart = !showCart">
  <a href="#"><img src="/img/cart.svg" alt="cart"></a>
  <div class="cart-length">{{this.cartItems.length}}</div>
  <div id="cartDrop" class="dropbox cartdrop" v-show="showCart">   
      <div id=cartProducts class="cart-products">
        <h3 v-if="!cartItems.length">Корзина пуста</h3>
        <cart-item v-for="item of cartItems"
                          :key="item.id_product"
                          :cart-item="item"
                          :img="imgCart"
                          @remove="remove">
                          </cart-item>

      </div>
      <div class="total">
          <p>TOTAL</p>
          <p id="total">$ {{this.cartAmount}}</p>
      </div>
      <a href="#" class="checkout pink">CHECKOUT</a>
      <a href="/cart" class="gotocart">GO TO CART</a>
  </div>
</div>`,
});


Vue.component('cart-item', { // eslint-disable-line
  props: ['cartItem', 'img'],
  template: `
  <div class="cart-item">
  <div class="cartprod1"><img :src="img" alt="prod1">
  <h3>{{cartItem.product_name}}</h3>
  <i
          class="fas fa-star star"></i><i class="fas fa-star star"></i><i
          class="fas fa-star star"></i><i
          class="fas fa-star star"></i><i class="fas fa-star-half-alt star"></i>
  <p class="pink">{{cartItem.quantity}} x $ {{cartItem.price}}</p></div>
  <div class="cart-right-block">
    <button class="cart-del-btn" @click="$emit('remove', cartItem)">&times;</button>
  </div>
  </div>
    `,
});
