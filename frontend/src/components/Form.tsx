import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Button, Flex, Text } from "@chakra-ui/react";
import { Input } from "@chakra-ui/input";
import { useState } from "react";
import { useMutation } from "react-query";
import {
  CustomResponseError,
  PayloadProps,
  SubmitBenefitResponseProps,
  submitBenefit,
} from "../api";
import { Spinner } from "./Spinner";

export function Form() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [cpf, setCPF] = useState("");
  const withoutFields = login === "" && password === "" && cpf === "";
  const halfFields = login === "" || password === "" || cpf === "";

  const { isError, mutate, data, error } = useMutation<
    SubmitBenefitResponseProps,
    CustomResponseError,
    PayloadProps
  >(submitBenefit);

  const resMessage = error?.response.data.message;

  const canDoRequest = !halfFields && !withoutFields;
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (withoutFields || halfFields) {
      alert("Por favor preencha os campos...");
    }

    const payload: PayloadProps = {
      login,
      password,
      cpf,
    };

    canDoRequest && mutate(payload);

    if (!data) {
      return <Spinner />;
    }
  };

  return (
    <>
      <FormControl isRequired style={{ padding: "1rem" }}>
        <FormLabel>Login</FormLabel>
        <Input
          required
          id="login"
          type="text"
          name="login"
          placeholder="Login"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setLogin(e.target.value)
          }
        />
        <FormLabel>Password</FormLabel>
        <Input
          required
          id="pwd"
          type="password"
          name="senha"
          placeholder="Password"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        />
        <FormLabel>CPF</FormLabel>
        <Input
          required
          id="cpf"
          name="cpf"
          placeholder="CPF"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setCPF(e.target.value)
          }
        />
      </FormControl>
      <Button onClick={(e) => handleSubmit(e)}>Consultar</Button>
      <Flex
        p={2}
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        {isError && <Text color={"tomato"}>{resMessage}</Text>}

        {data && (
          <Text color={"green"}>
            {data?.message}, por favor, aguarde um instante...
          </Text>
        )}
      </Flex>
    </>
  );
}
