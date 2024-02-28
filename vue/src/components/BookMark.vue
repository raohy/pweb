


<template>
  <div class="bookmark" >
    <div class="button-container">
      <button class="toggle-button" @click="toggleNav">
        <font-awesome-icon icon="align-justify" />
      </button>
    </div>
    <div class="navi-title">
      <p>{{ name }}</p>
    </div>
  </div>



</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {mapState} from "vuex";

export default defineComponent({
  // name: "Bookmark",
  data(){
    return{
      isNavVisible:false
    };
  },
  computed:{
    ...mapState(['name'])
  },
  methods:{
    toggleNav(){
      this.isNavVisible=!this.isNavVisible
      this.$emit('toggle-nav');
    }
  }
})
</script>


<style scoped>

.button-container{
  position: absolute;
  top: 5px;
  left: 5px;
}
.toggle-button {
  background: none; /* 移除背景颜色 */
  border: none; /* 移除边框 */
  cursor: pointer; /* 将鼠标光标变为手型，表示可点击 */
  padding: 10px; /* 或根据需要调整内边距 */
  color: #333; /* 设置图标颜色 */
  font-size: 24px; /* 设置图标大小 */
}
.toggle-button .fa-icon {

}
.navi-title{
  position: relative;
  top: 16px;
  left: 70px;
  height: 50px;
}
</style>
