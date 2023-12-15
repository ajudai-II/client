import { Box, Button, Text } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

const NotFound = () => {
  const router = useRouter();
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"column"}
      gap={4}
      w={"100%"}
      h={"100dvh"}
    >
      <Image
        src={"/icons/logo.svg"}
        alt={"logo do ajudai"}
        width={192}
        height={192}
      />
      <Text as={"h1"} fontSize={"4rem"}>
        404
      </Text>

      <Text as={"h2"} fontSize={"2rem"}>
        Page not found
      </Text>
      <Button onClick={() => router.push("/")}>Go back home</Button>
    </Box>
  );
};

export default NotFound;
