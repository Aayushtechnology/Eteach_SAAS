import express from 'express';
import authRoute from './route/gobals/auth/authRoute.js';
const app = express();
import instituteRoute from './route/institute/institueRoute.js';
app.use(express.json());
app.use('/', instituteRoute);
app.use('/auth', authRoute);
export default app;
