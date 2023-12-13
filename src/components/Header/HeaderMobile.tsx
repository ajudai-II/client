import { headerRoutes } from "@/const/pages";
import { routesEnum } from "@/const/routes.enum";
import { ArrowBackIcon, BellIcon } from "@chakra-ui/icons";
import { Box, Button, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import Siderbar from "../Sidebar/Siderbar";

const HeaderMobile = () => {
  const navigation = useRouter();
  const { asPath } = useRouter();

  return (
    <Box
      display={"flex"}
      w={"100%"}
      alignItems={"center"}
      justifyContent={"space-between"}
      padding={"10px"}
      pos={"fixed"}
      top={0}
      bg={"white"}
      zIndex={100}
      as="header"
    >
      {headerRoutes.includes(asPath) ? null : (
        <>
          {asPath !== "/" && (
            <Button
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              bg={"none"}
              title="Go back"
              onClick={() => navigation.back()}
            >
              <ArrowBackIcon />
            </Button>
          )}
          {asPath === "/" && <Siderbar />}

          <Heading size={"md"} textAlign={"center"}>
            {routesEnum[asPath as keyof typeof routesEnum] || ""}
          </Heading>
          {asPath !== "/" && <Siderbar />}

          {asPath === "/" && (
            <Button
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              bg={"none"}
              title="Notifications"
            >
              <BellIcon w={8} h={8} p={0} m={0} />
            </Button>
          )}
        </>
      )}
    </Box>
  );
};

export default HeaderMobile;
