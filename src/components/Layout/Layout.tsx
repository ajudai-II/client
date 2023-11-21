import { Box, useMediaQuery } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useRef } from "react";
import Header from "../Header/Header";
import HeaderMobile from "../Header/HeaderMobile";
import MobileNav from "../MobileNav/MobileNav";

interface ILayout {
  children: React.ReactNode;
  showLayout: boolean;
}
const Layout: React.FC<ILayout> = ({ children, showLayout }) => {
  const { asPath } = useRouter();
  const refContainer = useRef<null | HTMLDivElement>(null);
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    refContainer?.current?.scroll({
      top: 0,
      behavior: "smooth",
    });
  }, [asPath]);

  return (
    <div>
      {showLayout ? (
        <Box>
          <Box ref={refContainer}>
            {isLargerThan768 ? <Header /> : <HeaderMobile />}
            <Box>{children}</Box>
            {isLargerThan768 ? null : <MobileNav />}
          </Box>
        </Box>
      ) : (
        <div> {children} </div>
      )}
    </div>
  );
};

export default Layout;
