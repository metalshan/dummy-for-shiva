"use strict"

let BaseRoute = localrequire('baseRoute');
let LoginController = localrequire('backend.controllers.Login');

/**
 * Providing path is mandatory. 
 * @type {String}
 */
const path = "/Login";

/**
 //for custom route configuration uncomment the following 
const routeConfig = {

}
*/

class Login extends BaseRoute{
    constructor(path){
        super(path);
        //do your stuffs here
    }

	//A must have function
	createController(){
	    return new LoginController();
	}
				

/*
    //Uncomment this function too if using custom route configuration
    getRouteConfig(){
        return routeConfig;
    }
*/
    //A must have function
    getPath(){
        return path;
    }

    //[GET] : /
    findAll(req, res){
        res.end("Route Login is working");
    }

    //[POST] : /
    create(req, res){
        var body = req.body;
    	this.controller.create(body).then(function (response) {
    	   res.json(response);
        });
    }


/*
    
    //[GET] : /:id
    findById(req, res){
    }

    //[PUT] : /:id
    update(req, res){
    }

    //[DELETE] : /:id
    deleteById(req, res){   
    }
*/

}

module.exports = new Login();
