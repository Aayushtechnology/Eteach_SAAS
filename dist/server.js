import app from './src/app.js';
import config from './src/config/config.js';
// database connection import 
import './src/database/connection.js';
function startSever() {
    const port = process.env.Port || config.port;
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}
;
startSever();
