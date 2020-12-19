import immer from "immer";
import { useState } from "react";
import _ from "lodash";

/***
 * Nifty state helper for object states.
 * Wraps the normal React useState so that the update function accepts either:
 *    1. A partial of the state object object that gets shallowly merged in (similar to how the classic setState function worked)
 *    2. An "Immer" function that let's you mutate the current state to create a new state
 *
 * Example:
 *
 * const [fooState, setFooState] = useImmutableState({foo: 'old', someProp: 'old'})
 * setFooState({foo: 'new'}) //Merged shallowly in
 * console.info(fooState) // {foo: 'new', someProp: 'old}
 *
 * const [barState, setBarState] = useImmutableState({bar: 'old', someProp: 'old})
 * setState(currState => {
 *   currState.bar = 'new'
 * }) //The mutated object becomes the new state
 * console.info(barState) // {bar: 'new', someProp: 'old}
 *
 */

export type ImmutableStateSetter<T> = (
  partialOrChangeFn: Partial<T> | ((a: T) => void)
) => void;

export function useImmutableState<T extends Record<string, any>>(
  initValue: T
): [T, ImmutableStateSetter<T>] {
  const [state, setState] = useState(initValue);

  function setImmerState(
    partialOrChangeFn: Partial<T> | ((a: T) => void)
  ): void {
    setState((currState) => {
      if (typeof partialOrChangeFn === "function") {
        return immer(currState, partialOrChangeFn) as any;
      } else {
        return Object.assign({}, currState, partialOrChangeFn);
      }
    });
  }

  return [state, setImmerState];
}

const magicDeleteValue: any =
  "___________DELETE_____vsqqwoKR0uX5SQTmVoTPqSH0AWItNyTyu0W2shYlcZyCGqi1jZQ";

function removeMagicDelete(obj: any) {
  if (typeof obj === "object") {
    let newObj: any = {};
    for (let i in obj) {
      if (typeof obj[i] === "string" && obj[i] === magicDeleteValue) {
        // Do nothing since we want that node deleted
      } else if (typeof obj[i] === "object") {
        newObj[i] = removeMagicDelete(obj[i]);
      } else {
        newObj[i] = obj[i];
      }
    }
    return newObj;
  } else {
    return obj;
  }
}

export function useDeepMergeState<T extends Record<string, any>>(
  initValue: T
): [T, (t: Optional<T>) => T] {
  const [state, setState] = useState(initValue);

  function setImmerState(partial: Optional<T>): T {
    let newState: any = removeMagicDelete(_.merge({}, state, partial));
    setState(newState);
    return newState;
  }

  return [state, setImmerState];
}
useDeepMergeState.magicDeleteValue = magicDeleteValue;

export type Optional<T> = { [P in keyof T]?: Optional2<T[P]> };
type Optional2<T> = { [P in keyof T]?: Optional3<T[P]> };
type Optional3<T> = { [P in keyof T]?: Optional4<T[P]> };
type Optional4<T> = { [P in keyof T]?: Optional5<T[P]> };
type Optional5<T> = { [P in keyof T]?: Optional6<T[P]> };
type Optional6<T> = { [P in keyof T]?: Optional7<T[P]> };
type Optional7<T> = { [P in keyof T]?: Optional8<T[P]> };
type Optional8<T> = { [P in keyof T]?: any };
