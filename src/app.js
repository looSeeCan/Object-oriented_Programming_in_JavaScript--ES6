console.log("in app.js");//in order to run this, we have to run the lite-server from the command line
// go to package.json, in the script section add "dev": "lite-server"
//now we can run, npm run dev
// I had a 404 error. could not figure it out for a bit... I forgt to make the src folder 

//So here in app.js, we are working with a module. We know this because when we look at the html file we System.import(src/app.js)
//most importantly modules do not polute the global name space, so it is not necessary to create IIFEs. TODO: WTH IS AN IIFE
let droneId = 5;
console.log(window.droneId);//so something about or modules are automatically in strict mode. We want to have strict mode. we want to prevent variables from being declared at a global level 