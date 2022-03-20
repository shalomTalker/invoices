import Auth from '@aws-amplify/auth';
import React, { useEffect, useState } from 'react';

export default function useCurrentUser() {
  const [user, setUser] = useState({});
  

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUserInfo = await Auth.currentUserInfo();
        if (currentUserInfo) {
          setUser(currentUserInfo.attributes);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  },[]);
  console.log(user)
  return user;
}
