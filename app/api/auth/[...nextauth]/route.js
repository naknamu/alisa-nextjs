// import { authenticate } from "@/services/authService";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

async function authenticate(emailOrUsername, password) {

  const uploader = {
    emailOrUsername: emailOrUsername,
    password: password,
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/uploader/login` , {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(uploader),
  });

  return res;
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {

        if (typeof credentials !== "undefined") {
          const res = await authenticate(credentials.email, credentials.password);

          if (res.status === 200) {
            const data = await res.json();
            return {
              name: "John Doe",
              email: "john@gmail.com",
            }
          } else {
            throw new Error("Invalid credentials") ;
          }
        } else {
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: '/login',
    signOut: '/auth/signout',
    error: '/auth/error', // Error code passed in query string as ?error=
    verifyRequest: '/auth/verify-request', // (used for check email message)
    newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  session: { strategy: "jwt" }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };