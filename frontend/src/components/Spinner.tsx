import { Spinner as SpinnerComponent } from "@chakra-ui/react";

export function Spinner() {
  return (
    <>
      <div>
        <SpinnerComponent
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
        <p>Carregando...</p>
      </div>
    </>
  );
}
