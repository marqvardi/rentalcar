import { createSelector } from "reselect";

const cars = (state) => state.cars;

export const getCars = createSelector([cars], (car) => car.allCars);

export const fetchSingleCar = createSelector([cars], (cars) => cars.car);
