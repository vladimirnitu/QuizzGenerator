import express from 'express';
import bodyParser from 'body-parser';
import UserRoutes from './routes/user';
import CategoryRoutes from './routes/category'
import { mongooseConnection } from './utils/dbconnection';
const config = require('./config')
const app = express();

app.use(bodyParser.json());
mongooseConnection;
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

// app.use(IllustrationRoutes);
// app.use(ProjectRoutes);

app.use(UserRoutes)
app.use(CategoryRoutes)
app.listen(config.ILLUSTRY_SERVER_PORT, () => {
    return console.log(`server is listening on ${config.ILLUSTRY_SERVER_PORT}`);
});