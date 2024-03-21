'use client';
import { useState } from 'react';
import { QueryClientProvider, Hydrate, QueryClient } from '@tanstack/react-query';
import SettingProvider from '@/Helper/SettingContext/SettingProvider';
import AccountProvider from '@/Helper/AccountContext/AccountProvider';
import BadgeProvider from '@/Helper/BadgeContext/BadgeProvider';
import CategoryProvider from '@/Helper/CategoryContext/CategoryProvider';
import CartProvider from '@/Helper/CartContext/CartProvider';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const TanstackWrapper = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={children.dehydratedState}>
        <SettingProvider>
          <AccountProvider>
            <BadgeProvider>
              <CategoryProvider>
                <CartProvider>{children}</CartProvider>
              </CategoryProvider>
            </BadgeProvider>
          </AccountProvider>
        </SettingProvider>
      </Hydrate>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default TanstackWrapper;
