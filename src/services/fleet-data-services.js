import {Car} from "../classes/car.js";
import {Drone} from "../classes/drone.js";

export class FleetDataService {
    constructor() {
        this.cars = [];
        this.drones = [];
    };

    loadData(fleet) {
        for(let data of fleet) {//data becomes an instance of fleet. it inherits its properties. the for of loop loops thru all the indexes of the fleet array, which is an object
            switch(data.type) {//if the data type of each object
                case "car"://is a car then
                    this.cars.push(data);//it pushes the object that is a car, into the cars array, in the constructor above
                    break;
                case "drone"://is a drone
                    this.drones.push(data);
                    break;    
            };
            
        };
        
    };
};
