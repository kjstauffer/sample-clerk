/* eslint-disable @typescript-eslint/naming-convention */
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Descope, useDescope, useSession, useUser, getSessionToken } from '@descope/react-sdk';

// import { NhlStandings } from './components/NhlStandings';

const queryClient = new QueryClient();

const Wrapper = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="mx-auto my-8 mt-10 w-96 rounded border border-gray-200 p-4 shadow-md dark:border-neutral-600 dark:bg-neutral-800 dark:shadow-none">
      {children}
    </div>
  );
};

const Auth = () => {
  const { isSessionLoading } = useSession();

  if (isSessionLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Wrapper>
      <Descope
        flowId="sign-up-or-in"
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        onSuccess={(e: CustomEvent) => console.log(e.detail.user)}
        onError={(_e) => console.log(`Could not log in!`)}
      />
    </Wrapper>
  );
};

const Admin = () => {
  const { isUserLoading, user } = useUser();
  const { logout } = useDescope();
  const sessionToken = getSessionToken();

  const handleGetNumbers = React.useCallback(() => {
    const doFetch = async () => {
      console.log(`token`, sessionToken);

      const res = await fetch(`/numbers`, {
        headers: {
          Accept: `application/json, text/plain, */*`,
          'Content-Type': `application/json`,
          Authorization: `Bearer ${sessionToken}`,
        },
      });

      const data = (await res.json()) as unknown as number[];

      console.log(data);
    };

    void doFetch();
  }, [sessionToken]);

  const handleLogout = React.useCallback(() => {
    void logout();
  }, [logout]);

  if (isUserLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Wrapper>
      <p>Hello {user.name}</p>
      <div>My Private Component</div>
      <p onClick={handleGetNumbers}>Get Numbers</p>
      <button onClick={handleLogout}>Logout</button>
    </Wrapper>
  );
};

const App = () => {
  const { isAuthenticated } = useSession();

  return (
    <QueryClientProvider client={queryClient}>
      {!isAuthenticated && <Auth />}
      {isAuthenticated && <Admin />}
    </QueryClientProvider>
  );
};

export { App };
