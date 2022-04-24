import {Car} from "./classes/car.js";
import {Drone} from "./classes/drone.js";
import {fleet} from "./fleet-data.js";//fleet is not capitalized, because it is not a class. Its just an object literal, which is an array of objects
import {FleetDataService} from "./services/fleet-data-services.js";


console.table(fleet);
let dataService = new FleetDataService();
console.log("data service:", dataService);//this new dataservice is an object with empty arrays
dataService.loadData(fleet);//calls the loadData method in the class FleetDataService. Passes fleet as an argument. This method fills the arrays with the specified values
console.table(dataService.cars);
console.table(dataService.drones);
