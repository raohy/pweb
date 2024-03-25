


<template>
  <div id="app">
    <h1>Categories</h1>
    <div class="menu-item">
      <MenuItem :items="menuItems" />
    </div>
  </div>
</template>

<script>
import MenuItem from '../components/MenuItem.vue';
import axios from "axios";

export default {
  // name: 'App',
  components: {
    MenuItem
  },
  data() {
    return {
      menuItems: []
    };
  },
  mounted() {
    this.fetchTopLevelMenuItems();
    this.updateData('Categories')
  },
  methods: {
    async fetchTopLevelMenuItems() {
      try {
        // const response = await axios.get('http://127.0.0.1:5000/list/category',{params:{path:''}});
        const response = await axios.get('https://raohy.com/list/category');
        // const response = await axios.get('http://8.134.239.98:443/list/category');

        if (response.status===200) {
          this.menuItems = response.data; // Assign the response to the menus data property
          console.log(this.menuItems)
        } else {
          throw new Error('Failed to fetch top-level menu items');
        }
      } catch (error) {
        console.error('Error fetching top-level menus:', error);
      }
    },
    updateData(value) {
      this.$store.commit('navi', value);
    }
  }
};
</script>

<style scoped>
h1 {
  position: absolute;
  left: 50px;
  top: 75px;
}
.menu-item {
  position: absolute;
  left: 50px;
  top: 150px;
}
</style>
