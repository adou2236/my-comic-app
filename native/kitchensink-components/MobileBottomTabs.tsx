import { ThemeContext } from "@/app/_layout";
import { usePathname, useRouter } from "expo-router";
import React, { useContext } from "react";
import { HStack, Icon, Pressable, Text, VStack } from "../components/ui";
import ListYourPlaceModal from "./main-content/ListYourPlaceModal";
import MobileSidebarActionsheet from "./MobileSidebarActionsheet";

const MobileBottomTabs = ({ bottomTabs, activeTab, setActiveTab }: any) => {
  const { colorMode } = useContext(ThemeContext);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [actionsheetVisible, setActionsheetVisible] = React.useState(false);
  const router = useRouter();
  const pathname = usePathname();

  return (
    <>
      <HStack className="content-center absolute bottom-0 justify-between w-full py-3 px-6 md:hidden">
        {bottomTabs.map((tab: any) => {
          return (
            <Pressable
              key={tab.label}
              onPress={() => router.replace(tab.key)}
              disabled={tab.disabled}
              //@ts-ignore
              opacity={tab.disabled ? 0.5 : 1}
            >
              <VStack className="items-center">
                <Icon
                  as={tab.icon}
                  size={"lg"}
                  className={`${
                    pathname === tab.key
                      ? "text-typography-900"
                      : "text-typography-400"
                  }`}
                />
                <Text
                  size="xs"
                  className={`${
                    pathname === tab.key
                      ? "text-typography-900"
                      : "text-typography-400"
                  }`}
                >
                  {tab.label}
                </Text>
              </VStack>
            </Pressable>
          );
        })}
      </HStack>

      <ListYourPlaceModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />

      <MobileSidebarActionsheet
        actionsheetVisible={actionsheetVisible}
        setActionsheetVisible={setActionsheetVisible}
      />
    </>
  );
};

export default MobileBottomTabs;
