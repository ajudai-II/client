import HomeBanner from "@/components/HomeBanner/HomeBanner";
import Seo from "@/components/Seo/Seo";
import { homeMock } from "@/mocks/homeMock";
import { Box } from "@chakra-ui/react";

export default function Home() {
  return (
    <>
      <Seo title={"Ajudaí | Homepage"} />
      <Box w={"100%"} h={"100dvh"}>
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
      </Box>
    </>
  );
}
