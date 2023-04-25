import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt"
import User from "@/utils/models/User";
import { initDB } from "@/utils/initDB";
export default NextAuth({
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            // credentials: {
            //   username: { label: "Username", type: "text", placeholder: "jsmith" },
            //   password: { label: "Password", type: "password" }
            // },
            async authorize(credentials, req) {
                // Add logic here to look up the user from the credentials supplied
                //   const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }
           
                const { email, password } = credentials;
                await initDB();
                const user = await User.findOne({ email }).exec();
                const userDocs=user && user._doc;
              
                const isMatch =user && password==user.password;
                // user && await bcrypt.compare(password, user.password)
                if (user && isMatch) {
                    // Any object returned will be saved in `user` property of the JWT
                    delete  userDocs.password;
                    return userDocs
                } else {
                    // If you return null then an error will be displayed advising the user to check their details.
                    throw new Error("Invalid User")

                    // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                }
            }
        })
    ],
    secret:"dVFfvAdbnB8eY0grPVZQfRVR"
    ,
    callbacks: {
        async session({ session, user,token }) {
            if(token && token.id){
                session.user.id=token.id
                session.user.role=token.role
            }
            return session
        },
        async jwt({ token, user, account, profile, isNewUser }) {
            if(user && user._id){
                token.id=user._id
                token.role=user.role
            }
            return token
        }
    }
    ,pages: {
        // signIn: '/auth/signin',
        signOut: '/login',
        // error: '/login', // Error code passed in query string as ?error=
        // verifyRequest: '/auth/verify-request', // (used for check email message)
        // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
      }
})