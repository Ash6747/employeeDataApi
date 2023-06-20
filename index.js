const express = require('express');
const db = require('./config/mongoose');

const app = express();
const PORT =process.env.PORT || 3000;
app.use(express.json());

const bodyParser = require("body-parser");
//parse for winston logger
app.use((req, res, next)=>{
    logger.info(req.body);
    let oldsend = res.send;
    res.send = function (data){
        logger.info(data);
        oldsend.apply(res, arguments);
    }
    next();
})

const userRoutes = require('./routes/users');
const logger = require('./config/logger');
app.use('/', userRoutes);

//server running on port 3000
app.listen(PORT, function(err){
    if (err){
        logger.log(`Error in running the server: ${err}`);
    }
    logger.log('info',`Server is running on port: ${PORT}`);
});

module.exports = app;