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
  Input,
  Button,
  Box,
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import { useState } from "react";
import {
  CustomResponseError,
  FindBenefitByIdResponseProps,
  findBenefit,
} from "../api";

export function Benefit() {
  const [elasticId, setElasticId] = useState("");

  const notEmpty = elasticId.trim() !== "";

  const {
    isError,
    data: benefit,
    refetch,
  } = useQuery<FindBenefitByIdResponseProps, CustomResponseError>(
    ["benefits", elasticId],
    () => findBenefit(elasticId),
    { enabled: false, refetchOnWindowFocus: false }
  );

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    refetch();
    notEmpty && findBenefit(elasticId);
  };

  return (
    <>
      <Box>
        <Input
          placeholder="Busque aqui um benefício pelo id"
          name="elasticId"
          type="text"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setElasticId(e.target.value)
          }
        />
        <Button onClick={(e) => handleSubmit(e)}>Buscar por ID!</Button>
      </Box>

      {isError || !benefit ? (
        <Text fontWeight={600} color="blackAlpha.900">
          Sem beneficios consultados ainda. Consulte um!
        </Text>
      ) : (
        ""
      )}

      {benefit && (
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
              {benefit?.benefit?.map((data) => {
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
      )}
    </>
  );
}
