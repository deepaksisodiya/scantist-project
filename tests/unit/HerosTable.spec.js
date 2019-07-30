import { shallowMount } from "@vue/test-utils";

import HerosTable from "./../../src/components/HerosTable.vue";

describe("HerosTable", () => {
  test("Test for isLoading condition", () => {
    const wrapper = shallowMount(HerosTable, {
      mocks: {
        $store: {
          state: {
            isLoading: true,
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
        }
      }
    });

    expect(wrapper).toMatchSnapshot();
  });
});
