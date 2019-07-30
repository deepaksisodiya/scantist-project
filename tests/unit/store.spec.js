import { mutations, getters } from "../../src/store";

describe("Store.js", () => {
  test("set loading state to true", () => {
    const state = {
      isLoading: false,
      isError: false,
      heros: []
    };
    mutations.SET_LOADING_STATUS(state, true);
    expect(state.isLoading).toBe(true);
  });

  test("set error state to true", () => {
    const state = {
      isLoading: false,
      isError: false,
      heros: []
    };
    mutations.SET_ERROR_STATUS(state, true);
    expect(state.isError).toBe(true);
  });

  test("set heros to some value", () => {
    const state = {
      isLoading: false,
      isError: false,
      heros: []
    };
    mutations.SET_HEROS(state, [
      { id: 1, localized_name: "hero1" },
      { id: 2, localized_name: "hero2" }
    ]);
    expect(state.heros).toMatchSnapshot();
  });

  test("testing getters for filterHerosByName", () => {
    const state = {
      heros: [
        { id: 1, localized_name: "Deepak" },
        { id: 2, localized_name: "Piyush" },
        { id: 1, localized_name: "Mayur" },
        { id: 1, localized_name: "Ankur" }
      ]
    };
    const filterHeros = getters.filterHerosByName(state)("dee");
    expect(filterHeros).toMatchSnapshot();
    expect(filterHeros.length).toBe(1);
  });
});
