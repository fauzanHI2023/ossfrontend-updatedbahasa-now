import type {NextAuthOptions} from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import AzureADProvider from 'next-auth/providers/azure-ad';
import AppleProvider from 'next-auth/providers/apple';

declare module 'next-auth' {
  interface User {
    guid: string;
    id: any;
    user_name: string;
    passwd: string;
    email: string;
    full_name: string;
    user_status: number;
    phone_id: string;
    register_date: string;
    branch_id: string;
    is_new_task: number;
    activkey: string;
    parent_alias_id: string;
    company_id: number;
    auth_key: string;
    expired_key: string;
    deleted_by: number;
    deleted_stamp: string;
    _history: string;
    phpDonorData?: any[];
    contactInformation: any[];
  }
}

let userDataGoogle: any;

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/login',
    error: '/error'
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 60
  },
  debug: true,
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
    }),
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID || '',
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET || '',
      tenantId: process.env.AZURE_AD_TENANT_ID || ''
    }),
    AppleProvider({
      clientId: process.env.APPLE_ID || '',
      clientSecret: process.env.APPLE_SECRET || ''
    }),
    CredentialsProvider({
      name: 'Sign in',
      type: 'credentials',
      credentials: {
        usernameOrEmail: {
          label: 'Email or Username',
          type: 'text'
        },
        password: {label: 'Password', type: 'password'}
      },
      async authorize(credentials: any) {
        if (!credentials?.usernameOrEmail || !credentials.password) {
          return null;
        }

        const user = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}/login-api/login`,
          {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({
              usernameOrEmail: credentials.usernameOrEmail,
              password: credentials.password
            }),
            cache: 'no-cache',
            headers: {'Content-Type': 'application/json'}
          }
        );
        const ress = await user.json();
        if (!ress?.success) {
          return null;
        }
        console.log('phpDonorData:', ress.phpDonorData);
        return {
          ...ress.user,
          phpDonorData: ress.phpDonorData,
          location: ress.location,
          phones: ress.phones,
          contactInformation: ress.contactInformation,
          userType: ress.userType,
          randomKey: 'Random'
        };
      }
    })
  ],
  logger: {
    error(code, metadata) {
      console.error(code, metadata);
    },
    warn(code) {
      console.warn(code);
    },
    debug(code, metadata) {
      console.debug(code, metadata);
    }
  },
  callbacks: {
    async signIn({account, profile}: any) {
      if (account.provider === 'google') {
        const user = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}/login-api/get-logged-in-google`,
          {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({
              email: profile.email
            }),
            cache: 'no-cache',
            headers: {'Content-Type': 'application/json'}
          }
        );
        const ress = await user.json();
        if (!ress?.success) {
          return false;
        }
        userDataGoogle = {
          ...ress.user,
          phpDonorData: ress.phpDonorData,
          location: ress.location,
          phones: ress.phones,
          contactInformation: ress.contactInformation,
          userType: ress.userType,
          signOutFromGoogle: false,
          randomKey: 'Random'
        };
        console.log('phpDonorData:', ress.phpDonorData);
        return {
          ...ress.user,
          phpDonorData: ress.phpDonorData,
          location: ress.location,
          phones: ress.phones,
          contactInformation: ress.contactInformation,
          userType: ress.userType,
          randomKey: 'Random'
        };
      } else if (account.provider === 'azure-ad') {
        // Get logged-in user data from Azure AD
        const user = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}/login-api/get-logged-in-office`,
          {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({
              email: profile.email
            }),
            cache: 'no-cache',
            headers: {'Content-Type': 'application/json'}
          }
        );
        const ress = await user.json();
        if (!ress?.success) {
          return false;
        }

        return {
          ...ress.user,
          phpDonorData: ress.phpDonorData,
          location: ress.location,
          phones: ress.phones,
          contactInformation: ress.contactInformation,
          userType: ress.userType,
          randomKey: 'Random'
        };
      } else {
        // Update userDataGoogle for non-Google sign-in
        userDataGoogle = {
          ...profile, // or whatever data you want to store
          signOutFromGoogle: false
        };
      }
      return true;
    },
    async session({session, token}: any) {
      console.log('JWT Token:', token);
      if (token?.phpDonorData) {
        const donorData = token.phpDonorData[0];
        return {
          ...session,
          user: {
            ...session.user,
            ...token,
            address: donorData?.address || session.user.address,
            birth_place: donorData?.birth_place || session.user.birth_place,
            birth_date: donorData?.birth_date || session.user.birth_date,
            religion: donorData?.religion || session.user.religion,
            blood_type: donorData?.blood_type || session.user.blood_type,
            sex: donorData?.sex || session.user.sex,
            identity_no: donorData?.identity_no || session.user.identity_no,
            website: donorData?.website || session.user.website,
            location_id: donorData?.location_id || session.user.location_id,
            phpDonorData: token.phpDonorData,
            signOutFromGoogle: token.signOutFromGoogle || false
          }
        };
      }

      if (token?.location) {
        const location = token.location[0];
        return {
          ...session,
          user: {
            ...session.user,
            ...token,
            Provinsi:
              location?.Provinsi.location_name ||
              session.user.Provinsi.location_name,
            Kecamatan:
              location?.Kecamatan.location_name ||
              session.user.Kecamatan.location_name,
            Kelurahan:
              location?.Kelurahan.location_name ||
              session.user.Kelurahan.location_name,
            location: token.location,
            signOutFromGoogle: token.signOutFromGoogle || false
          }
        };
      }

      if (token?.contactInformation) {
        const contactData = token.contactInformation[0];
        return {
          ...session,
          user: {
            ...session.user,
            ...token,
            instagram: contactData?.instagram || session.user.instagram,
            facebook: contactData?.facebook || session.user.facebook,
            linkedin: contactData?.linkedin || session.user.linkedin,
            youtube: contactData?.youtube || session.user.youtube,
            website: contactData?.website || session.user.website,
            contactInformation: token.contactInformation,
            signOutFromGoogle: token.signOutFromGoogle || false
          }
        };
      }

      if (token?.phones) {
        const phoneData = token.phones[0];
        return {
          ...session,
          user: {
            ...session.user,
            ...token,
            phone_no: phoneData?.phone_no || session.user.phone_no,
            contactInformation: token.contactInformation,
            signOutFromGoogle: token.signOutFromGoogle || false
          }
        };
      }
      return session;
    },
    async jwt({token, user, account, session, trigger}: any) {
      if (trigger === 'update') {
        token.full_name = session?.full_name || token.full_name;
        token.email = session?.email || token.email;
        token.csr_status = session?.csr_status || token.csr_status;

        if (token?.phpDonorData && token.phpDonorData.length > 0) {
          token.phpDonorData[0].address = session?.address || token.address;
          token.phpDonorData[0].birth_place =
            session?.birth_place || token.phpDonorData[0].birth_place;
          token.phpDonorData[0].birth_date =
            session?.birth_date || token.phpDonorData[0].birth_date;
          token.phpDonorData[0].religion =
            session?.religion || token.phpDonorData[0].religion;
          token.phpDonorData[0].blood_type =
            session?.blood_type || token.phpDonorData[0].blood_type;
          token.phpDonorData[0].sex = session?.sex || token.phpDonorData[0].sex;
          token.phpDonorData[0].identity_no =
            session?.identity_no || token.phpDonorData[0].identity_no;
          token.phpDonorData[0].website =
            session?.website || token.phpDonorData[0].website;
          token.phpDonorData[0].location_id =
            session?.location_id || token.phpDonorData[0].location_id;
        }

        if (token?.location && token.location.length > 0) {
          console.log('Log Session', session, token);

          token.location[0].Provinsi.location_name =
            session?.Provinsi.location_name ||
            token.location[0].Provinsi.location_name;
          token.location[0].Kecamatan.location_name =
            session?.Kecamatan.location_name ||
            token.location[0].Kecamatan.location_name;
          token.location[0].Kelurahan.location_name =
            session?.Kelurahan.location_name ||
            token.location[0].Kelurahan.location_name;
        }

        if (token?.contactInformation && token.contactInformation.length > 0) {
          console.log('Log Session', session, token);

          token.contactInformation[0].instagram =
            session?.instagram || token.contactInformation[0].instagram;
          token.contactInformation[0].facebook =
            session?.facebook || token.contactInformation[0].facebook;
          token.contactInformation[0].linkedin =
            session?.linkedin || token.contactInformation[0].linkedin;
          token.contactInformation[0].youtube =
            session?.youtube || token.contactInformation[0].youtube;
          token.contactInformation[0].website =
            session?.website || token.contactInformation[0].website;
        }

        if (token?.phones && token.phones.length > 0) {
          console.log('Log Session', session, token);

          token.phones[0].phone_no =
            session?.phone_no || token.phones[0].phone_no;
        }
      }

      // Regular token processing
      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          ...u,
          ...userDataGoogle,
          id: u.id,
          randomKey: u.randomKey
        };
      }

      if (account?.provider === 'google' && token?.signOut) {
        return {
          ...token,
          signOutFromGoogle: true
        };
      }

      return token;
    }
  }
};
