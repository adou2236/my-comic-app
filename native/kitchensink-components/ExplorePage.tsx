import React from "react";
import { Box, HStack, Switch } from "../components/ui";
import Banner from "./Banner";
import Header from "./Header";
import WebSidebar from "./WebSidebar";
import MainContent from "./main-content/MainContent";
import { ScrollView } from "react-native";
import Listpage from "./ListPage";

const Explorepage = ({ activeTab, setActiveTab }: any) => {
  const [isSearching, setIsSearching] = React.useState(false);
  return (
    <>
      <Switch
        value={isSearching}
        onValueChange={(value: any) => setIsSearching(value)}
      />
      <Box
        className={`w-full ${
          activeTab != "user" && activeTab != "search" ? "flex" : "hidden"
        }`}
      >
        {/* top banner */}
        <Banner />
        {/* header */}
        <Header />
      </Box>

      {/* mobile */}
      <ScrollView className="h-[1px] md:hidden">
        <Box
          className={`${
            activeTab != "user" && activeTab != "search" ? "flex" : "hidden"
          } md:hidden`}
        >
          <MainContent setActiveTab={setActiveTab} activeTab={activeTab} />
        </Box>
      </ScrollView>

      {/* web */}
      <HStack className="w-full hidden md:flex flex-1">
        <WebSidebar />
        {isSearching ? (
          <Box className="flex-1">
            <Listpage
              isActive={isSearching}
              setActiveTab={setActiveTab}
              activeTab={activeTab}
            />
          </Box>
        ) : (
          <ScrollView style={{ flex: 1 }}>
            <MainContent setActiveTab={setActiveTab} activeTab={activeTab} />
          </ScrollView>
        )}
      </HStack>
    </>
  );
};

export default Explorepage;
