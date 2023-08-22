import { Router } from 'express';
import HealthController from './health.controller';

const health = Router();
const controller = new HealthController();

health.get('/', controller.health);

export default health;
