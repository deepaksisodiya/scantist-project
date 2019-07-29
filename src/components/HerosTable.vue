<template>
  <div>
    <input v-model="searchName" />
    <div v-if="isLoading">
      Loading...
    </div>
    <div v-else-if="isError">
      Error in fetching heros
    </div>
    <table v-else>
      <thead>
        <tr>
          <th>Hero Image</th>
          <th>Hero Name</th>
          <th>PRO Win Rate</th>
          <th>Pro Pick Count</th>
          <th>Pro Ban Count</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="hero in filterData" v-bind:key="hero.id">
          <td><img :src="`http://cdn.dota2.com/${hero.img}`" /></td>
          <td>{{ hero.localized_name }}</td>
          <td>{{ hero.pro_win }}</td>
          <td>{{ hero.pro_pick }}</td>
          <td>{{ hero.pro_ban }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "HerosTable",

  data: function() {
    return {
      searchName: ""
    };
  },

  computed: {
    filterData() {
      return this.$store.getters.filterHerosByName(this.searchName);
    },
    ...mapState({
      heros: state => state.heros,
      isLoading: state => state.isLoading,
      isError: state => state.isError
    })
  },

  mounted() {
    this.$store.dispatch("fetchHeros");
  }
};
</script>
