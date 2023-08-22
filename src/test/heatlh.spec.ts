import request from 'supertest';
import app from '../app';
import appConfig from '../config/app.config';
import environment from '../lib/environment';

describe('GET /health', () => {
  const {
    api: { version },
  } = appConfig;
  const { env } = environment;

  it('should return 200 OK', async () => {
    const res = await request(app.express).get('/health');

    expect(res.status).toEqual(200);
  });

  it('should return the health json', async () => {
    const res = await request(app.express).get('/health');

    expect(res.body).toEqual({
      message: 'OK',
      data: {
        uptime: expect.any(Number),
        version,
        env,
        date: expect.anything(),
      },
    });
  });
});
