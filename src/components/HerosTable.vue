<template>
  <div>
    <el-input placeholder="Search By Name" v-model="searchName"></el-input>

    <div v-if="isLoading">
      Loading...
    </div>
    <div v-else-if="isError">
      Error in fetching heros
    </div>
    <el-table v-else :data="filterData">
      <el-table-column label="Hero Image">
        <div slot-scope="{ row }">
          <el-image
            style="width: 100px; height: 100px"
            :src="`http://cdn.dota2.com/${row.img}`"
          ></el-image>
        </div>
      </el-table-column>
      <el-table-column prop="localized_name" label="Hero Name" width="180">
      </el-table-column>
      <el-table-column prop="pro_win" label="PRO Win Rate" width="180">
      </el-table-column>
      <el-table-column prop="pro_pick" label="Pro Pick Count">
      </el-table-column>
      <el-table-column prop="pro_ban" label="Pro Ban Count"> </el-table-column>
    </el-table>
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
