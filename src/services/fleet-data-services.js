import {Car} from "../classes/car.js";
import {Drone} from "../classes/drone.js";
import { DataError } from "./data-error.js"; 

export class FleetDataService {
    constructor() {
        this.cars = [];
        this.drones = [];
        this.errors = [];//when working with data feeds, they are usually prone to errors. there will be values that are not expected, even objects that are unexpected. As we get errors, they wil be dumped into the array
    };

    loadData(fleet) {
        for(let data of fleet) {//data becomes an instance of fleet. it inherits its properties. the for of loop loops thru all the indexes of the fleet array of objects,
            switch(data.type) {//if the type of each object in the fleet array: array > object > type >
                case "car"://is a car then instantiate a car 
                    let car = this.loadCar(data);//call a function called loadCar passing it "data", which is going to be a car object from the fleet array. We assign the function to a variable 
                    this.cars.push(car);//it pushes the object that is a car, into the cars array, in the constructor above
                    break;
                case "drone"://is a drone
                    this.drones.push(data);//it pushes the object that is a drone, into the drone array
                    break;    
                default:
                    let e = new DataError("Invalid vehicle type", data);//when there is an invalid vehicle type -in this case where drone is misspelt "ddrone", DataError class will be called
                    this.errors.push(e);
                    break;    
            };  

            
        };
    };
    
    loadCar(car) {
    try {
        let c = new Car(car.license, car.model, car.latLong);//instantiate a new car "c". calls the Car class in car.js
        c.miles = car.miles;
        c.make = car.make;
        return c;
    } catch(e) {
        this.errors.push(new DataError("error loading car", car));
    };
    return null;
    };
};
