import { mutations } from "../../src/store";

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
      { id: 1, name: "hero1" },
      { id: 2, name: "hero2" }
    ]);
    expect(state.heros).toMatchSnapshot();
  });
});
