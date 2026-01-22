import React, { forwardRef, useCallback, useImperativeHandle, useRef, useState } from 'react';
import { Dimensions, View, VirtualizedList } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Carousel from 'react-native-reanimated-carousel';
import ComicReaderPageItem from './ComicReaderPageItem';
import type { ComicReaderProps, ComicReaderRef } from './types';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const ComicReader = forwardRef<ComicReaderRef, ComicReaderProps>(({
  data,
  initialCurrentPage,
  readingMode = 'pagination',
  pageDirection = 'right',
  preloadCount = 2,
  enableZoom = true,
  enableKeyboard = false, // Native 端不支持键盘
  animationType = 'slide',
  imageFit = 'contain',
  onPageChange,
}, ref) => {
  const carouselRef = useRef<any>(null);
  const [containerSize, setContainerSize] = useState({ width: SCREEN_WIDTH, height: SCREEN_HEIGHT });

  // 暴露给外部的方法
  useImperativeHandle(ref, () => ({
    goToPage: (page: number, animated: boolean = true) => {
      // 确保页码在有效范围内
      const targetPage = Math.max(0, Math.min(page, data.length - 1));
      carouselRef.current?.scrollTo({
        index: targetPage,
        animated,
        onFinished: () => {
          // scrollTo 完成后，onSnapToItem 会触发，这里不需要重复调用 onPageChange
        },
      });
    },
  }), [data.length]);
 
  // 渲染单页
  const renderPageItem = useCallback(
    ({ item, index }: { item: string; index: number }) => {
      return (
        <ComicReaderPageItem
          key={index}
          item={item}
          index={index}
          imageFit={'contain'}
          containerWidth={containerSize.width}
          containerHeight={containerSize.height}
        />
      );
    },
    [containerSize]
  );

  // 页面切换回调
  const handleSnapToItem = useCallback(
    (index: number) => {
      onPageChange?.(index);
    },
    [onPageChange]
  );

  // 翻页模式渲染
  const renderPaginationMode = () => {
    return (
      <View
        className="flex-1 "
        dataSet={{ kind: "basic-layouts", name: "normal" }}
        onLayout={(e) => {
          const { width, height } = e.nativeEvent.layout;
          if (width > 0 && height > 0) {
            setContainerSize({ width, height });
          }
        }}
      >
        <Carousel
          ref={carouselRef}
          windowSize={10}
          width={containerSize.width}
          height={containerSize.height}
          data={data}
          defaultIndex={initialCurrentPage}
          loop={false}
          onSnapToItem={handleSnapToItem}
          renderItem={renderPageItem}
          scrollAnimationDuration={300}
        />
      </View>
    );
  };

  // 滚动模式渲染
  const renderScrollMode = () => {
    type ItemProps = {item: string, index: number};
    type ListItem = {item: string};
    const Item = ({item, index}: ItemProps) => (
        <ComicReaderPageItem
          key={index}
          item={item}
          index={index}
          imageFit={'contain'}
          containerWidth={SCREEN_WIDTH}
          containerHeight={'auto'}
        />
    );
    return (
      <VirtualizedList<ListItem>
        data={data}
        initialScrollIndex={2}
        renderItem={({item, index}: {item: ListItem; index: number}) => <Item key={index} item={item.item} index={index} />}
        keyExtractor={(info: ListItem) => info.item}
        getItemCount={() => data.length}
        getItem={(data: string[], index: number): ListItem => ({item: data[index]})}
      />
    );
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {readingMode === 'pagination' ? renderPaginationMode() : renderScrollMode()}
    </GestureHandlerRootView>
  );

});

ComicReader.displayName = 'ComicReader';

export default ComicReader;