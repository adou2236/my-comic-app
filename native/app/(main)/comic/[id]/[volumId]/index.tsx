import { Box, Pressable, Text, VStack } from "@/components/ui";
import ComicReader from "@/kitchensink-components/ComicReaderPage/ComicReader";
import MobileReaderToolbar from "@/kitchensink-components/ComicReaderPage/MobileReaderToolbar";
import ProgressControl from "@/kitchensink-components/ComicReaderPage/ProgressControl";
import { useComicReader } from '@/kitchensink-components/ComicReaderPage/hooks/useComicReader';

import type { ComicReaderRef } from "@/kitchensink-components/ComicReaderPage/types";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { useComic } from "../_layout";

export default function ComicReaderPage() {
  const { volumId } = useLocalSearchParams<{
    id: string;
    volumId: string;
  }>();
  // 模拟图片 URL 数组（实际应该从 API 获取）
  // 这里使用本地图片作为示例，实际使用时应该是在线 URL
  const comicsData = [
    "https://picsum.photos/800/1200?random=1",
    "https://picsum.photos/800/400?random=2",
    "https://picsum.photos/800/800?random=3",
    "https://picsum.photos/600/600?random=4",
    "https://picsum.photos/1200/1200?random=5",
    "https://picsum.photos/300/1200?random=6",
    "https://picsum.photos/400/400?random=7",
    "https://picsum.photos/400/400?random=8",
    "https://picsum.photos/400/400?random=9",
    "https://picsum.photos/400/400?random=10",
    "https://picsum.photos/400/400?random=11",
    "https://picsum.photos/400/400?random=12",
    "https://picsum.photos/400/400?random=13",
    "https://picsum.photos/400/400?random=14",
    "https://picsum.photos/400/400?random=15",
    "https://picsum.photos/400/400?random=16",
    "https://picsum.photos/400/400?random=17",
    "https://picsum.photos/400/400?random=18",
    "https://picsum.photos/400/400?random=19",
    "https://picsum.photos/400/400?random=20",
    "https://picsum.photos/400/400?random=21",
    "https://picsum.photos/400/400?random=22",
    "https://picsum.photos/400/400?random=23",
    "https://picsum.photos/400/400?random=24",
    "https://picsum.photos/400/400?random=25",
    "https://picsum.photos/400/400?random=26",
    "https://picsum.photos/400/400?random=27",
    "https://picsum.photos/400/400?random=28",
    "https://picsum.photos/400/400?random=29",
    "https://picsum.photos/400/400?random=30",
    "https://picsum.photos/400/400?random=31",
    "https://picsum.photos/400/400?random=32",
    "https://picsum.photos/400/400?random=33",
    "https://picsum.photos/400/400?random=34",
    "https://picsum.photos/400/400?random=35",
    "https://picsum.photos/400/400?random=36",
    "https://picsum.photos/400/400?random=37",
    "https://picsum.photos/400/400?random=38",
    "https://picsum.photos/400/400?random=39",
    "https://picsum.photos/400/400?random=40",
  ];
  const { comic, loading: comicLoading } = useComic();
  const [isToolbarVisible, setIsToolbarVisible] = useState(true);
  const [loading, setLoading] = useState(true);
  const [initialCurrentPage] = useState(0);
  const currentVolume = comic.volumes.find((v: any) => v.id === volumId)!;
  const readerRef = React.useRef<ComicReaderRef>(null);
  const {
    currentPage,
    updatePage,
  } = useComicReader({
    data: comicsData,
    initialCurrentPage,
  });
  
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [volumId]);

  if (loading || comicLoading) {
    return (
      <Box className="flex-1 items-center justify-center">
        <Text>加载中</Text>
        {/* 可以添加骨架屏 */}
      </Box>
    );
  }

  const handleToggleToolbar = () => {
    setIsToolbarVisible(!isToolbarVisible);
  };

  

  

  const handlePageChange = (page: number) => {
    updatePage(page);
  };

  const handleProgressChange = (page: number) => {
    readerRef.current?.goToPage(page, Math.abs(page - currentPage) < 3 ? true : false);
    updatePage(page);
  };

  return (
    <Box className="flex-1">
      {/* Web端布局 */}
      <VStack className="hidden md:flex flex-1">
        {/* 右侧：阅读区域 */}
        <Box className="flex-1">
          <ComicReader
            ref={readerRef}
            data={comicsData}
            initialCurrentPage={initialCurrentPage}
            readingMode="pagination"
            pageDirection="right"
            enableKeyboard={true}
            imageFit="contain"
            onPageChange={handlePageChange}
          />
        </Box>
        <Box className="pt-2 pb-4 px-8">
          <ProgressControl
            currentPage={currentPage}
            totalPage={currentVolume.totalPage}
            onPageChange={handleProgressChange}
          />
        </Box>
      </VStack>

      {/* 移动端布局 */}
      <Box className="flex-1 md:hidden relative">
        {/* 中间：阅读内容区域（点击可切换底部工具栏显示/隐藏） */}
        <Box className="flex-1">
          <ComicReader
            ref={readerRef}
            data={comicsData}
            initialCurrentPage={initialCurrentPage}
            readingMode="pagination"
            pageDirection="right"
            enableKeyboard={false}
            preloadCount={2}
            imageFit="contain"
            onPageChange={handlePageChange}
          />
          <Pressable className="w-1/4 aspect-square absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2" onPress={handleToggleToolbar}></Pressable>
        </Box>

        {/* 下方：阅读进度 + 工具栏（可收起） */}
        {isToolbarVisible && (
          <VStack className="absolute bottom-0 left-0 right-0 border-t p-4 gap-3 bg-background-0 border-outline-300">
            <ProgressControl
              currentPage={currentPage}
              totalPage={currentVolume.totalPage}
              onPageChange={handleProgressChange}
            />
            <MobileReaderToolbar
              currentVolume={currentVolume}
              volumes={comic.volumes}
            />
          </VStack>
        )}
      </Box>
    </Box>
  );
}
