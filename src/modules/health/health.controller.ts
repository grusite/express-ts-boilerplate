import { type Request, type Response, type NextFunction } from 'express';
import { HttpStatusCode } from 'axios';
import appConfig from '../../config/app.config';
import environment from '../../lib/environment';
import Api from '../../lib/api';

export default class HealthController extends Api {
  public health = async (_req: Request, res: Response, _next: NextFunction) => {
    const {
      api: { version },
    } = appConfig;
    const { env } = environment;
    const data = {
      uptime: process.uptime(),
      version,
      env,
      date: new Date(),
    };

    this.send(res, data, HttpStatusCode.Ok, 'OK');
  };
}
