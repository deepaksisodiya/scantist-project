<template>
  <div>
    <input v-model="searchName" />
    <div v-if="heros.isLoading">
      Loading...
    </div>
    <div v-else-if="heros.isError">
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
        <tr v-for="hero in heros.filterData" v-bind:key="hero.id">
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
import axios from "axios";
import debounce from "lodash.debounce";

export default {
  name: "HerosTable",

  data: function() {
    return {
      heros: {
        isLoading: false,
        isError: false,
        data: [],
        filterData: []
      },

      searchName: null
    };
  },

  watch: {
    searchName: function() {
      this.search(this.searchName, this);
    }
  },

  methods: {
    search: debounce((search, vm) => {
      const self = vm;
      self.filterHeros(self);
    }, 500),

    filterHeros() {
      const filterData = this.heros.data.filter(hero => {
        const localizedNameLowerCase = hero.localized_name.toLowerCase();
        const searchNameLowerCase = this.searchName.toLowerCase();
        return localizedNameLowerCase.includes(searchNameLowerCase);
      });
      this.heros.filterData = filterData;
    }
  },

  async mounted() {
    this.heros.isLoading = true;
    this.heros.isError = false;

    try {
      const response = await axios.get(
        "https://api.opendota.com/api/heroStats"
      );
      if (response.status === 200) {
        this.heros.data = response.data;
        this.heros.filterData = response.data;
      }
    } catch (error) {
      this.heros.isError = true;
    } finally {
      this.heros.isLoading = false;
    }
  }
};
</script>
