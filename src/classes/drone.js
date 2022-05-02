import { Vehicle } from "./vehicle.js";

export class Drone extends Vehicle {
    constructor(license, model, latLong) {
        super(license, model, latLong);
        this.airTimeHours = null;//properties for the drone that are specific to the drone only. 
        this.base = null;//the 3 parameters are being passed in from the perent class, in this case "vehicle"
    };
};