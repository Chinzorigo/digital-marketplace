import { TRPCError, initTRPC } from "@trpc/server";

const t = initTRPC.context().create();

export const router = t.router;
export const publicProcedure = t.procedure;
// export const privateProcedure = t.procedure.use(isAuth);
