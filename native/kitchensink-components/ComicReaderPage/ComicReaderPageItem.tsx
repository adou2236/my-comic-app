import { Image } from 'expo-image';
import React, { useState } from 'react';
import { Dimensions, DimensionValue } from 'react-native';

import type { ImageFit } from './types';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
interface ComicReaderPageItemProps {
  item: string;
  index: number;
  imageFit: ImageFit;
  containerWidth: DimensionValue;
  containerHeight: DimensionValue;
}


const ComicReaderPageItem: React.FC<ComicReaderPageItemProps> = ({
  item,
  index,
  imageFit,
  containerWidth,
  containerHeight,
}) => {
  const [imageHeight, setImageHeight] = useState<number>(1);
  const [imageWidth, setImageWidth] = useState<number>(1);


  const handleImageLoad = (event: any) => {
    const { width, height } = event.source;
    if (width && height && containerWidth) {
      // 根据容器宽度和图片比例计算高度
      const calculatedHeight = (typeof containerWidth === 'number' 
        ? containerWidth 
        : SCREEN_WIDTH) * (height / width);
      setImageHeight(calculatedHeight);
    }
    if (width && height && containerHeight) {
      // 根据容器宽度和图片比例计算高度
      const calculatedWidth = (typeof containerHeight === 'number' 
        ? containerHeight 
        : SCREEN_HEIGHT) * (width / height);
      setImageWidth(calculatedWidth);
    }
  };


  return (
    <Image
      source={item}
      style={{
        width: containerWidth === 'auto' ? imageWidth || containerWidth: containerWidth,
        height: containerHeight === 'auto' ? imageHeight || containerHeight : containerHeight,
      }}
      className="user-select-none pointer-events-none"
      contentFit={imageFit}
      placeholder={ index + 1 }
      onLoad={handleImageLoad}
      transition={200}
      cachePolicy="memory-disk"
      placeholderContentFit="contain"
    />
  );
};

export default ComicReaderPageItem;
