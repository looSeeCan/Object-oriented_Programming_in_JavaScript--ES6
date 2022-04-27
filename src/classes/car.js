import { Vehicle } from "./vehicle.js";//autocomplete left the .js out of this folder extension here, which gave a 404 error. I added the .js manually and that fixed


export class Car extends Vehicle {
    constructor() {
        super(license, model, lotLong);
        this.miles = miles;
        this.make = null;
        this.model = null;
    };

};