import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ProfileModule } from './profile/profile.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ChatModule } from 'src/chat/chat.module';
import { PubsubModule } from 'src/pubsub/pubsub.module';
import { GameModule } from 'src/game/game.module';
import { AssetsModule } from 'src/assets/assets.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    PubsubModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      path: 'v1/graphql',
      sortSchema: true,
      persistedQueries: false,
      // buildSchemaOptions: { dateScalarMode: 'timestamp' },
      definitions: {
        path: join(process.cwd(), 'types/graphql.ts'),
      },
      cors: {
        origin: [process.env.NEXTJS_BASE_URL],
        credentials: true,
      },
      subscriptions: {
        'graphql-ws': true,
      }, 
      context: (context) => {

        if (context?.extra?.request) {

          return {
            req: {
              ...context?.extra?.request,
              headers: {
                ...context?.extra?.request?.headers,
                ...context?.connectionParams,
              },
            },
          };
        }

        return { req: context?.req };
      },
    }),
    AuthModule,
    ProfileModule,
    ChatModule,
    GameModule,
    AssetsModule,
  ],
})
export class AppModule {
}
