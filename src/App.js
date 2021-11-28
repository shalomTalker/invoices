import React, { useEffect } from 'react';
import { withAuthenticator, AmplifySignOut, AmplifyAuthenticator } from '@aws-amplify/ui-react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

import Header, { HEADER_H } from './components/Header';
import Copyright from './components/Copright';

import { useItemsContext } from './context/itemsContext';
import { useOrdersContext } from './context/ordersContext';
import { useTheme } from '@emotion/react';

// components = {
//   Header() {
//     const { tokens } = useTheme();

//     return (
//       <View textAlign='center' padding={tokens.space.large}>
//         <Image alt='Amplify logo' src='https://docs.amplify.aws/assets/logo-dark.svg' />
//       </View>
//     );
//   },

//   Footer() {
//     const { tokens } = useTheme();

//     return (
//       <View textAlign='center' padding={tokens.space.large}>
//         <Text color={`${tokens.colors.neutral['80']}`}>&copy; All Rights Reserved</Text>
//       </View>
//     );
//   },

//   SignIn: {
//     Header() {
//       const { tokens } = useTheme();

//       return (
//         <Heading padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`} level={3}>
//           Sign in to your account
//         </Heading>
//       );
//     },
//     Footer() {
//       const { toResetPassword } = useAuthenticator();

//       return (
//         <View textAlign='center'>
//           <Button fontWeight='normal' onClick={toResetPassword} size='small' variation='link'>
//             Reset Password
//           </Button>
//         </View>
//       );
//     },
//   },

//   SignUp: {
//     Header() {
//       const { tokens } = useTheme();

//       return (
//         <Heading padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`} level={3}>
//           Create a new account
//         </Heading>
//       );
//     },
//     Footer() {
//       const { toSignIn } = useAuthenticator();

//       return (
//         <View textAlign='center'>
//           <Button fontWeight='normal' onClick={toSignIn} size='small' variation='link'>
//             Back to Sign In
//           </Button>
//         </View>
//       );
//     },
//   },
// };

function App({ children }) {
  const { fetchOrders } = useOrdersContext();
  const { fetchItems } = useItemsContext();

  useEffect(() => {
    fetchOrders();
    fetchItems();
  }, []);

  return (
    <AmplifyAuthenticator loginMechanisms={['phone_number']} signUpAttributes={['name']}>
      {({ signOut }) => (
        <Container component='main'>
          <CssBaseline />
          <Header signOut={signOut} />
          <div style={{ minHeight: window.innerHeight - HEADER_H - 116 }}>{children}</div>
          <Copyright sx={{ mt: 8, mb: 4, bottom: 0 }} />
        </Container>
      )}
    </AmplifyAuthenticator>
  );
}

export default App;

/* 
const

export default function App() {
  return (
    <Authenticator components={components}>
      {({ signOut }) => <button onClick={signOut}>Sign out</button>}
    </Authenticator>
  );
}

*/
