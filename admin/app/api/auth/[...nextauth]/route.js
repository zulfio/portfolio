import { reqValidateOTP, reqValidatePassword } from "@/backend/auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
    providers: [
        CredentialsProvider({
            id: "otp",
            async authorize({ otp, username }) {
                const req = await reqValidateOTP({ otp, username });
                const res = await req.json();
                const { success, admin, message } = res;

                if (!success) {
                    throw new Error(message);
                }

                return admin;
            },
        }),
        CredentialsProvider({
            id: "password",
            async authorize({ username, password }) {
                const req = await reqValidatePassword({ username, password });
                const res = await req.json();
                const { success, admin, message } = res;

                if (!success) {
                    throw new Error(message);
                }

                return admin;
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/auth",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.adminData = user;
            }
            return token;
        },
        async session({ session, token }) {
            const role = token.adminData.role
                ? {
                      name: token.adminData.role.name,
                      permissions: token.adminData.role.permissions,
                  }
                : null;

            session.user = {
                ...session.user,
                _id: token.adminData._id,
                role,
                token: token.adminData.token,
            };
            return session;
        },
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
