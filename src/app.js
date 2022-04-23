console.log("in app.js");//in order to run this, we have to run the lite-server from the command line
// go to package.json, in the script section add "dev": "lite-server"
//now we can run, npm run dev
// I had a 404 error. could not figure it out for a bit... I forgt to make the src folder 

//So here in app.js, we are working with a module. We know this because when we look at the html file we System.import(src/app.js)
//most importantly modules do not polute the global name space, so it is not necessary to create IIFEs. TODO: WTH IS AN IIFE
let droneId = 5;
console.log(droneId);//so something about or modules are automatically in strict mode. We want to have strict mode. we want to prevent variables from being declared at a global level
//and we want to avoid IIFE'S.

//Class basics
(() => {
    console.group("Constructor"); 
    class Drone {
        constructor(id, name) {
            // console.log(id);//by executing "new Drone" below. Drone's constructor will automatically be called
            this.id = id;//normally what we want to do in a constructor is to create instance variables
            this.name = name;//we use the "this" keyword to refer to the instance being created
        }
    };
    console.log(typeof Drone);//type of Drone = function
    
    let drone = new Drone("A123", "Flyer");
    console.log("The drones id and name:", `drone: ${drone.id} ${drone.name}`);
    console.log(typeof drone);//object
    console.log("Is the drone an instance of the class Drone?:", drone instanceof Drone);//true. this is an istance of the class Drone
    // console.log("----------------------------------------------");
    console.groupEnd();
})();

(() => {
    console.group("Static Properties");
    //its important to understand the diff between instance properties and class properties.
    class Drone {
        constructor(id, name) {
            this.id = id;
            this.name = name;
            
        };
    };
    console.log("Drone.prototype;", Object.getOwnPropertyDescriptor(Drone.prototype, "id"));//idk why this is not working
    let drone = new Drone("A123", "Flyer");//each instance of drone will have its own set of properties
    console.log("drone.__proto__", drone.__proto__);
    console.log("ok so this is undefined because there is no name value set to the drone proto:", Object.getOwnPropertyDescriptor(drone.__proto__, "name"));//
    console.log("now there is a name value on the actual instance of the object:", Object.getOwnPropertyDescriptor(drone, "name"));
    Object.defineProperty(drone, "name", {enumerable: false});
    console.log("descriptor:", Object.getOwnPropertyDescriptor(drone, "name"));
    
    
    let drone2 = new Drone("B456", "Twirl");
    console.log(`${drone.id} ${drone2.id}`);
    
    console.log("so lets add a static property to Drone");
    Drone.maxHieght = 2000;//this is a static property on the class Drone only. its not on any instance
    console.log(Drone);//how come I do not see this property that I just added when I log the Drone here
    console.log("lets access that:", Drone.maxHieght);
    console.log("lets try to access that with a new instance:", drone.maxHieght);//undefined

    console.groupEnd();
})();

(() => {
    console.group("Static Methods");
        class Drone {
            constructor(id, name) {
                this.id = id;
                this.name = name;
            };
            static getCompany() {
                return `This is a static method`
            };
            fly() {
                // console.log(`${this.id}`)
                return `${this.name} is flying.`
            };
        };        
        let drone = new Drone("A1234", "Lucycan");
        let drone2 = new Drone("B1234", "Sheng");
        console.log("the method fly is not static to the Drone class:", Drone);
        console.log("it is here though in the instance drone.__proto:", drone.__proto__);
        console.log(drone.fly(), drone2.fly());

        console.log("static getCompany:", Drone.getCompany());
        console.log("I can not access getCompany from an instance:", drone.getCompany);

    console.groupEnd();
})();

(() => {
    console.group("Create a class from scratch.");//TODO:
        //can I create a this or a static property and log and see it
        class Drone {
            constructor() {

            };
        };
        
        console.log(Drone);
        
    console.groupEnd();
})();

(() => {
    console.group("Getter and Setters");
        class Drone {
            constructor(id, name) {
                this._id = id;//this underscore convention means that the developer intended it to be private. there are no private variables in JS classes
                //this does not need to be named this. it could be named anything. NOTE*: why would you use this example then. It's confusing
                this.name = name;
            };

            get id() {//so with this getter we can access the id above like a property below "drone.id". Use for any case when you need to execute a function when all you really need is the property
                return `${this._id} TEMPERARY`;
            };
            set id(value) {
                this._id = value;
            };
        };
        
        let drone = new Drone("A123", "Sheng Yang");
        drone.id = `B456`;
        console.log(drone.id);//I dont quite understand this. Something about you can not access because the "this._id" is diff. So you have to use a getter
    console.groupEnd();
})();

(() => {
    console.group("Inheretance amd Code Organization");
        //remember that the top class is OBJECT
    
        class Vehicle {
            constructor(licenseNum) {//storing licenseNUm in the Vehicle will make sure that every vehicle willl have access to the variable
                this.licenseNum = licenseNum;
                this.gpsEnabled = true;
            };
        };
        class Drone extends Vehicle {
            
        };
        class Car extends Vehicle { 
            //but you cannot have a constructor here without the super. You will get an error: Must call Super
            //we must execute the constructor in which car is derived from first. In this case Vehicle
            constructor(licenseNum) {
                super(licenseNum); //now with this super key word. both constructors are executing without error. Also even if the constructor is not declared up in Vehicle. JS
                //by default adds a constructor. So we have to use this super() key word no matter what.
                // console.log(`constructing Car`);
                this.gpsEnabled = false;
            };
        };
        
        let c = new Car("AM1234");
        console.log("is c an instance of Car:", c instanceof Car, " and is c an instance of Vehicle:", c instanceof Vehicle);
        //c^ is an instance of both because the key word "extends" in Car inherits the Vehicle class also do not forget about OBJECT
        console.log("c also inherits from OBJECT:", c instanceof Object);
        console.log(c);
        console.log(c.licenseNum);

        console.log(c.gpsEnabled);//i can access this, but what if I wantedd to change this to false in my car class
    console.groupEnd();
})();

(() => {
    console.group('Inheriting Methods');
        class Vehicle {
            static getCompany() {
                return `i.c.stars`;
            };
            start() {
                return `starting Vehicle`;
            };
        };
        class Car extends Vehicle {
            start() {
                //if we want both to execute, we can add super
                // super.start();//invokes the Vehicle "start" method first 
                return `starting Car`;
                
            };
        };

        let c = new Car();
        console.log(c.start());//now in the situation of methods, the base will execute first without "super"
        console.log(Car.getCompany());//the static method in Vehicle will be accessible by any derived class.
        // console.log(c.getCompany());// but the instance can still not access it.
    console.groupEnd();
})();