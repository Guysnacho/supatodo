import { ChakraProvider } from "@chakra-ui/react";
import customTheme from "../lib/theme.js";
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={customTheme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
