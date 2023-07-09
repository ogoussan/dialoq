import { Module } from '@nestjs/common';
import { TraceDataController } from './trace-data.controller';
import { TraceDataService } from './trace-data.service';

@Module({
  imports: [
  ],
  controllers: [TraceDataController],
  providers: [TraceDataService],
  exports: [TraceDataService],
})
export class TraceDataModule {}
