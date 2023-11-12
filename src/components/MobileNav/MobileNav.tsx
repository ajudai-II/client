import React from "react";
import { Box } from "@chakra-ui/react";
import { StarIcon, SettingsIcon, SunIcon, BellIcon } from "@chakra-ui/icons";
import style from "./mobileNav.module.scss";
import { useRouter } from "next/router";

const MobileNav = () => {
  const navigation = useRouter();

  return (
    <nav className={style.mobileNav}>
      <Box
        w={"100%"}
        p={4}
        bgColor={"#dcdcdc"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-around"}
      >
        <StarIcon
          onClick={() => navigation.push("/my-donations")}
          color={"#404040"}
          w={6}
          h={6}
          cursor={"pointer"}
        />
        <SunIcon color={"#404040"} w={6} h={6} cursor={"pointer"} />
        <BellIcon color={"#404040"} w={6} h={6} cursor={"pointer"} />
        <SettingsIcon color={"#404040"} w={6} h={6} cursor={"pointer"} />
      </Box>
    </nav>
  );
};

export default MobileNav;
