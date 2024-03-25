


<!--<template>-->
<!--  <div>-->
<!--    <ul>-->
<!--      <li v-for="item in items" :key="item.id">-->
<!--        <div class="item-title" @click="handleClick(item)">-->
<!--          <i :class="{'icon-folder': item.children, 'icon-file': !item.children}"></i>-->
<!--          {{ item.title }}-->
<!--          <span class="post-count" v-if="item.folders_n">{{ item.folders_n }} categories, {{ totalPosts(item.files_n) }} posts</span>-->
<!--        </div>-->
<!--        <MenuItem v-if="item.children" :items="item.children" />-->
<!--      </li>-->
<!--    </ul>-->
<!--  </div>-->
<!--</template>-->

<template>
  <div class="item-list">

    <div class="blogging-block">
      <font-awesome-icon :icon="['fas', 'folder']" class="folder-fas-icon" />
      <span class = 'blogging-text'>
           Blogging
      </span>
      <span class="total-count" v-if="items.dir_count|items.file_count">
        {{ items.dir_count }} categories, {{ items.file_count }} posts
      </span>
    </div>

    <div class="dir-block">
      <div v-for="item in items.folders" :key="item.title" class="dir-detail">

        <div class="rec-frame single-line" >
<!--          <font-awesome-icon :icon="['far', 'folder']" class="folder-far-icon" />-->
          <font-awesome-icon :icon="isOpen(item.title) ? ['fas', 'folder'] : ['far', 'folder']" class="folder-far-icon" />
          <span class = 'dir-title' @click="toggleFiles(item.title)">
            {{ item.title }}
          </span>
          <span class="dir-count" v-if="item.folders_n|item.files_n">
            {{ item.files_n }} posts
          </span>
        </div>

        <div class="post-block" v-show="isOpen(item.title)">
          <div v-for="post in item.files" class="post-detail">
            <font-awesome-icon :icon="['far', 'file']" class="file-far-icon" />
            <span class ="post-title" @click="handleClick(item,post)">
              {{ post.title.slice(0,-3) }}
            </span>
            <span class="dash"></span>
            <span class="post-time">
              {{ post.posted_time }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "MenuItem",
  props: {
    items: Array
  },
  data() {
    return {
      openDirectories: {}
    };
  },
  methods: {
    toggleFiles(dirTitle) {
      // If the directory is already open, close it, and vice versa.
      if (this.openDirectories[dirTitle]) {
        this.openDirectories[dirTitle] = false;
      } else {
        this.openDirectories[dirTitle] = true;
      }
    },
    isOpen(dirTitle) {
      // Return the open state for the directory.
      return !!this.openDirectories[dirTitle];
    },
    handleClick(item,post) {
      this.$router.push({ path: '/post/'+(item.path.substring(7)+'/'+post.title)});
    },
    async fetchChildren(item) {
      try {
        const response = await axios.get('https://raohy.com/list/category',{params:{path:item.path}});
        if (response.status===200) {
          item.children = response.data.items;
        } else {
          throw new Error('API call failed: ' + response.status);
        }
      } catch (error) {
        console.error('Fetching children failed', error);
      }
      this.menu.isExpanded = !this.menu.isExpanded;
    }
  }
};
</script>

<style>
.item-list {
  position: relative;
}
.blogging-block{
  position: relative;
  display: flex;
  width: 800px;
  font-size: 1.03rem; /* Increase the font size to 110% of the parent element's font size */
  border: 1px solid #dcdcdc; /* Add a light grey border */
  background-color: #efefef;
  padding: 17px; /* Add space inside the border */
  border-top-left-radius: 8px; /* Optional: rounds the corners of the border */
  border-top-right-radius: 8px; /* Optional: rounds the corners of the border */
  align-items: center;
}

.folder-fas-icon{
  margin-right: 20px;
}
.blogging-text {
  margin-right: 10px;
}
.total-count{
  margin-left: auto;
  font-size: 0.875rem;
}
.dir-block{
  position: relative;
  display: flex;
  flex-flow: column;
  align-items: left;
}
.dir-detail{
  font-size: 1.03rem; /* Increase the font size to 110% of the parent element's font size */
  border: 1px solid #dcdcdc; /* Add a light grey border */
  background-color: white;
  padding: 17px; /* Add space inside the border */
}
.folder-far-icon {
  margin-left: 20px;
  margin-right: 8px;
}

.single-line {
  display: flex; /* Aligns children inline */
  align-items: center; /* Aligns children vertically in the center */
  white-space: nowrap; /* Prevents text wrapping */
  overflow: hidden; /* Hides parts of the content that might overflow */
  text-overflow: ellipsis; /* Adds an ellipsis if the text overflows */
}
.dir-title {
  cursor: pointer;
  color: initial; /* Default text color */
  transition: color 0.3s ease, text-decoration 0.3s ease; /* Smooth transition for color and text-decoration */
  align-items: center;
  font-size: 1.03rem;
  margin-right: 10px;
}
.dir-title:hover {
  color: orangered; /* Text color changes to blue on hover */
  text-decoration: underline; /* Underline text on hover */
}
.dir-count {
  margin-left: auto;
  padding-left: 10px;
  font-size: 0.875rem;
}
.post-block{
  position: relative;
  display: flex;
  flex-flow: column;
  align-items: left;
}
.post-detail{
  display: flex;
  font-size: 1.03rem; /* Increase the font size to 110% of the parent element's font size */
  background-color: white;
  align-items: center;
}
.file-far-icon{
  margin-left: 40px;
  margin-right: 8px;
}

.post-title {
  cursor: pointer;
  color: initial; /* Default text color */
  transition: color 0.3s ease, text-decoration 0.3s ease; /* Smooth transition for color and text-decoration */
  align-items: center;
  font-size: 1.03rem;
  margin-right: 10px;
}
.post-title:hover {
  color: orangered; /* Text color changes to blue on hover */
  text-decoration: underline; /* Underline text on hover */
}
.dash {
  /*margin: 0 0.5rem 0.6rem 0.5rem;*/
  border-bottom: 2px dotted #c0c0c0;
  flex-grow: 1 !important;
}
.post-time{
  margin-left: auto;
  padding-left: 10px;
  font-size: 0.875rem;
}


.icon-folder:before {
  content: '\f07b'; /* FontAwesome folder icon */
  font-family: 'FontAwesome';
}

.icon-file:before {
  content: '\f15b'; /* FontAwesome file icon */
  font-family: 'FontAwesome';
}
</style>
