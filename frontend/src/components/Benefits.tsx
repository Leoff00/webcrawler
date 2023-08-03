import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Text,
  Box,
} from "@chakra-ui/react";
import { Spinner } from "./Spinner";
import { useQuery } from "react-query";
import { AxiosError } from "axios";
import { FindBenefitsResponseProps, findBenefits } from "../api";

export function Benefits() {
  const {
    isLoading,
    isError,
    data: benefits,
  } = useQuery<FindBenefitsResponseProps, AxiosError>("benefits", findBenefits);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      {isError || !benefits ? (
        <Text fontWeight={600} color="blackAlpha.900">
          Sem beneficios ainda...
        </Text>
      ) : (
        ""
      )}
      {benefits && (
        <Box overflow={"scroll"}>
          <TableContainer>
            <Table variant="simple">
              <TableCaption>Tabela de benefícios</TableCaption>
              <Thead>
                <Tr>
                  <Th>Id</Th>
                  <Th>Benefícios</Th>
                  <Th>Rótulo</Th>
                </Tr>
              </Thead>
              <Tbody>
                {benefits?.benefits.map((data) => {
                  return (
                    <Tr key={data._id}>
                      <Td>{data._id}</Td>
                      <Td>{data._source.benefits}</Td>
                      <Td>{data._index}</Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </>
  );
}
