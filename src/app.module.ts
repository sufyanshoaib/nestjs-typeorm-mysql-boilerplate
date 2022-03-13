import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule} from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import config from 'ormconfig';
import { RolesGuard } from './auth/roles.guard';
import { APP_GUARD } from '@nestjs/core';
@Module({
  imports: [
    ConfigModule.forRoot(),
    PostsModule, 
    TypeOrmModule.forRoot(config), 
    UsersModule, 
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService, 
    { provide: APP_GUARD, useClass: RolesGuard } //Register this Guard to globally on entire application
  ],
})
export class AppModule {}
