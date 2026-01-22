import {
  Box,
  HStack,
  Icon,
  Pressable,
  Text,
  VStack,
} from "@/components/ui";
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetItem,
  ActionsheetItemText,
  ActionsheetVirtualizedList,
} from "@/components/ui/actionsheet";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeftIcon, List } from "lucide-react-native";
import { useRef, useState } from "react";

type Volume = {
  id: string;
  volumeNumber: number;
  title: string;
  totalPage: number;
};

type MobileReaderToolbarProps = {
  currentVolume: Volume;
  volumes: Volume[];
};

const MobileReaderToolbar = ({
  currentVolume,
  volumes,
}: MobileReaderToolbarProps) => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const currentVolumeId = currentVolume.id;
  const initialFocusRef = useRef<React.RefObject<any> | null>(null);
  const [showDrawer, setShowDrawer] = useState<boolean>(false);

  const handleVolumeChange = (volumeId: string) => {
    router.replace({
      pathname: "/comic/[id]/[volumId]",
      params: { id: id, volumId: volumeId },
    });
  };

  const getItem = (data: Volume[], index: number): Volume => data[index];
  const getItemCount = (data: Volume[]): number => data.length;
  const keyExtractor = (item) => item.id;
  const renderItem = ({ item }) => {
    const dom = (
      <ActionsheetItem
        key={item.id}
        ref={item.id === currentVolumeId ? initialFocusRef : null}
        onPress={() => handleVolumeChange(item.id)}
      >
        <ActionsheetItemText>
          第 {item.volumeNumber} 卷：{item.title}
        </ActionsheetItemText>
      </ActionsheetItem>
    );

    return dom;
  };
  return (
    <VStack>
      {/* 阅读信息 */}
      {currentVolume && (
        <Text className="text-xs text-center">
          第 {currentVolume.volumeNumber} 卷：{currentVolume.title}
        </Text>
      )}

      {/* 工具栏区域（先为空） */}
      <Box className="h-10">
        <HStack className="justify-between items-center">
          <Pressable>
            <Icon as={ArrowLeftIcon} />
          </Pressable>
          <Pressable onPress={() => setShowDrawer(true)}>
            <Icon as={List} />
          </Pressable>
        </HStack>
      </Box>

      {/* 卷集选择 */}
      <Actionsheet
        isOpen={showDrawer}
        initialFocusRef={initialFocusRef}
        snapPoints={[40]}
        onClose={() => {
          setShowDrawer(false);
        }}
      >
        <ActionsheetBackdrop />
        <ActionsheetContent>
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>
          <ActionsheetVirtualizedList
            initialNumToRender={10}
            data={volumes}
            getItemCount={getItemCount}
            getItem={getItem}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
          />
        </ActionsheetContent>
      </Actionsheet>
    </VStack>
  );
};

export default MobileReaderToolbar;
