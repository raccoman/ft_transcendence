import type { FC, ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import type { Channels, Profiles } from 'types/hasura';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
  isPublicRoute?: boolean;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export type FCWithChildren<V = {}> = FC<{ children?: ReactNode } & V>

export interface SessionContextProps {
  signIn: (() => void) | undefined;
  isLoading: boolean;
  profile: Profiles | undefined;
}

export interface ChatContextProps {
  channels: Channels[];
}