import * as fromPizza from "./pizza.actions";
import { LoadPizzaSuccess } from "./pizza.actions";

describe("Pizzas Actions", () => {
  describe("loadPizzas Actions", () => {
    describe("loadPizzas", () => {
      it("should create an action", () => {
        const action = new fromPizza.LoadPizzas();
        expect({ ...action }).toEqual({
          type: fromPizza.LOAD_PIZZAS,
        });
      });
    });
    describe("loadPizzasFail", () => {
      it("should create an action", () => {
        const payload = { message: "load Error" };
        const action = new fromPizza.LoadPizzasFail(payload);
        expect({ ...action }).toEqual({
          type: fromPizza.LOAD_PIZZAS_FAIL,
          payload,
        });
      });
    });
    describe("loadPizzasSuccess", () => {
      it("should create an action", () => {
        const payload = [
          {
            name: "blazin inferno",
            toppings: [
              {
                id: 12,
                name: "tomato",
              },
              {
                id: 6,
                name: "mushroom",
              },
              {
                id: 5,
                name: "mozzarella",
              },
              {
                id: 3,
                name: "basil",
              },
              {
                id: 10,
                name: "pepperoni",
              },
              {
                id: 9,
                name: "pepper",
              },
              {
                id: 1,
                name: "anchovy",
              },
            ],
            id: 1,
          },
          {
            name: "Seaside Surfin'",
            toppings: [
              {
                id: 6,
                name: "mushroom",
              },
              {
                id: 7,
                name: "olive",
              },
              {
                id: 2,
                name: "bacon",
              },
              {
                id: 3,
                name: "basil",
              },
              {
                id: 1,
                name: "anchovy",
              },
              {
                id: 8,
                name: "onion",
              },
              {
                id: 11,
                name: "sweetcorn",
              },
              {
                id: 9,
                name: "pepper",
              },
              {
                id: 5,
                name: "mozzarella",
              },
            ],
            id: 2,
          },
          {
            name: "Plain Ol' Pepperoni",
            toppings: [
              {
                id: 10,
                name: "pepperoni",
              },
              {
                id: 3,
                name: "basil",
              },
              {
                id: 7,
                name: "olive",
              },
              {
                id: 1,
                name: "anchovy",
              },
              {
                id: 5,
                name: "mozzarella",
              },
              {
                id: 12,
                name: "tomato",
              },
              {
                id: 11,
                name: "sweetcorn",
              },
            ],
            id: 3,
          },
          {
            name: "Raquel",
            toppings: [
              {
                id: 12,
                name: "tomato",
              },
              {
                id: 11,
                name: "sweetcorn",
              },
              {
                id: 10,
                name: "pepperoni",
              },
              {
                id: 4,
                name: "chili",
              },
              {
                id: 5,
                name: "mozzarella",
              },
              {
                id: 6,
                name: "mushroom",
              },
              {
                id: 2,
                name: "bacon",
              },
            ],
            id: 4,
          },
        ];
        const action = new fromPizza.LoadPizzaSuccess(payload);
        expect({ ...action }).toEqual({
          type: fromPizza.LOAD_PIZZAS_SUCCESS,
          payload,
        });
      });
    });
  });
});
