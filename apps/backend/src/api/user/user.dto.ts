import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { Role, User } from '@dialoq/types';
import { IsEmail, IsEnum, IsOptional, IsString, IsUrl } from 'class-validator';
import { DocumentDto } from '../../database/document.dto';

export class UserDto extends DocumentDto implements User {
  @IsEmail()
  @ApiProperty({
    example: 'firstname.lastname@dialoq.de',
    format: 'email',
  })
  public email!: string;

  @IsString()
  @ApiProperty({ example: 'Firstname' })
  public firstname!: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'Lastname' })
  public lastname?: string;

  @IsOptional()
  @IsEnum(Role)
  @ApiPropertyOptional({ example: Role.User, default: Role.User })
  public role?: Role = Role.User;

  @IsOptional()
  @IsString()
  @IsUrl()
  public image?: string;
}

export class UpdateUserDto extends PartialType(UserDto) {}
