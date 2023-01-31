const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyparser = require("body-parser")
const app = express();
const port = 80;

main().catch((err) => console.log(err));             // Agar mongoose main error hoga to ye function chala dena

async function main() {
  mongoose.set("strictQuery", false);
  mongoose.connect("mongodb://localhost:27017/contactDance", {
    useNewUrlParser: true,
  });
  console.log("We Are Connected Bruhh...");
}                                                   // node ko mongodb se connect kar diya with the help of mongoose 

const contactSchema = new mongoose.Schema({
    name: String,
    number: String,
    email: String,
    address: String
  });                                              // Schema Banana important hai in mongoose

const contact = mongoose.model("contact", contactSchema);        // Schema banaya hai to usko lock bhi karna padega na isliye "model"

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded({ extended: true }));

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

// ENDPOINTS
app.get('/', (req, res)=>{
    const params = {}
    res.status(200).render('home.pug', params);
});

app.get('/contact', (req, res)=>{
    res.status(200).render('contact.pug');
});

app.post('/contact',(req,res)=>{
    var myData = new contact(req.body);
    myData.save().then(()=>{
    res.send("This item has been saved to the database")
    }).catch(()=>{
    res.status(400).send("item was not saved to the databse")
    })
})

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});