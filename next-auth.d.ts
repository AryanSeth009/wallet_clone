import 'next-auth';

declare module 'next-auth' {
  interface User {
    id: string;
    profileImage?: string;
  }

  interface Session {
    user: {
      id: string;
      name?: string;
      email?: string;
      image?: string;
      profileImage?: string;
    }
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    name?: string;
    email?: string;
    image?: string;
    profileImage?: string;
  }
}
