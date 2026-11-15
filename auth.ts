import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

const DEFAULT_ALLOWED = "mir.global.academy@gmail.com,manager.equity.finance@gmail.com";

// Only these accounts may sign in. ALLOWED_EMAILS (env) overrides the default list.
const allowed = (process.env.ALLOWED_EMAILS || DEFAULT_ALLOWED)
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Google],
  trustHost: true,
  session: { strategy: "jwt", maxAge: 60 * 60 * 24 },
  callbacks: {
    signIn({ profile }) {
      const email = profile?.email?.toLowerCase();
      return !!email && profile?.email_verified !== false && allowed.includes(email);
    },
  },
});
