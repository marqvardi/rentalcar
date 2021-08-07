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
    case carActionsType.RETURN_CAR:
      return {
        ...state,
        car: { ...state.car, available: false },
      };

    default:
      return state;
  }
};

// const returnCarUpdate = async (allCars, carId) => {
//   return await allCars.map((car) =>
//     car.id === carId ? { ...car, carAvailable: true } : car
//   );
// };

export default carsReducer;
