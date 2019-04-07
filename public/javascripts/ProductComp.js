Vue.component('products', { // eslint-disable-line
  data() {
    return {
      catalogUrl: '/catalogData.json',
      products: [],
      filtered: [],
    };
  },
  methods: {
    filter(value) {
      const regexp = new RegExp(value, 'i');
      this.filtered = this.products.filter(el => regexp.test(el.product_name));
    },
  },
  mounted() {
    this.$parent.getJson('/api/products')
      .then((data) => {
                for (const el of data) { // eslint-disable-line
          this.products.push(el);
          this.filtered.push(el);
        }
      });
  },
  template: `
  <div id="product" class="ftable">
    <div class="modal display"></div>
    <product v-for="item of filtered" :key="item.id_product" :product="item" ></product>
</div>  
  `,
});

Vue.component('product', { // eslint-disable-line
  props: ['product'],
  template: `
  <div class="f1">
  <div :class="product.img"></div>
  <a :href="'/product/'+product.id_product"><p>{{product.product_name}}</p></a>
  <p class="pink">$ {{product.price}}</p>
  <div class="addcart">
      <button class="cartlink" @click="$root.$refs.cart.addProduct(product)">Add to Cart</button>
  </div>
</div>
`,
});
