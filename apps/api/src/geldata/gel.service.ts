import { Injectable } from '@nestjs/common';
import { createClient } from 'gel';

@Injectable()
export class GelService {
  client = createClient({
    dsn: process.env.GEL_DSN,
    tlsSecurity: 'insecure',
  });

  async getClient() {
    console.log(this.client, 'client');
    return this.client;
  }
}
