import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../api/auth/auth.module';
import { UserModule } from '../api/user/user.module';
import { TypeOrmConfigService } from '../database/typeorm.service';
import { LoggerMiddleware } from './logger.middleware';
import { TaskModule } from '../api/task/task.module';
import { LessonModule } from '../api/lesson/lesson.module';
import { join as joinPath } from 'path';

@Module({
  imports: [
    PassportModule.register({ session: true }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    ServeStaticModule.forRoot(
      {
        rootPath: joinPath(__dirname, '..', 'frontend'),
        serveRoot: '/app',
      },
      {
        rootPath: joinPath(__dirname, '..', 'landing-page'),
      }
    ),
    AuthModule,
    UserModule,
    LessonModule,
    TaskModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
