import "@/styles/globals.css";
import { ThirdwebProvider } from "thirdweb/react";
import { ArbitrumSepolia } from "@thirdweb-dev/chains";

export default function App({ Component, pageProps }) {
  return (
    <ThirdwebProvider
      activeChain={ArbitrumSepolia}
      clientId="e4fe35424238e85ff5a4d6b33b04e8f5"
    >
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}
