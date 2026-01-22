import { Box, HStack, Pressable, VStack } from "@/components/ui";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import ComicReader from "./ComicReaderPage/ComicReader";
import MobileReaderToolbar from "./ComicReaderPage/MobileReaderToolbar";

type Volume = {
  id: string;
  volumeNumber: number;
  title: string;
  totalPage: number;
};

type ComicReaderPageProps = {
  comic: {
    id: string;
    title: string;
    cover?: any;
    volumes: Volume[];
  };
  currentVolumeId: string;
};

const ComicReaderPage = ({ comic, currentVolumeId }: ComicReaderPageProps) => {
  const router = useRouter();
  const [isToolbarVisible, setIsToolbarVisible] = useState(true);

  const handleToggleToolbar = () => {
    setIsToolbarVisible(!isToolbarVisible);
  };

  return (
    <Box className="flex-1">
      {/* Web端布局 */}
      <HStack className="hidden md:flex flex-1">
        {/* 右侧：阅读区域 */}
        <Box className="flex-1">
          <ComicReader volumeId={currentVolumeId} />
        </Box>
      </HStack>

      {/* 移动端布局 */}
      <VStack className="flex-1 md:hidden">
        {/* 中间：阅读内容区域（点击可切换底部工具栏显示/隐藏） */}
        <Pressable className="flex-1" onPress={handleToggleToolbar}>
          <ComicReader volumeId={currentVolumeId} />
        </Pressable>

        {/* 下方：阅读进度 + 工具栏（可收起） */}
        {isToolbarVisible && (
          <Box className={"absolute bottom-0 left-0 right-0"}>
            <MobileReaderToolbar
              currentVolumeId={currentVolumeId}
              volumes={comic.volumes}
            />
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default ComicReaderPage;
