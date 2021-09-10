import { TestBed } from "@angular/core/testing";
import { StoreModule, Store, combineReducers } from "@ngrx/store";

import * as fromRoot from "../../../app/store/reducers";
import * as fromReducer from "../reducers";
import * as fromAction from "../actions";
import * as fromSelctors from "../selectors/toppings.selectors";

import { Topping } from "../../models/topping.model";

describe("Toppings Selectors", () => {
  let store: Store<fromReducer.ProductsState>;
  const toppings: Topping[] = [
    { id: 1, name: "ham" },
    { id: 2, name: "tomato" },
    { id: 3, name: "cheese" },
  ];
  const entities = {
    1: toppings[0],
    2: toppings[1],
    3: toppings[2],
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          products: combineReducers(fromReducer.reducers),
        }),
      ],
    });
    store = TestBed.get(Store);
    spyOn(store, "dispatch").and.callThrough();
  });

  describe("getToppingEntitites", () => {
    it("should return toppings as entities", function () {
      let result;
      store.select(fromSelctors.getToppingsEntities).subscribe((value) => {
        result = value;
      });
      expect(result).toEqual({});
      store.dispatch(new fromAction.LoadToppingsSuccess(toppings));

      expect(result).toEqual(entities);
    });
  });
  describe("getSelectedToppings", () => {
    it("should return selected toppings as ids", function () {
      let result;
      store.select(fromSelctors.getSelectedToppings).subscribe((value) => {
        result = value;
      });
      store.dispatch(new fromAction.LoadToppingsSuccess(toppings));
      expect(result).toEqual([]);
      store.dispatch(new fromAction.VisualiseToppings([1, 3]));

      expect(result).toEqual([1, 3]);
    });
  });
});
