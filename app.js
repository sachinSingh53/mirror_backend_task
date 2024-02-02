if (process.env.NODE_ENV !== "production") {
  require('dotenv').config();
}

const express = require('express');
const app = express();
const productRoutes = require('./routes/products');
const variantRoutes = require('./routes/variants');
const bodyParser = require('body-parser')
const db = require('./config/db');


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())



app.use('/products',productRoutes);
app.use('/products/:id/variant',variantRoutes);



app.use('*', (req, res) => {
    res.status(404); 
    res.json({
      message:"Page not found"
    });
})

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
}
  
module.exports = app;