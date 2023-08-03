import "./App.css";
import { Form } from "./components";
import { Header } from "./components";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Benefits } from "./components/Benefits";
import { Benefit } from "./components/Benefit";

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <Header />
        <Form />
        <Benefits />
        <Benefit />
      </ChakraProvider>
    </QueryClientProvider>
  );
}
