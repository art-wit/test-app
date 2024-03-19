import { useContext } from 'react';
//
// import { AuthContext } from './JwtContext';

// ----------------------------------------------------------------------

export const useAuthContext = () => {
  // const context = useContext(AuthContext);

  // if (!context) throw new Error('useAuthContext context must be use inside AuthProvider');
  // console.log(context);

  const context = {
    user: {
      id: "8864c717-587d-472a-929a-8e5f298024da-0",
      displayName: "Jaydon Frankie",
      email: "demo@minimals.cc",
      password: "demo1234",
      photoURL: "https://api-dev-minimal-v4.vercel.app/assets/images/avatars/avatar_default.jpg",
      phoneNumber: "+40 777666555",
      country: "United States",
      address: "90210 Broadway Blvd",
      state: "California",
      city: "San Francisco",
      zipCode: "94116",
      about: "Praesent turpis. Phasellus viverra nulla ut metus varius laoreet. Phasellus tempus.",
      role: "admin",
      isPublic: true
    }
  }
  return context;
};
