import Auth from '@aws-amplify/auth';
import React, { useEffect, useState } from 'react';

export default function useCurrentUser() {
  const [user, setUser] = useState('');
  const fetchUser = async () => {
    const currentUserInfo = await Auth.currentUserInfo();
    setUser(currentUserInfo.attributes);
  };

  useEffect(() => {
    fetchUser();
  }, []);
  return user;
}
