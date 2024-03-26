

<template>
  <nav :class="{'nav-hide': getNavShown(isTocHide)}">
    <ul>
      <li v-for="item in toc" :key="`link-${item.id}`">
        <button @click="scrollToSection(item.id)" :class="['btn', getClassByLevel(item.level)]">{{ item.text }}</button>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: ['toc','isTocHide'],
  data() {
    return {
    };
  },
  methods:{

    scrollToSection(sectionId) {
      const element = document.getElementById(sectionId);
      if (element) {
        const yOffset = -140; // Adjust this value to change the offset
        const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });      }
    },
    getClassByLevel(level){
      switch(level) {
        case 1:
          return 'first';
        case 2:
          return 'second';
        case 3:
          return 'third';
        default:
          return '';
      }
    },
    getNavShown(tocshow){
      return tocshow === "no";
    }
  }
};
</script>
<style scoped>
nav ul {
  list-style-type: none; /* Removes the default list item markers */
  padding: 0; /* Optional: Removes padding */
  margin: 0; /* Optional: Removes margin */
}
nav {
  height: 700px; /* Adjust to fit your design */
  overflow-y: auto; /* Enables scrolling within the nav */
  position: fixed; /* Makes the nav fixed, if desired */
  width: 300px; /* Define a width for the fixed nav */
  right: 2rem; /* Adjust based on your layout */
  top: 70px; /* Adjust based on your layout */
  /* Additional styling for visibility */
  /*border: 1px solid #ccc;*/
  /*box-shadow: 0 2px 5px rgba(0,0,0,0.2);*/
  overflow-x: hidden;
}
.nav-hide {
  visibility: hidden;
}
ul {
  display:flex;
  flex-direction: column;
  align-items: flex-start;
}
.btn {
  background-color: transparent; /* Transparent background */
  color: black; /* Black font color */
  cursor: pointer;
  border: none;
  padding: 8px 16px; /* Adjust padding as needed */
  width: 100%; /* Ensures full-width buttons, adjust as needed */
}

/* Styles for the first type (main titles) */
.first {
  font-size: 1.4em; /* Slightly larger font size */
  font-weight: bold; /* Optional: makes it stand out more */
}
.second {
  font-size: 1.2em; /* Slightly larger font size */
  margin-left: 10px;
  font-weight: normal; /* Optional: makes it stand out more */
}
/* Styles for the second type (subtitles) */
.third {
  font-size: 1em; /* Standard font size */
  margin-left: 20px; /* Adds some space before it, creating a nested look */
  font-weight: normal;
}
</style>
