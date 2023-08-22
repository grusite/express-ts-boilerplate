import { str, num } from 'envalid';
import { Environments } from '../enums/environment.enum';
import appConfig from './app.config';

const envValidationConfig = {
  NODE_ENV: str({
    default: Environments.DEV,
    choices: [...Object.values(Environments)],
  }),
  PORT: num({ default: appConfig.defaultPort }),
  APP_BASE_URL: str(),
};

export default envValidationConfig;
