const sqlite = require('sqlite3').verbose();
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const _ = require('lodash');

const app = express();

app.use(bodyParser.urlencoded({extended : true}));

app.set('view engine' ,'ejs');

var items = [] ;   


    let db = new sqlite.Database('./Movies.db' , (err)=> {
        if (err) {
           return console.log(error);
        }
    
        console.log('Connected to Movies DB');
    });
    

    
   
        db.run('CREATE TABLE IF NOT EXISTS movies(id INTEGER PRIMARY KEY ,Year INTEGER, Name text NOT NULL , Actor text , Actress text , Director text )');
    
           
let sqlI = `INSERT INTO movies 
VALUES (  1, 2019, 'URI' , 'Vicky Kaushal' , 'Yami Gautham' , 'Aditya Dhar' ) ,
       (  2, 2014, 'INTERSTELLER' , 'Mathew McConaughey' , 'Anne Hatway' , 'Christopher Nolan'),
       (  3, 2010, 'INCEPTION' , 'Leonardo DiCaprio' , 'Elliot Page' , 'Christoper Nolan' ) ,
       (  4, 2009, 'AVATAR' , 'Sam Worthington' , 'Zoe Saldana' , 'James Cameron' ) ,
       (  5, 2008, 'THE DARK KNIGHT' , 'Christian Bale' , 'Anne Hatway' , 'Christopher Nolan' ) ,
       (  6, 2008, 'IRON MAN' , 'Robert Downey jr' , 'Gwyneth Paltrow' , 'Jon Favreau'  )`;


    db.run( sqlI ,(err) => {
            if(err) {
                 return console.log(err);
                  }
                  console.log("Row added * 6");
           }) ;
    //dummy input end..
 



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
       })


app.get("/" , (req,res) => {

       res.render("index.ejs", {Items :items});
       res.redirect('/');      
});



app.listen(3000 , (req,res) => {
    console.log("Server running...")
})



db.close( (err) =>{
    if(!err) {
        console.log("Movie DB closed...");
    }
} )