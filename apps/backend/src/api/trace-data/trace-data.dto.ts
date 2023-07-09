import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {Attribute, Span, TraceData} from '@tdqa/types';

export class AttributeDto implements Attribute {
  @IsString()
  @ApiProperty({ example: 'key' })
  public key!: string;

  @IsString()
  @ApiProperty({ example: 'value' })
  public value!: string;
}

export class SpanDto implements Span {
  @IsString()
  @ApiProperty({ example: 'traceId' })
  public traceId!: string;

  @IsString()
  @ApiProperty({ example: 'spanId' })
  public spanId!: string;

  @IsString()
  @ApiProperty({ example: 'name' })
  public name!: string;

  @IsNotEmpty()
  @ApiProperty({ example: 1634089662000000000 })
  public startTimeUnixNano!: number;

  @IsNotEmpty()
  @ApiProperty({ example: 1634089662001000000 })
  public endTimeUnixNano!: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AttributeDto)
  public attributes!: AttributeDto[];
}

export class TraceDataDto implements TraceData {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SpanDto)
  public spans!: SpanDto[];
}
