import { t } from '#/controllers/trpc';
import { response } from '#/controllers/trpc/router/response';
import { userSessionResource } from '#/controllers/trpc/router/userSession';
import { dz } from '#/infrastructures/db/okozukai_keeper_3';
import {
  userSessionsTable,
  usersTable,
} from '#/infrastructures/db/okozukai_keeper_3/schema';
import { sha512 } from '#/utils/hash';
import { addDays, addMonths } from 'date-fns';
import { and, eq } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';

export const SigninRequestZod = z.object({
  username: z.string(),
  password: z.string(),
});

export type SigninRequest = z.infer<typeof SigninRequestZod>;

export const signinRouter = t.router({
  [`${userSessionResource}/signin` as const]: t.procedure
    .input(SigninRequestZod)
    .mutation(async (req) => {
      const passwordHash = sha512(req.input.password);
      const user = (
        await dz
          .select()
          .from(usersTable)
          .where(
            and(
              eq(usersTable.name, req.input.username),
              eq(usersTable.passwordHash, passwordHash),
            ),
          )
      ).shift();

      if (!user) {
        throw new Error('Signin Failed');
      }

      req.ctx.newToken = {
        accessToken: uuidv4(),
        resetToken: uuidv4(),
      };

      const userSessionInsert: typeof userSessionsTable.$inferInsert = {
        id: uuidv4(),
        userId: user.id,
        accessTokenHash: sha512(req.ctx.newToken.accessToken),
        accessTokenExpireAt: addDays(new Date(), 1),
        resetTokenHash: sha512(req.ctx.newToken.resetToken),
        resetTokenExpireAt: addMonths(new Date(), 1),
      };

      const userSession = (
        await dz
          .insert(userSessionsTable)
          .values(userSessionInsert)
          .onConflictDoUpdate({
            target: userSessionsTable.id,
            set: userSessionInsert,
          })
          .returning()
      )[0];

      return response(req.ctx, {
        user: user,
        userSession: userSession,
      });
    }),
});
