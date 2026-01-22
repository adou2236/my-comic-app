import { ThemeContext } from "@/app/_layout";
import { Box, HStack } from "@/components/ui";
import VolumeList from "@/kitchensink-components/ComicReaderPage/VolumeList";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useContext } from "react";
import { StatusBar } from "react-native";
import { useComic } from "../_layout";

export default function StackLayout() {
  const { comic, loading } = useComic(); // 直接从 Context 获取
  const { colorMode } = useContext(ThemeContext);
  const router = useRouter();
  const { id, volumId } = useLocalSearchParams<{
    id: string;
    volumId: string;
  }>();

  const handleVolumeChange = (volumeId: string) => {
    router.replace(`/comic/${id}/${volumeId}`);
  };

  if (loading || !comic) {
    return <Box className="flex-1 items-center justify-center">加载中</Box>;
  }

  return (
    <HStack className="flex-1">
      {/* Web端布局 */}
      {/* 左侧：卷集选择列表 */}
      <Box className="w-64 border-r hidden md:flex">
        <VolumeList
          volumes={comic.volumes}
          currentVolumeId={volumId}
          onVolumeChange={handleVolumeChange}
        />
      </Box>
      <StatusBar hidden />

      {/* web */}
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      ></Stack>
    </HStack>
  );
}
