import { cloneDeep } from 'lodash';
import type {
  MapToTrpcRouterBuilderStructure,
  MapApiToTrpcRouter,
  ProcedureStructure,
  ProcedureSchema,
  EmptyProcedureBuilder,
} from './api.types';
import { z } from 'zod';

export const api = {
  health: {
    input: z.void(),
    output: z.object({
      message: z.string(),
    }),
    openapi: {
      method: 'GET',
      path: '/health',
      description: 'This is the health check route.',
      protect: false,
      tags: ['Heath Check'],
    },
  },
} satisfies ProcedureStructure;

export type API = typeof api;

export type TrpcRouterConformToApi = MapApiToTrpcRouter<API>;

const procedureSchemaProperties: string[] = [
  'input',
  'output',
  'openapi',
] satisfies (keyof ProcedureSchema)[];

function isProcedureStructure(
  ob: unknown
): ob is Record<string, Record<string, unknown>> {
  const properties = Object.getOwnPropertyNames(ob);
  return (
    properties.some((name) => !procedureSchemaProperties.includes(name)) &&
    properties.length !== 0
  );
}
const mapToTrpcRouterBuilderStructure: MapToTrpcRouterBuilderStructure<API> = ((
  api: ProcedureSchema
) => {
  if (isProcedureStructure(api)) {
    for (const key in api) {
      const innerResult = mapToTrpcRouterBuilderStructure(api[key]);
      if (typeof innerResult === 'function') {
        api[`${key}Api`] = innerResult;
      } else {
        api[key] = innerResult;
      }
    }
    return api;
  }
  return (builder: EmptyProcedureBuilder) => {
    const { input, output, openapi } = api;
    if (input) {
      builder = builder.input(input);
    }
    if (output) {
      builder = builder.output(output.schema);
    }
    if (openapi) {
      builder = builder.meta({
        openapi,
      });
    }
    return builder;
  };
}) as never;

export const trpcRouterBuilderStructure = mapToTrpcRouterBuilderStructure(
  cloneDeep(api)
);
