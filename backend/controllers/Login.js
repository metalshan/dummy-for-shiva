"use strict"

let BaseController = localrequire('baseController');
let UserModel = localrequire('backend.models.User.model');
let userMonitor = localrequire('backend.services.user-monitor');
let sessionManager = localrequire("sessionManager");

class Login extends BaseController {
	constructor(){
		super();
		this.model = new UserModel();
				
		//do your stuffs here
	}

	create(obj){
		let uiModel = this.model.createUIModel(obj); //creating a propert ui contract object
		uiModel.validate(); //validating the model

		return new Promise((resolve, reject) => {
			if(uiModel.isValid){
				this.model.importFromUIModel(uiModel); //if ui model is valid, update the app model

				//in case already found
				this.dbClient.findById(this.model.userid, "userid", "loggedInUsers").then((data)=>{
					let user = this.model.importFromDBModel(data);
					userMonitor.updateLastActive(this.model._id); //update last active time
					sessionManager.set(this.session, {userid: this.model.userid});
					resolve(user.exportToUIModel());
				}, ()=>{
					//create user
					let dbObject = this.model.exportToDBModel(); 
					this.dbClient.save(dbObject, "loggedInUsers").then( (obj) => {
						sessionManager.set(this.session, {userid: this.model.userid});					
						resolve(this.model.exportToUIModel()); //if saved successfully, return the saved object id
					}, function () {
						resolve("UNKNOWN ERROR!!"); //in case of error
					});	
				});				
			}
			else{
				resolve(uiModel.validationErrors);
			}
		});
	}
}

module.exports = Login;