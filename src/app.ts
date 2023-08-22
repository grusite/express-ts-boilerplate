// Libs
import * as path from 'path';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import expressJSDocSwagger from 'express-jsdoc-swagger';

// Routes
import health from './modules/health/health.route';
import routes from './modules/index';

// Config
import expressJSDocSwaggerConfig from './config/express-jsdoc-swagger.config';
import appConfig from './config/app.config';
import { errorHandler } from './middlewares/errorHandler';

class App {
  public express: express.Application;

  constructor() {
    this.express = express();
    this.setMiddlewares();
    this.disableSettings();
    this.setRoutes();
    this.setErrorHandler();
    this.initializeDocs();
  }

  private setMiddlewares(): void {
    this.express.use(cors());
    this.express.use(morgan('dev'));
    this.express.use(express.static(path.join(__dirname, '../public')));
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: true }));
    this.express.use(helmet());
    this.express.use(express.static('public'));
  }

  private disableSettings(): void {
    this.express.disable('x-powered-by');
  }

  private setRoutes(): void {
    const {
      api: { version },
    } = appConfig;

    // Application routes
    this.express.use('/health', health);
    this.express.use(`/api/${version}`, routes);

    // Redirect routes
    this.express.use('/', (_req, res) => {
      res.redirect('/health');
    });
    this.express.get('*', (req, res) => {
      res.redirect('/health');
    });
  }

  private setErrorHandler(): void {
    this.express.use(errorHandler);
  }

  private initializeDocs(): void {
    expressJSDocSwagger(this.express)(expressJSDocSwaggerConfig);
  }
}

const app = new App();

export default app;
