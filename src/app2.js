import {Car} from "./classes/car.js";
import {Drone} from "./classes/drone.js";
import {fleet} from "./fleet-data.js";//fleet is not capitalized, because it is not a class. Its just an object literal, which is an array of objects
import {FleetDataService} from "./services/fleet-data-services.js";

// debugger;
console.table(fleet);

let dataService = new FleetDataService();//calls the FleetDataService class, which builds an empty object with the specified arrays
console.log("data service:", dataService); //logs an object with the specified arrays that are empty
dataService.loadData(fleet);//calls the loadData method in the class FleetDataService. Passes fleet as an argument. This method fills the arrays with the specified values

// console.table(dataService.cars);
// console.table(dataService.drones);

// for (let car of dataService.cars)//!!So I was stuck here for a bit, because, I had an ";" at the end of this line. it was giving me an error that it did not recognize "car".
//     console.log(car.license);//I realized that I could use the {} to nest this statement or just write it like this
console.log("dataService:", dataService); //logs an object with the specified arrays that are empty
console.table(dataService); //logs an object with the specified arrays that are empty
console.log("errors", dataService.errors);
console.table(dataService.errors);
for (let e of dataService.errors)
    console.log(`message: ${e.message}: ${e.data.type}`);

// debugger;
let car = dataService.getCarByLicense("AT2000");//retrieve cars by license number
console.log(car);

debugger;
//what if we wanted to return alll cars sorted by the license number.
console.table(dataService.cars);
let cars = dataService.getCarsSortedByLicence();
console.table(cars);

