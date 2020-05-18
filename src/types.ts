type SeriesSize = 'sm' | 'md' | 'lg';

export interface SimpleOptions {
  text: string;
  showSeriesCount: boolean;
  seriesCountSize: SeriesSize;
  fontFace: 'monospace' | 'serif';
}

export interface DemoFieldConfig {
  shape: 'triangle' | 'circle' | 'square';
}
