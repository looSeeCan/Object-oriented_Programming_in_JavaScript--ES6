import { Vehicle } from "./vehicle.js";//autocomplete left the .js out of this folder extension here, which gave a 404 error. I added the .js manually and that fixed


export class Car extends Vehicle {
    constructor(license, model, latLong) {
        super(license, model, latLong);//when the car is being instantiated, this super will call the parent class first, which is the Vehicle class
        this.miles = null;
        this.make = null;//why do these have to be set to null?
        
    };

};