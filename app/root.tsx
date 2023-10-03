// root.tsx
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { withEmotionCache } from '@emotion/react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react';
import {
  MetaFunction,
  LinksFunction,
  LoaderFunction,
  json,
} from '@remix-run/node'; // Depends on the runtime you choose

import { ServerStyleContext, ClientStyleContext } from './context';
import {
  createBrowserClient,
  createServerClient,
} from '@supabase/auth-helpers-remix';
import { createSupabaseServerClient } from './utils/supabase.server';

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'GUAC 7 Pump',
  viewport: 'width=device-width,initial-scale=1',
});

export let links: LinksFunction = () => {
  return [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap',
    },
  ];
};

interface DocumentProps {
  children: React.ReactNode;
}

const theme = extendTheme({
  components: {
    FormLabel: {
      baseStyle: {
        fontSize: 'sm',
      },
    },
    FormErrorMessage: {
      baseStyle: {
        fontSize: 'sm',
      },
    },
  },
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  styles: {
    global: () => ({
      body: {
        bg: '#222222',
      },
    }),
  },
});

// Typescript
// This will return cookies
export const loader: LoaderFunction = async ({ request }) => {
  // first time users will not have any cookies and you may not return
  // undefined here, hence ?? is necessary
  // request.headers.get('cookie') ?? '';
  const env = {
    SUPABASE_URL: process.env.SUPABASE_URL!,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY!,
  };

  const response = new Response();
  const supabase = createSupabaseServerClient({
    request,
    response,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return json({ env, session }, { headers: response.headers });
};

const Document = withEmotionCache(
  ({ children }: DocumentProps, emotionCache) => {
    const serverStyleData = useContext(ServerStyleContext);
    const clientStyleData = useContext(ClientStyleContext);

    // Only executed on client
    useEffect(() => {
      // re-link sheet container
      emotionCache.sheet.container = document.head;
      // re-inject tags
      const tags = emotionCache.sheet.tags;
      emotionCache.sheet.flush();
      tags.forEach((tag) => {
        (emotionCache.sheet as any)._insertTag(tag);
      });
      // reset cache to reapply global styles
      clientStyleData?.reset();
    }, []);

    return (
      <html lang="en">
        <head>
          <Meta />
          <Links />
          {serverStyleData?.map(({ key, ids, css }) => (
            <style
              key={key}
              data-emotion={`${key} ${ids.join(' ')}`}
              dangerouslySetInnerHTML={{ __html: css }}
            />
          ))}
        </head>
        <body>
          {children}
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </body>
      </html>
    );
  }
);

export default function App() {
  const { env, session } = useLoaderData();

  const [supabase] = useState(() =>
    createBrowserClient(env.SUPABASE_URL!, env.SUPABASE_ANON_KEY!)
  );
  return (
    <Document>
      <ChakraProvider theme={theme}>
        <Outlet context={{ supabase, session }} />
      </ChakraProvider>
    </Document>
  );
}
