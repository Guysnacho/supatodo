import ManageTodo from "../components/ManageTodo";
import { useDisclosure } from "@chakra-ui/hooks";
import { supabaseClient } from "../lib/client";
import { useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import { useRouter } from "next/router";
import Head from "next/head";

const Home = () => {
  const initialRef = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const router = useRouter();
  const user = supabaseClient.auth.user();

  useEffect(() => {
    if (!user) {
      router.push("/signin");
    }
  }, [user, router]);

  return (
    <div>
      <Head>
        <title>TodoApp</title>
        <meta
          name="description"
          content="Awesome todoapp to store your awesome todos"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Navbar onOpen={onOpen} />
        <ManageTodo isOpen={isOpen} onClose={onClose} initialRef={initialRef} />
      </main>
    </div>
  );
};

export default Home;