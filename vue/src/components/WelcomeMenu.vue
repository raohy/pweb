

<template>
  <div class="navbar-container">
    <h1>人生的碎碎念</h1> <!-- 添加的大标题 -->
    <img src="../assets/pimage.jpg" class="custom-image">
    <nav class="navbar">
      <ul>
        <li class="divider"></li>
        <li><router-link to="/">Home</router-link></li>
<!--        <li><router-link to="/about">About</router-link></li>-->
<!--        <li><router-link to="/contact">Contact</router-link></li>-->
        <li class="divider"></li>
        <li><router-link to="/post/life_talk">人生的碎碎念</router-link></li>
        <li><router-link to="/leetcode">每天一题leetcode</router-link></li>
        <li><router-link to="/category">Categories</router-link></li>
        <li><router-link to="/archive">Archive</router-link></li>
      </ul>
    </nav>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import { mapState, mapMutations } from 'vuex';

export default defineComponent({
  // name: "Navbar",
  props:{},
  methods: {
  }
})
</script>


<style scoped>

h1 {
  position: relative;
  top:30px;
  text-align: center;
  font-size: 2em; /* 字体大小 */
  color: #333; /* 字体颜色 */
  margin-bottom: 20px; /* 在标题和导航栏之间添加一些空间 */
}
.custom-image {
  position: relative;
  left: 25px;
  top: 15px;
  width: 200px; /* 设置宽度 */
  height: auto; /* 设置高度 */
}
.navbar {
  color: black;
  padding: 10px;
  text-align: left;
}

.navbar ul {
  list-style-type: none;
  padding: 5px;
}
.divider {
  height: 1px; /* 横线的高度 */
  background-color: black; /* 横线的颜色 */
  margin: 8px 0; /* 在横线上下添加一些空间 */
}
.navbar li {
  display: block;
  margin: 10px;
}

.navbar a {
  color: black;
  text-decoration: none;
  font-size:16px;
}
</style>
