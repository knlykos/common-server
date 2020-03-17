import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PublicModule } from './public/public.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { HandlebarsAdapter, MailerModule } from '@nest-modules/mailer';
import { Currency } from './entities/currency.entity';
import { Product } from './entities/product.entity';
import { Supplies } from './entities/supplies.entity';
import { Food } from './entities/food.entity';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    PublicModule,
    TypeOrmModule.forRoot({
      username: 'postgres',
      password: 'bets123',
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      database: 'bets',
      synchronize: true,
      entities: [User, Currency, Product, Supplies, Food],
    }),
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          host: 'smtp.ethereal.email',
          port: 587,
          auth: {
            user: 'sydni88@ethereal.email',
            pass: 'U1CMS1Vup8FzxSfgsZ',
          },
        },
        defaults: {
          from: '"nest-modules" <modules@nestjs.com>',
        },
        template: {
          dir: './src/templates',
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
    UserModule,
    AuthModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
