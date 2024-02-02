const express = require('express');
const mongoose = require('mongoose');
const app = express();
const productRoutes = require('./routes/products');
const variantRoutes = require('./routes/variants');
const bodyParser = require('body-parser')



//mongoose connection
mongoose.connect('mongodb://localhost:27017/mirror_task',{
   
});

const db = mongoose.connection;
db.on("error",console.error.bind(console,"connection error:"));
db.once("open",()=>{
    // console.log("Database connected");
});


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())



app.use('/products',productRoutes);
app.use('/products/:id/variant',variantRoutes);



app.use('*', (req, res) => {
    res.status(404); 
    res.send('Page Not found');
})

if (require.main === module) {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  }
  
  module.exports = app;