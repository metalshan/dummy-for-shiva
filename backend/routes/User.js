"use strict"

let BaseRoute = localrequire('baseRoute');
let UserController = localrequire('backend.controllers.User');

/**
 * Providing path is mandatory. 
 * @type {String}
 */
const path = "/User";


 //for custom route configuration uncomment the following 
const routeConfig = {
    "/chat" : {
        "method": "post",
        "function": "chat"
    },
    "/getchat" : {
        "method": "get",
        "function": "getchat"
    },
}


class User extends BaseRoute{
    constructor(path){
        super(path);
        //do your stuffs here
    }

	//A must have function
	createController(){
	    return new UserController();
	}
				
    getRouteConfig(){
        return routeConfig;
    }

    //A must have function
    getPath(){
        return path;
    }

    //[GET] : /
    findAll(req, res){
        this.controller.findAll().then(function (response) {
           res.json(response);
        });
    }

    chat(req, res){
        this.controller.chat(req.body).then((response)=>{
            res.end(response);
        })
    }

    getchat(req, res){
        this.controller.getChat().then(response=>{
            res.json(response);
        })
    }

/*
    //[POST] : /
    create(req, res){
    }

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

module.exports = new User();
