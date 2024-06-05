import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersModule } from './Users/users.module'
import { User } from './graphql/models/User'
import { Job } from './graphql/models/Job'
import { AuthModule } from './Auth/auth.module'

@Module({
   imports: [
      GraphQLModule.forRoot<ApolloDriverConfig>({
         driver: ApolloDriver,
         autoSchemaFile: 'src/schema.gql'
      }),
      ConfigModule.forRoot({ envFilePath: `.${process.env.NODE_ENV}.env`, isGlobal: true }),
      TypeOrmModule.forRoot({
         type: 'postgres',
         host: 'localhost',
         port: Number(process.env.DATABASE_PORT),
         username: 'postgres',
         password: process.env.DATABASE_PASSWORD,
         database: process.env.DATABASE_NAME,
         entities: [User, Job],
         synchronize: true
      }),
      UsersModule,
      AuthModule
   ]
})
export class AppModule {}
