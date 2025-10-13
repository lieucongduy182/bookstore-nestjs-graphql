import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { join } from 'path';
import { AuthorsModule } from './authors/authors.module';
import { BooksModule } from './books/books.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.graphql'),
      sortSchema: true,
      playground: true,
    }),
    AuthorsModule,
    BooksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
