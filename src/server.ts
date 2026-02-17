import app from './app.js';
import config from './config/config.js';

// database connection import 
import './database/connection.js'

function startSever(){
    const port = process.env.PORT || config.port;
    app.listen(port,()=>{
        console.log(`Server is running on port ${port}`);
    })
};
startSever();