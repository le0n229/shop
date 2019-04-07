Vue.component('big-cart', { // eslint-disable-line
  data() {
    return {
      imgCart: '/img/grey.jpg',
      cartUrl: '/getBasket.json',
      cartItems: [],
      cartAmount: 0,
      // showCart: false,
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
  <div id='cartPageAllProducts'>
  <div class='cartPageProducts'>
  <div class="cartPageTitles cartPageBlock">Products</div>
        <div class="cartPageTitles cartPageBlock">Quantity</div>
        <div class="cartPageTitles cartPageBlock">Price</div>
        <div class="cartPageTitles cartPageBlock">Subtotal</div>
        <div class="cartPageTitles cartPageBlock">Actions</div>
        </div>
        <big-cart-item v-for="item of cartItems"
        :key="item.id_product"
        :cart-item="item"
        :img="imgCart"
        @remove="remove" @addProduct="addProduct">
        </big-cart-item>

       
        <div class="cartPageTotal">
        <div class="total "><p>TOTAL</p>
            <p id="total">$ {{this.cartAmount}}</p></div>
        <div id="cartPageOrder" class="checkout pink ">Order</div>
    </div>
    </div>
`,
});


Vue.component('big-cart-item', { // eslint-disable-line
  props: ['cartItem', 'img'],
  data() {
    return {
      quantity: this.cartItem.quantity,
    };
  },

  methods: {
    change(product, newValue) {
      console.log(product);
      console.log(newValue);
      if (newValue > product.quantity) {
        this.$parent.addProduct(product);
      }
      if (newValue < product.quantity) {
        this.$parent.remove(product);
      }
    },
  },
  template: `
  <div class='cartPageProducts'>
  <div class="cartprod1"><img :src="img" alt="prod1">
  <h3>{{cartItem.product_name}}</h3>
  <i
  class="fas fa-star star"></i><i class="fas fa-star star"></i><i
  class="fas fa-star star"></i><i
  class="fas fa-star star"></i><i class="fas fa-star-half-alt star"></i>
  </div>
  
  <div class="cartPageQuantity cartPageBlock"><p class="pink"><input type="number" v-model="this.quantity" @change='change(cartItem, this.quantity)' ></p></div>
  <div class="cartPagePrice cartPageBlock"><p class="pink">$ {{cartItem.price}}</p></div>
  <div class="cartPagePrice cartPageBlock"><p class="pink">$ {{cartItem.price*cartItem.quantity}}</p></div>
  <div class="cartPageDelete cartPageBlock"><p class="pink" @click="$emit('remove', cartItem)">DELETE</p></div>
  </div>
    `,
});
