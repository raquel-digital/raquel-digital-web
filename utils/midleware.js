const mongoCrud = require("../api/mongo");
const catchPass = require("./catchPass")

var loginOk = false;
var adminOk = false;

const middlewares = {

    isLogin : async function (req, res, next) {
        let log = req.body;
        const check = await mongoCrud.checkLogin(log);
        if(check){
             catchPass.catchPass(log);   
             return next();  
        }else{
            res.redirect("/failure")
        }
    },
    logged : function (req, res, next) {        
        if(loginOk || adminOk){           
              return next()
        }else{            
            res.redirect('/login')
            return next();
        }
    },
    superAdmin : function (req, res, next){
        if(adminOk){
            return next()
      }else{
          res.redirect('/login')
          return next();
      }
    },
    superAdminCheck : function () {
        if(adminOk){
            return true;
        }else{
            return false;
        }
    },
    salir: function () {
        loginOk = false;
        adminOk = false;
        console.log("fue")
    }
    
};
module.exports = middlewares;