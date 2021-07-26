import { carActionsType } from "./carActionTypes";

const INITIAL_STATE = {
  allCars: [],
  car: {},
};

const carsReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case carActionsType.GET_ALL_CARS:
      return {
        ...state,
        allCars: payload,
      };
    case carActionsType.FETCH_SINGLE_CAR:
      return {
        ...state,
        car: payload,
      };

    default:
      return state;
  }
};

export default carsReducer;
