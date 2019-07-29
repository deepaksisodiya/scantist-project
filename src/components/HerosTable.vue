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
        <tr v-for="hero in heros" v-bind:key="hero.id">
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
import debounce from "lodash.debounce";
import { mapState } from "vuex";

export default {
  name: "HerosTable",

  data: function() {
    return {
      searchName: null
    };
  },

  watch: {
    searchName: function() {
      this.search(this.searchName, this);
    }
  },

  computed: mapState({
    heros: state => state.heros,
    isLoading: state => state.isLoading,
    isError: state => state.isError
  }),

  methods: {
    search: debounce((search, self) => {
      const filterData = self.$store.getters.filterHerosByName(search);
      console.log(filterData.length);
    }, 500)
  },

  mounted() {
    this.$store.dispatch("fetchHeros");
  }
};
</script>
