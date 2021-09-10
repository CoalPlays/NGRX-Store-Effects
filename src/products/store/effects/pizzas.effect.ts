import { Injectable } from "@angular/core";
import { Effect, Actions } from "@ngrx/effects";
import * as pizzaActions from "../actions/pizza.actions";
import { catchError, map, switchMap } from "rxjs/operators";
import * as fromServices from "../../services";
import { of } from "rxjs/observable/of";
import * as fromRoot from "../../../app/store";

@Injectable()
export class PizzasEffect {
  constructor(
    private acttions$: Actions,
    private pizzaService: fromServices.PizzasService
  ) {}
  @Effect()
  loadPizza$ = this.acttions$.ofType(pizzaActions.LOAD_PIZZAS).pipe(
    switchMap(() => {
      return this.pizzaService.getPizzas().pipe(
        map((pizzas) => new pizzaActions.LoadPizzaSuccess(pizzas)),
        catchError((error) => of(new pizzaActions.LoadPizzasFail(error)))
      );
    })
  );
  @Effect()
  createPizza$ = this.acttions$.ofType(pizzaActions.CREATE_PIZZA).pipe(
    map((action: pizzaActions.CreatePizza) => action.payload),
    switchMap((pizza) => {
      return this.pizzaService.createPizza(pizza).pipe(
        map(
          (pizza) => new pizzaActions.CreatePizzaSuccess(pizza),
          catchError((error) => of(new pizzaActions.CreatePizzaFail(error)))
        )
      );
    })
  );

  @Effect()
  createPizzaSuccess$ = this.acttions$
    .ofType(pizzaActions.CREATE_PIZZA_SUCCESS)
    .pipe(
      map((action: pizzaActions.CreatePizzaSuccess) => action.payload),
      map((pizza) => {
        return new fromRoot.Go({
          path: ["/products", pizza.id],
        });
      })
    );

  @Effect()
  updatePizza$ = this.acttions$.ofType(pizzaActions.UPDATE_PIZZA).pipe(
    map((action: pizzaActions.UpdatePizza) => action.payload),
    switchMap((pizza) => {
      return this.pizzaService.updatePizza(pizza).pipe(
        map((pizza) => new pizzaActions.UpdatePizzaSuccess(pizza)),
        catchError((error) => of(new pizzaActions.UpdatePizzaFail(error)))
      );
    })
  );
  @Effect()
  removePizza$ = this.acttions$.ofType(pizzaActions.REMOVE_PIZZA).pipe(
    map((action: pizzaActions.RemovePizza) => action.payload),
    switchMap((pizza) => {
      return this.pizzaService.removePizza(pizza).pipe(
        map(() => new pizzaActions.RemovePizzaSuccess(pizza)),
        catchError((error) => of(new pizzaActions.RemovePizzaFail(error)))
      );
    })
  );
  @Effect()
  handlePizzaSuccess$ = this.acttions$
    .ofType(
      pizzaActions.UPDATE_PIZZA_SUCCESS,
      pizzaActions.REMOVE_PIZZA_SUCCESS
    )
    .pipe(
      map((pizza) => {
        return new fromRoot.Go({
          path: ["/products"],
        });
      })
    );
}
