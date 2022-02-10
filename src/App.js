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
import logo from './logo.png';

const components = {
  Header() {
    const { tokens } = useTheme();

    return (
      <View textAlign='center' padding={tokens.space.large}>
        <Image alt='logo' src={logo} width={150} height={150} />
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
  'Sign In': 'התחבר',
  'Create Account': 'צור חשבון',
  'Sign in': 'התחבר למערכת',
  'Sign in to your account': 'ברוך הבא!',
  'Phone Number': 'הכנס את מספר הפלאפון שלך',
  'Phone Number or Email or Username': 'מספר פלאפון או אימייל',
  Password: 'סיסמא בת 8 ספרות עם אות גדולה ומספר',
  'Confirm Password': 'הכנס את הסיסמא שנית',
  'Preferred Username': 'השם הפרטי',
  Email: 'הכנס את האימייל שלך',
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
  const currentUserEmail = useCurrentUser();

  return (
    <Authenticator loginMechanisms={['email']} signUpAttributes={['email']} components={components} style={{ direction: 'rtl' }}>
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
