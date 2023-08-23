// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv');

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  public getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing)
      throw new Error(`config error - missing env.${key}`);

    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true));
    return this;
  }

  public getPort() {
    return this.getValue('PORT', true);
  }

  public isProduction() {
    const env = this.getValue('ENVIRONMENT', false);
    return env === 'production';
  }

  public getEnvironment() {
    const env = this.getValue('ENVIRONMENT', false);
    const environments = {
      dev: 'development',
      sta: 'staging',
      prod: 'production',
    };

    if (env) return environments[env];

    return 'development';
  }
}

const configService = new ConfigService(process.env)

// .ensureValues([
//   'DATABASE_URL',
//   'ENVIRONMENT',
// ]);

const envVariables = {
  port: Number(process.env.PORT) || 5005,
  environment: process.env.ENVIRONMENT || 'development',
  database: {
    url: process.env.DATABASE_URL,
  }
};

const environmentVariables = () => envVariables;

export { configService, environmentVariables };
