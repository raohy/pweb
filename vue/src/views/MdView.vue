

<template>
  <div class="main-container">
    <div class="md-container">
      <ParseMd :markdownContent="markdownContent"  @update:toc="toc = $event"></ParseMd>
    </div>
    <div class="toc-container">
      <ToC :toc="toc" :is-toc-hide="this.info['content']"></ToC>
    </div>
  </div>
</template>


<script lang="ts">
import ParseMd from '../components/parse_md/ParseMd.vue';
import ToC from '../components/parse_md/ToC.vue';
import axios from "axios";
export default {
  props:['path','date'],
  components: {
    ParseMd,
    ToC
  },
  data() {
    return {
      markdownContent: '',
      url:'',
      title:'',
      toc:[],
      info:[]
    };
  },
  watch: {
    '$route': {
      immediate: true,
      handler() {
        this.fetchMarkdown();
      }
    },
  },
  computed: {
    filterContentByDate() {
      if (!this.markdownContent){
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
        const response = await axios.get(`https://raohy.com/post/${this.url}`);
        this.markdownContent = response.data;
        this.detectedInfos();
        // console.log(this.markdownContent)
      } catch (error) {
        console.error(error);
      }
    },
    detectedInfos() {
      type DesType = {
        [key: string]: string;
      };
      const lines = this.markdownContent.split('\n');
      // console.log(lines)
      const indexes: number[] = [];
      function findFirstTwoIndexes(arr: string[], prefix: string): DesType {
        let details:DesType = {}
        const prefixRegex = new RegExp(`^${prefix}`);
        const regex = /(\w+)[\:：](.+)/;
        for (let i = 0; i < arr.length; i++) {
          if (prefixRegex.test(arr[i])){
            indexes.push(i);
            for(let j = i+1;j<arr.length;j++){
              if(prefixRegex.test(arr[j])){
                indexes.push(j);
                break;
              }
              else{
                const [space, key, value] = lines[j].match(regex);
                console.log(lines[j].match(regex))
                details[key.trim()] = value.trim();
              }
            }
            break;
          }
        }
        if (details['content'] === undefined) {
          details['content'] = true;
        }

        return details;
      }
      // <br/>
      this.info = findFirstTwoIndexes(lines,'---')
      lines.splice(indexes[0],indexes[1]-indexes[0])
      let post = `##### 发布:${this.info['posted']} 更新:${this.info['updated']}`;
      // let update = `###### 更新:${details['updated']}`;
      lines.splice(indexes[0]+1, 0, post);
      // lines.splice(indexes[0]+2, 0, update);
      lines.splice(indexes[0]+2, 0, '<br/>');
      this.markdownContent=lines.join("\n")
      console.log(this.info)
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
.main-container{
/*display: flex;*/
/*flex-direction: row;*/
margin-left: 2rem;
}
.md-container{
position: absolute;
top: 70px;
width: 1000px;
}
.toc-container{

}
</style>
