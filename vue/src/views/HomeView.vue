



<script lang="ts">
import {defineComponent} from 'vue'
// import ReadMd from "@/components/ReadMd.vue";
export default defineComponent({
  name: "HomeView",
  // components: {ReadMd}
  methods:{
    updateData(value) {
      this.$store.commit('navi', value);
    }
  },
  mounted(){
    this.updateData('Home');
  }
})
</script>

<template>
<!--  <h1>test home vie2</h1>-->
  <main>
    这是我的生活碎片，我不想让它丢失在时间之中
  </main>
</template>

<style scoped>
main {
  display: flex;

  /*this centers the text horizontally*/
  justify-content: center;

  /*this centers the text vertically*/
  align-items: center;

  height: 1000px;

  width: 800px;
}
</style>
