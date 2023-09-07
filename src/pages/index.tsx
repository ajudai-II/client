import Header from "@/components/Header/Header";
import HomeBanner from "@/components/HomeBanner/HomeBanner";
import MobileNav from "@/components/MobileNav/MobileNav";
import Seo from "@/components/Seo/Seo";
import { homeMock } from "@/mocks/homeMock";
import { Box } from "@chakra-ui/react";

export default function Home() {
  return (
    <>
      <Seo title={"Ajudaí | Homepage"} />
      <Box w={"100%"} h={"100dvh"}>
        <Header />
        <Box>
          {homeMock.map((item) => (
            <HomeBanner
              key={item.id}
              picture={item.picture}
              alt={item.title}
              title={item.title}
            />
          ))}
        </Box>
        <MobileNav />
      </Box>
    </>
  );
}
