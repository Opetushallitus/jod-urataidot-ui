/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />
declare const __SCREENS__: {
  xs: string;
  sm: string;
  md: string;
  lg: string;
};

declare module '*.svg' {
  import * as React from 'react';
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}