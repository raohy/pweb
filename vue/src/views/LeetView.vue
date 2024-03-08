
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
    <ReadMd path="leetcode.md" :date="value"/>
  </div>
</template>


<script lang="ts">
import {defineComponent} from 'vue'
import ReadMd from "@/components/ReadMd.vue";

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
  computed: {}
})
</script>



<style scoped>

</style>
