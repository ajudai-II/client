import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";

const MyDonations = () => {
  return (
    <Box
      display={"flex"}
      h={"150px"}
      gap={"10px"}
      border={"0.5px solid #dcdcdc"}
      borderRadius={"10px"}
    >
      <Image
        objectFit="cover"
        w={"40%"}
        borderRadius={"10px 0 0 10px"}
        src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
        alt="Caffe Latte"
      />

      <Stack h={"100%"} justifyContent={"center"}>
        <Text>Copo de unity</Text>
        <Text>Copo que ganhei em uma festa histórica</Text>
        <ButtonGroup>
          <Button bg={"blue.500"} color={"white"}>
            Editar
          </Button>
          <Button bg={"red.500"} color={"white"}>
            Excluir
          </Button>
        </ButtonGroup>
      </Stack>
    </Box>
  );
};

export default MyDonations;
