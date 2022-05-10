import {Car} from "../classes/car.js";
import {Drone} from "../classes/drone.js";
import { DataError } from "./data-error.js"; 

export class FleetDataService {
    constructor() {
        this.cars = [];
        this.drones = [];
        this.errors = [];//when working with data feeds, they are usually prone to errors. there will be values that are not expected, even objects that are unexpected. As we get errors, they wil be dumped into the array
    };

    getCarByLicense(license) {
        return this.cars.find(car => {//.find loops thru the array(car is a parameter that becomes the index in the this.cars array) and finds the first element in the array that 
            return car.license === license; //matches the parameter license. it will loop untill it matches
        }) 
    };

    getCarsSortedByLicence() {
        return this.cars.sort((car1, car2) => {
            if(car1.license < car2.license) return -1;
            if(car1.license > car2.license) return 1;
            return 0;
        });
    };

    loadData(fleet) {
        for(let data of fleet) {//data becomes an instance of fleet. it inherits its properties. the for of loop loops thru all the indexes of the fleet array of objects,
            switch(data.type) {//if the type of each object in the fleet array: array > object > type >
                case "car"://is a car then instantiate a car
                    if (this.validateCarData(data)) {//we need to do some validation before we load the data. if ValidateCarData returns true, in this case true means it does not have errors: !hasErrors = true
                        let car = this.loadCar(data);//call a function called loadCar passing it "data", which is going to be a car object from the fleet array. We assign the function to a variable 
                        if (car)
                            this.cars.push(car);//it pushes the object that is a car, into the cars array, in the constructor above
                    } else {//if valideateCarData does have errors. !hasError = false
                        let e = new DataError("invalid car data", data);//in the validateCar is a log and here is the log of that
                        this.errors.push(e);
                    };
                    
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
        try {//what happends if some type of exception is raised when this car is created. we can watch for that and store any errors in the errors array
            let c = new Car(car.license, car.model, car.latLong);//instantiate a new car "c". calls the Car class in car.js
            c.miles = car.miles;
            c.make = car.make;
            return c;
        } catch(e) {
            this.errors.push(new DataError("error loading car", car));
        };
        return null;
    };

    validateCarData(car) {
        let requiredProps = "license model latLong make miles".split(" ");//split method. takes the string and enters theme into an array. each word is its own index
        let hasErrors = false;
        
        for(let field of requiredProps) {
            if(!car[field]) {//if the field in requiredProps is not recognized as one of the keys in the car object 
                this.errors.push(new DataError(`invalid field ${field}`, car))//then it will call on the DataError Class and pass the specified arguments
                hasErrors = true;
            }
        };
        if (Number.isNaN(Number.parseFloat(car.miles))) {//pretty sure this checks to see that the value is some type of number
            this.errors.push(new DataError("invalid mileage", car));
            hasErrors = true;
        }
        return !hasErrors;
    };
};
