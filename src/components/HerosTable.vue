<template>
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
      <tr v-for="hero in heros.data" v-bind:key="hero.id">
        <td><img :src="`http://cdn.dota2.com/${hero.img}`" /></td>
        <td>{{ hero.localized_name }}</td>
        <td>{{ hero.pro_win }}</td>
        <td>{{ hero.pro_pick }}</td>
        <td>{{ hero.pro_ban }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import axios from "axios";

export default {
  name: "HerosTable",

  data: function() {
    return {
      heros: {
        isLoading: false,
        isError: false,
        data: []
      }
    };
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
      }
    } catch (error) {
      this.heros.isError = true;
    } finally {
      this.heros.isLoading = false;
    }
  }
};
</script>
