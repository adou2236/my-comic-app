export type ReadingMode = 'pagination' | 'scroll';
export type PageDirection = 'right' | 'left';
export type AnimationType = 'slide' | 'fade' | 'none';
export type ImageFit = 'contain' | 'cover';

export interface ComicReaderProps {
  // 必填参数
  data: string[]; // 图片在线 URL 链接数组
  initialCurrentPage: number; // 初始页码（从 0 开始）

  // 配置项（可选）
  readingMode?: ReadingMode; // 阅读模式：翻页/滚动（默认：'pagination'）
  pageDirection?: PageDirection; // 翻页方向：左右（默认：'rtl'）
  preloadCount?: number; // 预加载图片数量（默认：2）
  enableZoom?: boolean; // 是否启用缩放（默认：true）
  enableKeyboard?: boolean; // 是否启用键盘快捷键（Web端，默认：true）
  animationType?: AnimationType; // 翻页动画类型（默认：'slide'）
  imageFit?: ImageFit; // 图片适配模式（默认：'width'）
  onPageChange?: (page: number) => void; // 页码变化回调
  onZoomChange?: (isZoomed: boolean) => void; // 缩放状态变化回调
}

export interface ComicReaderRef {
  goToPage: (page: number, animated?: boolean) => void;
}
