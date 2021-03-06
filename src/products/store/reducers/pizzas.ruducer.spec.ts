import * as fromPizzas from "./pizzas.reducer";
import * as fromAction from "../actions/pizza.actions";

import { Pizza } from "../../models/pizza.model";

describe("PizzasReducer", () => {
  describe("undefined action", () => {
    it("should return the default state", () => {
      const { initialState } = fromPizzas;
      const action = {} as any;
      const state = fromPizzas.reducer(undefined, action);
      expect(state).toBe(initialState);
    });
  });
  describe("LOAD_PIZZAS action", () => {
    it("should set loading to true", () => {
      const { initialState } = fromPizzas;
      const action = new fromAction.LoadPizzas();
      const state = fromPizzas.reducer(initialState, action);
      expect(state.entities).toEqual({});
      expect(state.loaded).toEqual(false);
      expect(state.loading).toEqual(true);
    });
  });
  describe("LOAD_PIZZAS_SUCCESS action", () => {
    it("should map an array to entities", () => {
      const pizzas: Pizza[] = [
        { id: 1, name: "Pizza#1", toppings: [] },
        { id: 2, name: "Pizza#2", toppings: [] },
      ];
      const entities = {
        1: pizzas[0],
        2: pizzas[1],
      };
      const { initialState } = fromPizzas;
      const action = new fromAction.LoadPizzaSuccess(pizzas);
      const state = fromPizzas.reducer(initialState, action);
      expect(state.entities).toEqual(entities);
      expect(state.loaded).toEqual(true);
      expect(state.loading).toEqual(false);
    });
  });
});
