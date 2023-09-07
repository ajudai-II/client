import React from "react";
import { Box } from "@chakra-ui/react";
import { StarIcon, SettingsIcon, SunIcon, BellIcon } from "@chakra-ui/icons";
import style from "./mobileNav.module.scss";

const MobileNav = () => {
  return (
    <nav className={style.mobileNav}>
      <Box
        w={"100%"}
        p={4}
        bgColor={"#00bbf9"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-around"}
      >
        <StarIcon color={"#fff"} w={6} h={6} cursor={"pointer"} />
        <SunIcon color={"#fff"} w={6} h={6} cursor={"pointer"} />
        <BellIcon color={"#fff"} w={6} h={6} cursor={"pointer"} />
        <SettingsIcon color={"#fff"} w={6} h={6} cursor={"pointer"} />
      </Box>
    </nav>
  );
};

export default MobileNav;
