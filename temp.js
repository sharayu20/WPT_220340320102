let dbparams=
{
    host: 'localhost',
    user: 'root',
    password: 'cdac',
    database: 'test',
	port:3306
}; 
const mysql = require('mysql2'); //fate
const con=mysql.createConnection(dbparams);//fate  

const express = require('express');
const app = express();

app.use(express.static("abc"));


app.get("/getbook",(req,resp)=>{
    let input = req.query.x;
    console.log(input);
    let output ={ bookfoundstatus:false};
    
    con.query('select * from book where bookid =?',[input],(error,rows)=>{
    
        if(rows.length > 0)
        {
            output.bookfoundstatus=true;
            output.bookdetails=rows[0];
    
        }
        resp.send(output);
    }
    );
    
    });


    app.get("/add",(req,resp)=>{
        let bookid = req.query.a;
        let bookname = req.query.b;
        let price = req.query.c;
        
        console.log(bookid);
        let output ={ bookfoundstatus:false};
        
        con.query('insert into book (bookid,bookname,price) values(?,?,?)',[bookid,bookname,price],(error,rows)=>{
        
    if (rows.affectedRows > 0) {
        output.bookfoundstatus = true;
         }
 

            resp.send(output);
        }
      );
    });


       

                // getall
            app.get("/getall",(req,resp)=>{
       
                con.query('select * from book',[],(error,rows)=>{
            
                    resp.send(rows);
                }
                );
                
                });
        
        
            
        



    app.listen(8081, function () {
        console.log("server listening at port 8081...");
    });
// const express = require('express');
// const app = express();
// const cors = require('cors');
// app.use(cors());


// const bodyParser = require('body-parser');






// app.use(express.static('abc'));
// app.use(bodyParser.json()); // support json encoded bodies
// app.use(bodyParser.urlencoded({ extended: true }));
// //whether you want nested objects support  or not



// var result;

// // app.post('/poc1', function (req, res) {
	
// // 		console.log("reading input " + req.body.v1 +  "  second " + req.body.v2)
		
// //     	var xyz ={ v1:37, v2:35};
// //         res.send(xyz);
// //     });


// // app.get('/poc2', function (req, res) {
    
	
// //         console.log("reading input " + req.query.xyz);
		
// //     	var xyz ={ v1:37, v2:35};

// // 		res.send(xyz);

// // 		});




// app.listen(8081, function () {
//     console.log("server listening at port 8081...");
// });