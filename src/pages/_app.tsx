import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import Layout from "@/components/Layout/Layout";
import DonationContextProvider from "@/context/DonationContext";
import { UserContextProvider } from "@/context/UserContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { layoutRoutes } from "@/const/pages";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const [showLayout, setShowLayout] = useState<boolean>(false);
  const { asPath } = useRouter();

  useEffect(() => {
    if (layoutRoutes.includes(asPath)) setShowLayout(true);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <UserContextProvider>
          <DonationContextProvider>
            <Layout showLayout={showLayout}>
              <Component {...pageProps} />
            </Layout>
          </DonationContextProvider>
        </UserContextProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
}
