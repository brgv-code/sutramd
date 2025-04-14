import { Module } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { GelModule } from '../geldata/gel.module';
@Module({
  imports: [GelModule],
  controllers: [BlogController],
  providers: [BlogService],
})
export class BlogModule {}
