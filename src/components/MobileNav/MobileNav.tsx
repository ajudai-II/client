import React from "react";
import { Box, Text } from "@chakra-ui/react";
import style from "./mobileNav.module.scss";
import { BsFillHouseDoorFill, BsFillPersonFill, BsList } from "react-icons/bs";
import { LuSettings } from "react-icons/lu";
import { useRouter } from "next/router";
import { headerRoutes } from "@/const/pages";

const iconsNav = [
  { icon: BsFillHouseDoorFill, label: "Home", path: "/" },
  { icon: BsFillPersonFill, label: "Perfil", path: "/my-account" },
  { icon: BsList, label: "Doações", path: "/my-donations" },
  { icon: LuSettings, label: "Opções", path: "/settings" },
];

const MobileNav = () => {
  const navigation = useRouter();
  const { asPath } = useRouter();

  return (
    <>
      {headerRoutes.includes(asPath) ? null : (
        <nav className={style.mobileNav}>
          <Box
            w="100%"
            p={1.5}
            bgColor="#000"
            display="flex"
            alignItems="center"
            justifyContent="space-around"
          >
            {iconsNav.map(({ icon: Icon, label, path }, index) => (
              <Box
                key={index}
                textAlign="center"
                display="flex"
                flexDirection="column"
                alignItems="center"
                onClick={() => navigation.push(path)}
              >
                <Icon color="#fff" size={24} cursor="pointer" />
                <Text color="#fff" fontSize="xs" mt={1} fontWeight="medium">
                  {label}
                </Text>
              </Box>
            ))}
          </Box>
        </nav>
      )}
    </>
  );
};

export default MobileNav;
