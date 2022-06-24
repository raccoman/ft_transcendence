import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ProfileModule } from './profile/profile.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      cors: {
        origin: [process.env.NEXTJS_BASE_URL],
        credentials: true,
      },
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      // buildSchemaOptions: { dateScalarMode: 'timestamp' },
      definitions: {
        path: join(process.cwd(), 'types/graphql.ts'),
      },
    }),
    AuthModule,
    ProfileModule,
  ],
})
export class AppModule {
}
