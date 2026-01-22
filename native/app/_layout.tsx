import { Box, GluestackUIProvider, SafeAreaView } from "@/components/ui";
import "@/global.css";
import Header from "@/kitchensink-components/Header";
import MobileBottomTabs from "@/kitchensink-components/MobileBottomTabs";
import MobileModeChangeButton from "@/kitchensink-components/MobileModeChangeButton";
import * as Linking from "expo-linking";
import { Stack, useSegments } from "expo-router";
import { Home, Search, User } from "lucide-react-native";
import React from "react";
import { StatusBar } from "react-native";


const bottomTabs = [
  {
    icon: Home,
    key: "/",
    label: "首页",
  },
  {
    icon: Search,
    key: "/search",
    label: "搜索",
  },
  {
    icon: User,
    key: "/user",
    label: "我的",
  },
];
let defaultTheme: "dark" | "light" = "light";

Linking.getInitialURL().then((url: any) => {
  let { queryParams } = Linking.parse(url) as any;
  defaultTheme = queryParams?.iframeMode ?? defaultTheme;
});

type ThemeContextType = {
  colorMode?: "dark" | "light";
  toggleColorMode?: () => void;
};
export const ThemeContext = React.createContext<ThemeContextType>({
  colorMode: "light",
  toggleColorMode: () => {},
});

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const [colorMode, setColorMode] = React.useState<"dark" | "light">(
    defaultTheme
  );

  const toggleColorMode = async () => {
    setColorMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const segments = useSegments();

  return (
    <>
      {/* top SafeAreaView */}
      <ThemeContext.Provider value={{ colorMode, toggleColorMode }}>
        <GluestackUIProvider mode={colorMode}>
          {/* bottom SafeAreaView */}
          <SafeAreaView
            className={`${
              colorMode === "light"
                ? "bg-background-light"
                : "bg-background-dark"
            } flex-1 overflow-hidden`}
          >
            <Box className="flex-1">
              <StatusBar />
              <MobileModeChangeButton />
              <Box className={`w-full flex}`}>
                {/* top banner */}
                {/* <Banner /> */}
                {/* header */}
                <Header />
              </Box>
              <Stack
                screenOptions={{
                  headerShown: false,
                  contentStyle: {
                    backgroundColor:
                      colorMode === "light" ? "#FBFBFB" : "#181719",
                  },
                }}
              >
                <Stack.Screen name="(main)" options={{ animation: 'slide_from_left' }} />
                <Stack.Screen name="user" options={{ animation: 'slide_from_right' }} />
              </Stack>
              {/* mobile bottom tabs */}
              {segments[1] === "comic" && segments[2] && segments[3] ? null : (
                <Box className="h-[72px] items-center w-full flex md:hidden border-t border-outline-00">
                  <MobileBottomTabs bottomTabs={bottomTabs} />
                </Box>
              )}
            </Box>
          </SafeAreaView>
        </GluestackUIProvider>
      </ThemeContext.Provider>
    </>
  );
}
