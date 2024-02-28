
<template>
  <div>
    <navbar class="navbar" :class="{'nav-hide': isNavHide}" ></navbar>
    <toggle-button class="bookmark" :class="{'bookmark-hide': isNavHide}" @toggle-nav="toggleNav"></toggle-button>
    <div class="router-container" :class="{'content-hide': isNavHide}">
      <router-view> </router-view>
    </div>
  </div>
</template>

<script>

import ToggleButton from './components/BookMark.vue';
import Navbar from './components/WelcomeMenu.vue';
import ContentView from "./components/ContentView.vue";

export default {
  components: {
    ContentView,
    ToggleButton,
    Navbar
  },
  data() {
    return {
      isNavHide: false,
    };
  },
  methods: {
    toggleNav() {
      this.isNavHide = !this.isNavHide;
    },
  },
};
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 250px;
  height: 100%;
  background-color: whitesmoke;
  transition: left 0.3s ease-in-out;
}
.nav-hide {
  left: -250px;
}
.bookmark {
  position: fixed; /* 或 'absolute'，取决于布局需求 */
  top: 0;
  right: 0;
  left:250px;
  height: 75px;
  z-index: 1000; /* 确保按钮显示在其他内容之上 */
  transition: left 0.3s ease-in-out;
  background-color: white;
}
.bookmark-hide {
  left: 0;
}
.router-container {
  position: absolute;
  top: 0;
  left: 250px;
  height: calc(100vh - 50px);
  padding-top: 75px;
  z-index: 1;
  transition: left 0.3s ease-in-out;
}
.content-hide {
  left: 0px;
}
</style>
