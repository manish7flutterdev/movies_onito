  const sqlDB = require('./connection/sql')
  const { Router } = require("express")
  const express = require("express")
  const PORT = process.env.PORT || 5000
  const app = require('express')()
  const cors = require("cors")
  const routesArray = require("./routes_list")
  const server = require('http').createServer(app)
  let { getNextIndex, storeNextIndex } = require('./next_index');



  app.use(cors());
  app.use(express.json())
  app.route("/").get((req,res)=>{
      res.json("Movies Server")
      
  })
  server.listen(PORT,"0.0.0.0",()=>{
      console.log("Movie Server Started",PORT)
  })


sqlDB.connect(function(err) {
    if (err) throw err;
    else {
      storeNextIndex()
      console.log("DataBase Connected")
    }
  });












  
  
  routesArray.forEach((item,index)=>{
      let routeVariable = require(routesArray[index].routeDirectory)
      app.use(routesArray[index].route,routeVariable)
  })
  
  
  
  
  
  

