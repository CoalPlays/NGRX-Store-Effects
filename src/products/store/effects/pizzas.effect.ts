import { Injectable } from "@angular/core";
import { Effect, Actions } from "@ngrx/effects";
import * as pizzaActions from "../actions/pizza.actions";
import { catchError, map, switchMap } from "rxjs/operators";
import * as fromServices from "../../services";
import { of } from "rxjs/observable/of";

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
}
