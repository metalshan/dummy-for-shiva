"use strict"

let BaseController = localrequire('baseController');
let UserModel = localrequire('backend.models.User.model');
let ChatModel = localrequire('backend.models.Chat.model');
let sessionManager = localrequire("sessionManager");

class User extends BaseController {
	constructor(){
		super();
		this.model = new UserModel();
				
		//do your stuffs here
	}

	findAll(){
		return new Promise((resolve, reject) => {
			this.dbClient.findAll("loggedInUsers").then((data) => {
				let users = data.createDBModel(UserModel);
				resolve(users.exportToUIModel());
			}, ()=>{
				resolve("no records");
			});
		});
	}


	getChat(){
		return new Promise((resolve, reject) => {
			let query = {to: sessionManager.get(this.session, "userid")}
			if(this.request.params.since){
				let since = +this.request.params.since;
				query.sentOn = {
					$gt: since
				}
			}

			this.dbClient.findAll("chats", query).then((data) => {
				let chats = data.createDBModel(ChatModel);
				resolve(chats.exportToUIModel());
				//delete the retreved chats
			}, ()=>{
				resolve("no records");
			});
		});
	}

	chat(body){
		return new Promise((resolve, reject)=>{
			let uiChatModel = new ChatModel().createUIModel(body);
			uiChatModel.validate();
			if(uiChatModel.isValid){
				let appChatModel = new ChatModel().importFromUIModel(uiChatModel);
				appChatModel.from = sessionManager.get(this.session, "userid");
				this.dbClient.save(appChatModel.exportToDBModel(), "chats");
				resolve("sent")
			} else {
				resolve("not sent")
			}
		});
	}

}

module.exports = User;