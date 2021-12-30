import { ChakraProvider } from "@chakra-ui/react";
import { supabaseClient } from "../lib/client";
import customTheme from "../lib/theme.js";
import { useRouter } from "next/router";
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const user = supabaseClient.auth.user();

  useEffect(() => {
    const { data: authListener } = supabaseClient.auth.onAuthStateChange((event, session) => {
      handleAuthSession(event, session);
      if (event === "SIGNED_IN") {
        const signedInUser = supabaseClient.auth.user();
        const userId = signedInUser.id;
        supabaseClient
          .from("profiles")
          .upsert({ id: userId })
          .then((_data, error) => {
            if (!error) {
              router.push("/");
            }
          });
      }
      if (event === "SIGNED_OUT") {
        router.push("/signin");
      }
    }
    );

    return () => {
      authListener.unsubscribe();
    };

  }, [router]);

  useEffect(() => {
    if (user) { //If we have a user
      if (router.pathname === "/signin") { // and we're on the signin page
        router.push("/");
      }
    }
  }, [router.pathname, user, router]); //Only fire sideeffect when we have a router pathname, user, and the router

  const handleAuthSession = async (event, session) => {
    await fetch("/api/auth", {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      credentials: "same-origin",
      body: JSON.stringify({ event, session }),
    });
  };

  return (
    <ChakraProvider theme={customTheme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;