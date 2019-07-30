import { shallowMount } from "@vue/test-utils";

import HerosTable from "./../../src/components/HerosTable.vue";

describe("HerosTable", () => {
  let store;

  beforeEach(() => {
    store = {
      state: {
        isLoading: false,
        isError: false,
        heros: []
      },
      getters: {
        filterHerosByName: () => {}
      },
      actions: {
        fetchHeros: () => {}
      },
      dispatch: () => {}
    };
  });

  test("Test for isLoading condition", () => {
    store.state.isLoading = true;

    const wrapper = shallowMount(HerosTable, {
      mocks: {
        $store: store
      }
    });

    expect(wrapper).toMatchSnapshot();
  });

  test("Test for isError condition", () => {
    store.state.isError = true;

    const wrapper = shallowMount(HerosTable, {
      mocks: {
        $store: store
      }
    });

    expect(wrapper).toMatchSnapshot();
  });

  test("Test for where we have heros data", () => {
    store.state.heros = [
      {
        id: 1,
        img: "/apps/dota2/images/heroes/antimage_full.png?",
        localized_name: "Deepak",
        pro_win: 34,
        pro_pick: 50,
        pro_ban: 80
      },
      {
        id: 2,
        img: "apps/dota2/images/heroes/axe_full.png?",
        localized_name: "Piyush",
        pro_win: 44,
        pro_pick: 52,
        pro_ban: 60
      },
      {
        id: 3,
        img: "/apps/dota2/images/heroes/bane_full.png?",
        localized_name: "Ankur",
        pro_win: 32,
        pro_pick: 23,
        pro_ban: 45
      },
      {
        id: 4,
        img: "/apps/dota2/images/heroes/bloodseeker_full.png?",
        localized_name: "Mayur",
        pro_win: 40,
        pro_pick: 60,
        pro_ban: 90
      }
    ];

    const wrapper = shallowMount(HerosTable, {
      mocks: {
        $store: store
      }
    });

    expect(wrapper).toMatchSnapshot();
  });
});
