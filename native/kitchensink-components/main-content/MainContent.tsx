import React from "react";
import { Box, HStack, Heading } from "../../components/ui";
import HomestayInformationFold from "./HomestayInformationFold";
import NewThisWeekFold from "./NewThisWeekFold";

const MainContent = ({ modalVisible, setModalVisible }: any) => {
  return (
    <Box className="flex-1 md:h-[calc(100vh-144px)] md:pr-16 md:pl-8 overflow-auto">
      {/* explore page main content header */}
      <Box className="pt-6 pb-2.5 px-4 md:px-0">
        <HStack className="w-full items-center justify-between">
          <Heading size="xl">New this week</Heading>
          {/* Hidden for mobile screens */}
        </HStack>
      </Box>
      {/* explore page new this week fold 1 */}
      <NewThisWeekFold />
      {/* explore page homestay info fold 2 */}
      <HomestayInformationFold />
    </Box>
  );
};
export default MainContent;
