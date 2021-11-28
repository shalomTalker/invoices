import React, { useEffect, useState } from 'react';
import { I18n } from 'aws-amplify';
import { Authenticator, Heading, Image, Text, View, Button, useAuthenticator, useTheme } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import './App.css';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

import Header, { HEADER_H } from './components/Header';
import Copyright from './components/Copright';

import { useItemsContext } from './context/itemsContext';
import { useOrdersContext } from './context/ordersContext';
import useCurrentUser from './hooks/useCurrentUser';

const components = {
  Header() {
    const { tokens } = useTheme();

    return (
      <View textAlign='center' padding={tokens.space.large}>
        <Image alt='logo' src='https://orderspdfs.s3.eu-west-1.amazonaws.com/logo.png' />
      </View>
    );
  },

  Footer() {
    const { tokens } = useTheme();

    return (
      <View textAlign='center' padding={tokens.space.large}>
        <Text color={`${tokens.colors.neutral['80']}`}>&copy; כל הזכויות שמורות</Text>
      </View>
    );
  },

  SignIn: {
    Header() {
      const { tokens } = useTheme();

      return (
        <Heading style={{ direction: 'rtl' }} padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`} level={3} textAlign='center'>
          התחבר למערכת ההזמנות
        </Heading>
      );
    },
    Footer() {
      const { toResetPassword } = useAuthenticator();

      return (
        <View style={{ direction: 'rtl' }} textAlign='center'>
          <Button fontWeight='normal' onClick={toResetPassword} size='small' variation='link'>
            שכחת סיסמא?
          </Button>
        </View>
      );
    },
  },

  SignUp: {
    Header() {
      const { tokens } = useTheme();

      return (
        <Heading style={{ direction: 'rtl' }} padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`} level={3} textAlign='center'>
          צור משתמש חדש
        </Heading>
      );
    },
    Footer() {
      const { toSignIn } = useAuthenticator();

      return (
        <View textAlign='center' style={{ direction: 'rtl' }}>
          <Button fontWeight='normal' onClick={toSignIn} size='small' variation='link'>
            יש לך חשבון? הירשם!
          </Button>
        </View>
      );
    },
  },
};

I18n.putVocabulariesForLanguage('en', {
  'Sign In': 'התחבר', // Tab header
  'Create Account': 'צור חשבון', // Tab header
  'Sign in': 'התחבר למערכת', // Button label
  'Sign in to your account': 'ברוך הבא!',
  'Phone Number': 'הכנס את מספר הפלאפון שלך', // Username label
  'Phone Number or Email or Username': 'מספר פלאפון או אימייל', // Username label
  Password: 'סיסמא בת 8 ספרות עם אות גדולה ומספר', // Password label
  'Confirm Password': 'הכנס את הסיסמא שנית', // Password label
  'Preferred Username': 'השם הפרטי', // Password label
  Email: 'הכנס את האימייל שלך', // Password label
  'Forgot your password? ': 'שחזר סיסמא',
  'Reset your password': 'שחזור סיסמא',
  'Enter your phone number': 'הכנס אימייל או פלאפון',
  'Send code': 'שלח קוד אימות',
  'Back to Sign In': 'התחבר למערכת',
  'Confirm Sign Up': 'שלחנו לך מייל עם קוד',
  'Enter your code': 'הכנס את הקוד',
  Confirm: 'אישור',
  'Resend Code': 'שלח שוב',
});
function App({ children }) {
  const { fetchOrders } = useOrdersContext();
  const { fetchItems } = useItemsContext();
  const currentUserEmail = useCurrentUser();

  useEffect(() => {
    fetchOrders();
    fetchItems();
  }, []);

  return (
    <Authenticator loginMechanisms={['phone_number', 'email', 'username']} signUpAttributes={['email', 'phone_number', 'preferred_username']} components={components} style={{ direction: 'rtl' }}>
      {({ user, signOut }) => {
        return (
          <Container component='main'>
            {
              <>
                <CssBaseline />
                <Header signOut={signOut} user={currentUserEmail} />
                <div style={{ minHeight: window.innerHeight - HEADER_H - 116 }}>{children}</div>
                <Copyright sx={{ mt: 8, mb: 4, bottom: 0 }} />
              </>
            }
          </Container>
        );
      }}
    </Authenticator>
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
