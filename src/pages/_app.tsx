import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import Layout from "@/components/Layout/Layout";
import DonationContextProvider from "@/context/DonationContext";
import { UserContextProvider } from "@/context/UserContext";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <UserContextProvider>
          <DonationContextProvider>
            <Layout showLayout={true}>
              <Component {...pageProps} />
            </Layout>
          </DonationContextProvider>
        </UserContextProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
}
