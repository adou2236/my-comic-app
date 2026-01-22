import { ThemeContext } from "@/app/_layout";
import { Box, HStack } from "@/components/ui";

import WebSidebar from "@/kitchensink-components/WebSidebar";
import { Stack, useGlobalSearchParams, usePathname } from "expo-router";
import React, { useContext } from "react";

export default function StackLayout() {
  const { colorMode } = useContext(ThemeContext);
  const pathname = usePathname();
  const { volumId } = useGlobalSearchParams();
  return (
    <>
      {/* web */}
      <HStack className="w-full md:flex flex-1">
        {volumId ? null : (
          <Box className="hidden md:block">
            <WebSidebar />
          </Box>
        )}
        <Box className="flex-1">
          <Stack
            screenOptions={{
              headerShown: false,
              headerStyle: {
                backgroundColor: colorMode === "light" ? "#FBFBFB" : "#181719",
              },
              headerTintColor: colorMode === "light" ? "black" : "white",
              contentStyle: {
                backgroundColor: colorMode === "light" ? "#FBFBFB" : "#181719",
              },
            }}
            
          >
            <Stack.Screen name="index" options={{ animation: 'slide_from_left' }} />
            <Stack.Screen name="search" options={{ animation: 'slide_from_right' }} />
          </Stack>
        </Box>
      </HStack>
    </>
  );
}
