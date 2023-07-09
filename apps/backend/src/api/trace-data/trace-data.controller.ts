import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseArrayPipe,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';
import { ErrorDto } from '../../app/error.dto';
import { TraceDataDto } from './trace-data.dto';
import { TraceDataService } from './trace-data.service';

@ApiTags('trace-data')
@Controller('trace-data')
export class TraceDataController {
  public constructor(private readonly traceDataService: TraceDataService) {}

  @Post()
  @ApiOperation({ summary: 'Post trace data to analyse' })
  @ApiCreatedResponse({ type: TraceDataDto })
  @ApiBadRequestResponse({ type: ErrorDto })
  public async createBookingDay(
    @Body() body: TraceDataDto
  ): Promise<void> {
    this.traceDataService.analyse(body)
  }
}
