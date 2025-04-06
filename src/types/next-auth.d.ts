import NextAuth from "next-auth";

declare module "next-auth" {
  /**
   * Extending the built-in User type
   */
  interface User {
    id: string;
    email: string;
    walletAddress?: string;
  }

  /**
   * Extending the built-in Session type
   */
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string;
      image?: string;
      walletAddress?: string;
    };
  }
}

declare module "next-auth/jwt" {
  /** Extending the built-in JWT type */
  interface JWT {
    id: string;
    walletAddress?: string;
    profileImage?: string;
  }
}
