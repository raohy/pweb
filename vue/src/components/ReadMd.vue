


<template>
  <div class="md-container">
    <v-md-preview :text="filterContentByDate"></v-md-preview>
  </div>
</template>

<script>

import axios from 'axios';
import { VMdPreview } from '@kangc/v-md-editor';

export default {
  props:['path','date'],
  components: {
    VMdPreview,
  },
  data() {
    return {
      markdownContent: '',
      url:'',
      title:''
    };
  },
  watch: {
    '$route': {
      immediate: true,
      handler() {
        this.fetchMarkdown();
      }
    }
  },
  computed: {
    detectedHeaders() {
      const headers = [];
      const lines = this.markdownContent.split('\n');
      lines.forEach(line => {
        if (line.startsWith('#')) {
          headers.push(line.trim());
        }
      });
      return headers;
    },
    filterContentByDate() {
      console.log(this.date)

      if (this.date){
        const lines = this.markdownContent.split('\n');
        let contentForSelectedDate = '';
        let capture = false;
        for (const line of lines) {
          if (line.startsWith('###') && line.includes('-')) {
            console.log(line)
            if (!capture) {
              if (line.includes(this.date)) {
                capture = true;
                continue;
              }
            } else {
              break;
            }
          }
          if(capture){
            contentForSelectedDate += line + '\n';
          }
        }
        return contentForSelectedDate;
      }
      else{
        return this.markdownContent
      }
    }
  },
  methods: {
    async fetchMarkdown() {
      try {
        this.url = this.path ? this.path : this.$route.params.pathMatch;
        console.log(this.$route.params.pathMatch)
        const response = await axios.get(`http://8.134.239.98:80/post/${this.url}`);
        this.markdownContent = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    updateData(value) {
        this.$store.commit('navi', value);
    }
  },
  mounted() {
    this.fetchMarkdown();
    if (this.url==='leetcode'){
      this.title='每天一题leetcode'
    }
    else if(this.url==='life_talk'){
      this.title='人生的碎碎念'
    }
    else {
      this.title = this.url
    }
    this.updateData(this.title.slice(0,-3));
    }
};
</script>


<style scoped>
.v-md-preview {
  /* Your styles here */
   /* Example: Add margin to prevent overlap with sidebar */
}
</style>
