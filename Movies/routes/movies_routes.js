const express = require("express")
const { statusCode } = require('../../constants')
const router = express.Router()
const sqlDB = require('../../connection/sql')
let { getNextIndex, storeNextIndex } = require('../../next_index');


router.route("/api/v1/longest-duration-movies").get((req,res)=>{
    sqlDB.query("SELECT * FROM movies ORDER BY runtimeMinutes DESC LIMIT 10", function (err, result, fields) {
       apiResponse(req,res,err,result)
      });
    })


router.route("/api/v1/new-movie").post((req,res)=>{
    if(validateData(req.body,res)==true){
        sqlDB.query(`INSERT INTO movies (tconst, titleType, primaryTitle, runtimeMinutes, genres) VALUES ("${getNextIndex()}", "${req.body.titleType}", "${req.body.primaryTitle}", "${req.body.runtimeMinutes}", "${req.body.genres}");`, function (err, result, fields) {
            apiResponse(req,res,err,result)
            storeNextIndex()
          });
    }
})






router.route("/api/v1/top-rated-movies").get((req,res)=>{

    sqlDB.query("SELECT movies.tconst, movies.primaryTitle, movies.genres, ratings.averageRating FROM movies INNER JOIN ratings ON movies.tconst = ratings.tconst WHERE ratings.averageRating > 6.0ORDER BY ratings.averageRating ASC", function (err, result, fields) {
        apiResponse(req,res,err,result)
      });

})



function apiResponse(req,res,err,result){
        if(err){
            return res.json({status:statusCode.STATUS_ERROR,message:err})
        }
        else{
            return res.json({status:statusCode.STATUS_SUCCESS,message:"success",data:result})
        }
    }



function validateData(data,res){
if(data.titleType===''||data.titleType===null){
    return res.json({status:statusCode.STATUS_ERROR,message:"Title type missing"})
}else if(data.primaryTitle===''||data.primaryTitle===null){
    return res.json({status:statusCode.STATUS_ERROR,message:"Primary Title missing"})
}else if(data.runtimeMinutes<=0||data.runtimeMinutes===null){
    return res.json({status:statusCode.STATUS_ERROR,message:"Runtime Minutes Missing"})
}else if(data.genres===''||data.genres===null){
    return res.json({status:statusCode.STATUS_ERROR,message:"Genres Missing"})
}else{
    return true;
}
}


module.exports = router
