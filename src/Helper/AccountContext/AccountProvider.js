import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useCookies } from 'react-cookie';
import AccountContext from '.';
import request from '../../Utils/AxiosUtils';
import { selfData } from '../../Utils/AxiosUtils/API';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

const AccountProvider = (props) => {
  const [cookies] = useCookies(['auth']);
  const [role, setRole] = useState('');
  const router = useRouter();
  const { data, isLoading } = useQuery([selfData], () => request({ url: selfData }, router), {
    refetchOnWindowFocus: false,
    select: (res) => {
      return res?.data;
    },
  });
  const [accountData, setAccountData] = useState();
  const [accountContextData, setAccountContextData] = useState({
    name: '',
    image: {},
  });

  useEffect(() => {
    if (data) {
      //   localStorage.setItem('role', JSON.stringify(data?.role));
      // Set token in cookies
      cookies.auth = data?.token;
      const cookie = Cookies.get('auth')
      // decode jwt
      const accountData = jwtDecode(cookie)

      setRole(data?.role?.name);
      setAccountData(accountData);
    }
  }, [isLoading, cookies.auth]);

  return (
    <AccountContext.Provider
      value={{ ...props, accountData, setAccountData, accountContextData, setAccountContextData, role, setRole }}
    >
      {props.children}
    </AccountContext.Provider>
  );
};
export default AccountProvider;
