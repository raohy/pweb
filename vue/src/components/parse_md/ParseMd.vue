
<template>
  <div v-html="renderedMarkdown"></div>
</template>

<script lang="ts">
import { Marked } from 'marked';
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'
import { markedHighlight } from "marked-highlight";
export default {
  props: ['markdownContent'],
  data() {
    return {
      toc: [] as Array<{ level:number; text: string; id: string; }>,
    };
  },
  computed: {
    renderedMarkdown() {
      const marked = new Marked(
        markedHighlight({
          langPrefix: 'hljs language-',
          highlight(code, lang, info) {
            const language = hljs.getLanguage(lang) ? lang : 'plaintext';
            return hljs.highlight(code, { language }).value;
          }
        })
      );
      const renderer = new marked.Renderer();
      this.toc = []; // Reset ToC
      marked.setOptions({
        renderer: renderer, // 这是必填项
        gfm: true,	// 启动类似于Github样式的Markdown语法
        pedantic: false, // 只解析符合Markdwon定义的，不修正Markdown的错误
        // 高亮的语法规范
      })

      // Customize header rendering to include IDs
      renderer.heading = (text, level) => {
        if(level<=3) {
          const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
          this.toc.push({ level: level, text: text, id: text });
          // console.log(text)
          console.log(this.toc)
        }
        return `<h${level} id="${text}">${text}</h${level}>`;
      };
      return marked.parse(this.markdownContent, { renderer });
    }
  },
  mounted() {
    this.$emit('update:toc', this.toc);
  },
  watch: {
    markdownContent() {
      this.$nextTick(() => {
        this.$emit('update:toc', this.toc);
      });
    }
  },
}
</script>


<style scoped>

</style>
