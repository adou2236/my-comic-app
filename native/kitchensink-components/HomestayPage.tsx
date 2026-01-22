import React, { useEffect } from "react";
import { StatusBar, Platform } from "react-native";
import { Box } from "../components/ui";
import MobileBottomTabs from "./MobileBottomTabs";
import MobileModeChangeButton from "./MobileModeChangeButton";
import { Plus, Home, Heart, User, Search, Download } from "lucide-react-native";
import MobileProfilePage from "./MobileProfilePage";
import Explorepage from "./ExplorePage";
import Listpage from "./ListPage";

const bottomTabs = [
  {
    icon: Home,
    key: "home",
    label: "首页",
  },
  {
    icon: Search,
    key: "search",
    label: "搜索",
  },
  {
    icon: User,
    key: "user",
    label: "我的",
  },
];

const HomestayPage = () => {
  useEffect(() => {
    if (Platform.OS === "web") {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100%";
    }
  }, []);

  const [activeTab, setActiveTab] = React.useState("home");

  return (
    <>
      <Box className="flex-1">
        <StatusBar />

        <Box className="flex-1">
          <MobileProfilePage isActive={activeTab === "user"} />

          <Explorepage setActiveTab={setActiveTab} activeTab={activeTab} />

          <Listpage
            isActive={activeTab === "search"}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />

          <MobileModeChangeButton />
        </Box>
        {/* mobile bottom tabs */}
        <Box className="h-[72px] items-center w-full flex md:hidden border-t border-outline-50">
          <MobileBottomTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            bottomTabs={bottomTabs}
          />
        </Box>
      </Box>
      {/* )} */}
    </>
  );
};
export default HomestayPage;
