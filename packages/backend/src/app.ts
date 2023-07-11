import { fastify, FastifyServerOptions } from 'fastify';
import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify';
import fastifyHelmet from '@fastify/helmet';
import fastifyCookie from '@fastify/cookie';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import { fastifyTRPCOpenApiPlugin } from 'trpc-openapi';
import { genReqIdFunctionCreator, logger } from './utils/logger';

export const buildApp = (opts: FastifyServerOptions = {}) => {
  const appOptions: FastifyServerOptions = {
    logger,
    genReqId: genReqIdFunctionCreator(),
    ...opts,
  };

  const app = fastify(appOptions);

  /* plugins */
  app.register(fastifyHelmet, {
    contentSecurityPolicy: false,
    global: true,
  });
  app.register(fastifyCookie);

  /* tRPC goes here */
};
