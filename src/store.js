import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoading: false,
    isError: false,
    heros: []
  },

  mutations: {
    SET_LOADING_STATUS(state, isLoading) {
      state.isLoading = isLoading;
    },
    SET_ERROR_STATUS(state, isError) {
      state.isError = isError;
    },
    SET_HEROS(state, heros) {
      state.heros = heros;
    }
  },

  actions: {
    async fetchHeros(context) {
      context.commit("SET_LOADING_STATUS", true);
      context.commit("SET_ERROR_STATUS", false);

      try {
        const response = await axios.get(
          "https://api.opendota.com/api/heroStats"
        );
        if (response.status === 200) {
          context.commit("SET_HEROS", response.data);
        }
      } catch (error) {
        context.commit("SET_ERROR_STATUS", true);
      } finally {
        context.commit("SET_LOADING_STATUS", false);
      }
    }
  },

  getters: {
    filterHerosByName: state => searchName => {
      return state.heros.filter(hero => {
        const name = hero.localized_name.toLowerCase();
        const search = searchName.toLowerCase();
        return name.includes(search);
      });
    }
  }
});
