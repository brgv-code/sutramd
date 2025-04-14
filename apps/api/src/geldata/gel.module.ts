import { Module, Global } from '@nestjs/common';
import { GEL_CLIENT } from './gel.constants';
import { createClient } from '../dbschema/edgeql-js';
@Global()
@Module({
  providers: [
    {
      provide: GEL_CLIENT,
      useFactory: async () => {
        const client = createClient({
          dsn: `gel://${process.env.GEL_USER}:${process.env.GEL_PASSWORD}@${process.env.GEL_URL}:${process.env.GEL_PORT}/${process.env.GEL_DB}`,
          tlsSecurity: 'insecure',
        });
        return client.withRetryOptions({ attempts: 10 });
      },
    },
  ],
  exports: [GEL_CLIENT],
})
export class GelModule {}
