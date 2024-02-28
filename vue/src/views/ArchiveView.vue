


<template>
  <div id="app">
    <h1>Archives</h1>
    <div class="archive-item">
      <ArchiveItem :items="archiveItems" :years-list="years" />
    </div>
  </div>
</template>

<script>
import ArchiveItem from '../components/ArchiveItem.vue';
import axios from "axios";
export default {
  // name: 'App',
  components: {
    ArchiveItem
  },
  data() {
    return {
      archiveItems: Object,
      years: []
    };
  },
  mounted() {
    this.fetchTimeItems();
    this.updateData('Archives')
  },
  methods: {
    async fetchTimeItems() {
      try {
        const response = await axios.get('http://8.134.239.98:80/list/archive');

        if (response.status===200) {
          this.archiveItems = response.data; // Assign the response to the menus data property
          console.log(this.archiveItems)
          this.years = Object.keys(this.archiveItems).sort((a, b) => b - a);
          console.log(this.years)
        } else {
          throw new Error('Failed to fetch top-level archive items');
        }
      } catch (error) {
        console.error('Error fetching top-level menus:', error);
      }
    },
    updateData(value) {
      this.$store.commit('navi', value);
    },
  }
};
</script>

<style scoped>
h1 {
  position: absolute;
  left: 50px;
  top: 75px;
}
.archive-item {
  position: absolute;
  left: 50px;
  top: 150px;
}
</style>
