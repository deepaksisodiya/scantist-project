<template>
  <div id="app">
    <HerosTable />
  </div>
</template>

<script>
import HerosTable from "./components/HerosTable.vue";

export default {
  name: "app",
  components: {
    HerosTable
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
