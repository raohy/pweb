



<template>
  <div class="demo-date-picker">
      <el-date-picker
          v-model="value"
          value-format="YYYY-MM-DD"
          type="date"
          placeholder="Pick a day"
          :disabled-date="disabledDate"
      />
  </div>
  <div class="md-container">
    <ReadMd path="leetcode" :date="value"/>
  </div>
</template>


<script lang="ts">
import {defineComponent} from 'vue'
import ReadMd from "@/components/ReadMd.vue";
import { mapState, mapMutations } from 'vuex';

export default defineComponent({
  name: "LeetView",
  components: {ReadMd},
  data() {
    return {
      value: '2023-11-27'
    };
  },
  methods: {
    disabledDate(time) {
      return time.getTime() > Date.now();
    }
  },
  computed:{
    // formatDate(){
      // console.log(this.value)
      // let month = '' + (this.value.getMonth() + 1),
      //     day = '' + this.value.getDate(),
      //     year = this.value.getFullYear();
      //
      // if (month.length < 2)
      //   month = '0' + month;
      // if (day.length < 2)
      //   day = '0' + day;
      //
      // return [year, month, day].join('-');
    // }
  }
})
</script>



<style scoped>

</style>
