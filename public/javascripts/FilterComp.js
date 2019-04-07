Vue.component('filter-el', { // eslint-disable-line
  data() {
    return {
      userSearch: '',
    };
  },
  template: `
  <form class="search" @submit.prevent="$parent.$refs.products.filter(userSearch)">
  <a class="bsearch" href="#">Browse <i class="fas fa-sort-down fa-search"></i></a>
  <div class="dropbox searchdrop">
      <div class="dbox1">
          <h3 class="dheader">Women</h3>
          <ul class="dmenu">
              <li class="dbli"><a href="#" class="dba"> Dresses

              </a></li>
              <li class="dbli"><a href="#" class="dba"> Tops </a></li>
              <li class="dbli"><a href="#" class="dba"> Sweaters/Knits </a></li>
              <li class="dbli"><a href="#" class="dba"> Jackets/Coats </a></li>
              <li class="dbli"><a href="#" class="dba"> Blazers </a></li>
              <li class="dbli"><a href="#" class="dba"> Denim </a></li>
              <li class="dbli"><a href="#" class="dba"> Leggings/Pants </a></li>
              <li class="dbli"><a href="#" class="dba"> Skirts/Shorts </a></li>
              <li class="dbli"><a href="#" class="dba"> Accessories </a></li>
          </ul>
      </div>
  </div>
  <input type="search" class="isearch" name="q" placeholder="Search for item..." v-model="userSearch" @input="$parent.$refs.products.filter(userSearch)"></form>
    `,
});
