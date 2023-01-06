const sqlDB = require('./connection/sql')


let nextIndex = '';


function storeNextIndex(){
    sqlDB.query("SELECT * FROM movies ORDER BY tconst DESC LIMIT 1", function (err, result, fields) { 
        nextIndex=incrementIndex(result[0].tconst)
    });
}


function incrementIndex(value){
let nextNumber = "tt" + ("00000" + (parseInt(value.slice(2)) + 1)).slice(-7);
return nextNumber

}

module.exports = {
  getNextIndex:       () => nextIndex,
  storeNextIndex: ()=>storeNextIndex()
};



