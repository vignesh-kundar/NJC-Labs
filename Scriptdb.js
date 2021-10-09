const sqlite = require('sqlite3').verbose();
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const _ = require('lodash');

const app = express();

app.use(bodyParser.urlencoded({extended : true}));

app.set('view engine' ,'ejs');

var items = [] ,data =[];   


    let db = new sqlite.Database('./Movies.db' , (err)=> {
        if (err) {
           return console.log(error);
        }
    
        console.log('Connected to Movies DB');
    });
    

    
   
        db.run('CREATE TABLE IF NOT EXISTS movies(Id INTEGER PRIMARY KEY ,Year INTEGER, Name text NOT NULL , Actor text , Actress text , Director text )');
    
           
let sqlI = `INSERT INTO movies 
VALUES (  1, 2019, 'Uri' , 'Vicky kaushal' , 'Yami gautham' , 'Aditya dhar' ) ,
       (  2, 2014, 'Intersteller' , 'Mathew mcConaughey' , 'Anne hatway' , 'Christopher nolan'),
       (  3, 2010, 'Inception' , 'Leonardo diCaprio' , 'Elliot page' , 'Christoper nolan' ) ,
       (  4, 2009, 'Avatar' , 'Sam worthington' , 'Zoe saldana' , 'James cameron' ) ,
       (  5, 2008, 'The dark knight' , 'Christian bale' , 'Anne hatway' , 'Christopher nolan' ) ,
       (  6, 2008, 'Iron man' , 'Robert downey jr' , 'Gwyneth paltrow' , 'Jon favreau'  )`;


    db.run( sqlI ,(err) => {
            if(err) {
                 return console.log(err);
                  }
                  console.log("Row added * 6");
           }) ;
    //dummy input end..
 








app.get("/" , (req,res) => {
    

    let db = new sqlite.Database('./Movies.db');
    let sql = `SELECT * FROM movies`;
    
    db.all( sql , [] ,(err , row) => {
        if(err) {
            return console.log(err);
        }
        else {
       row.forEach((row) => {
        //  console.log(row.Name);
         items.push(row);
         })
            }
            console.log(items);
            return items;
       })
     
    
       res.render("index", {Items :items , Data : data});
       items=[];

       res.redirect("/");   
      
       db.close();

       res.redirect("/");  
});


app.post("/" ,(req,res) => {

    let db = new sqlite.Database('./Movies.db');

    var Temp = [
        Id = req.body.Id,
        Year = req.body.Year,
        Name = _.capitalize(req.body.Name) ,
        Actor = _.capitalize(req.body.Actor),
        Actress = _.capitalize(req.body.Actress),
        Director = _.capitalize(req.body.Director)
    ];

    console.log(Temp);

    res.redirect("/");

    db.run(`INSERT INTO movies VALUES(?, ?, ?, ?, ?, ?)` , Temp , (err) => {
        if(err) {
            return console.log(err);
        }
        console.log("Row added INTERSTELLER");
    });

db.close();
})


app.post("/search" , (req,res) => {

    data =[];

    let db = new sqlite.Database('./Movies.db');

    const dataField =  _.capitalize(req.body.searchD); 
    const dataQuery =  _.capitalize(req.body.searchQ);

    // console.log( dataField +" -- " + dataQuery );

    if(dataQuery) {
        let sQuery = `SELECT * FROM movies where ` + dataField + ` = ?`;
        // console.log(sQuery);

        db.get(sQuery , [dataQuery] ,(err ,row)=> {
            if(err) {
                return console.error(err.message);
            }
            return row
            ? data = row
            : data = [0 , 0 , "No playlist found with the Data" ,"nill" ,"nill" ,"nill"];
            });
    }

    res.redirect("/search");

    db.close();
})

app.get("/search" , (req,res) => {

    res.render("search" , { Data : data});
    
});

app.listen(3000 , (req,res) => {
    console.log("Server running...")
})




db.close( (err) =>{
    if(!err) {
        console.log("Movie DB closed...");
    }
} )