import express from 'express';
import { connect } from 'mongoose';
import cors from 'cors';
import routes from './routes';
import config from './utils/config';
import logger from './utils/logger';
import middleware from './utils/middleware';
import mongoose from 'mongoose';

const collection_name = 'people';

connect(config.MONGODB_URI)
  .then(() => logger.info('Connected to MongoDB'))
  .then(() => {
    if (mongoose.connection.collections[collection_name] != undefined) {
      logger.info(`'${collection_name}' collection found`)
    } else {
      logger.info(`Could not find '${collection_name}' collection`)
    }
  })
  .catch((err) => logger.error('Error connecting to MongoDB:', err.message));

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());
app.use('/api', routes);
app.use(middleware.errorHandler);

app.listen(port, () => logger.info(`App server listening on port ${port}!`));
