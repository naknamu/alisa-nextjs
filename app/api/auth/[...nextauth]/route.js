import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { cookies } from "next/headers";
import { setCookie } from "cookies-next";

async function authenticate(emailOrUsername, password) {
  const uploader = {
    emailOrUsername: emailOrUsername,
    password: password,
  };

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/uploader/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(uploader),
  });

  const auth_token = res.headers.get("Authorization").split(" ")[1];

  setCookie("auth_token", auth_token, { cookies, maxAge: 43200 });

  return res;
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (typeof credentials !== "undefined") {
          const res = await authenticate(
            credentials.email,
            credentials.password,
          );

          if (res.status === 200) {
            const data = await res.json();
            return {
              name: `${data.name}`,
              email: `${data.email}`,
              id: `${data.id}`,
            };
          } else {
            throw new Error("Invalid credentials");
          }
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    signOut: "/auth/signout",
    error: "/auth/error", // Error code passed in query string as ?error=
    verifyRequest: "/auth/verify-request", // (used for check email message)
    newUser: "/auth/new-user", // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  session: {
    strategy: "jwt",
    maxAge: 43200,
  },
  callbacks: {
    async session({ session, token, user }) {
      // Send properties to the client
      session.id = token.sub;
      // console.log(session);
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
