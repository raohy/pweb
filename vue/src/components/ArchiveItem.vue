
<!--<template>-->

<!--  <div v-for="key in yearsList" :key="key" class="archive-container">-->
<!--    <div class="year-container">-->
<!--      <span class="year-title">{{key}}</span>-->
<!--      <div class="year-circle"></div>-->
<!--    </div>-->
<!--    <div class="item-list">-->
<!--      <div v-for="post in this.items[key]" :key="post.title" class="item-container">-->
<!--        <div class="item-line"></div>-->
<!--        <span class="item-date">{{ post.posted_time }}</span>-->
<!--        <span class="item-dot"></span>-->
<!--        <span class="item-content">{{ post.title }}</span>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->

<!--</template>-->


<template>
  <div v-for="year in yearsList" :key="year" class="archive-container">
    <h4>{{year}}</h4>
    <el-timeline>
      <el-timeline-item v-for="(post,index) in this.items[year]" :key="index" :timestamp="post.posted_time.substring(post.posted_time.indexOf('-')+1)">
          <h4 class="post-title" @click="handleTitleClick(post)">{{post.title.slice(0,-3)}}</h4>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>



<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "ArchiveItem",
  props: {
    items: Array,
    yearsList: Array
  },
  data() {
    return {
      // year: string
      // yearsList: []
    };
  },
  methods: {
    handleTitleClick(post:any) {
      console.log(post.path.substring(1, post.path.length))
      this.$router.push({path: '/post/'+ post.path.substring(7) });
    }
    // sortedKey() {
    //   this.yearsList = Object.keys(this.items).sort((a, b) => b - a);
    //   console.log(this.yearsList)
    // }
  },
  mounted() {
    // console(Object.keys(this.items))
   // this.sortedKey();
  }
})
</script>



<style scoped>
.archive-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  left :0px;
  top : 20px;
}
.post-title {
  cursor: pointer;
  color: initial; /* Default text color */
  width: 1000px;
  transition: color 0.3s ease, text-decoration 0.3s ease; /* Smooth transition for color and text-decoration */
}
.post-title:hover {
  color: orangered; /* Text color changes to blue on hover */
  text-decoration: underline; /* Underline text on hover */
}
.year-container {
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  left :0px;
  top : 0px;
}
.year-title {
  position: relative;
  font-size: 1.5rem;
}
.year-circle {
  position: absolute;
  height: 15px;
  width: 15px;
  background-color: #fff;
  border: 2px solid #ccc;
  border-radius: 50%;
}
.item-list {
  left: 0px;
}
.item-container {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  top: 0;
  bottom: 0;
  left: 0px; /* Adjust as needed */
  background-color: #ccc;
}
.item-list {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: left;
}
.item-containers {
  position: relative;
  display: flex;
  margin-left: 70px; /* Adjust as needed */
}
.item-dot {
  position: absolute;
  left: -20px; /* Adjust to align with the timeline */
  height: 10px;
  width: 10px;
  background-color: #fff;
  border: 2px solid #ccc;
  border-radius: 50%;
}
.item-date {
  /* Style as needed */
}
.timeline-content {
  /* Style as needed */
}
</style>
