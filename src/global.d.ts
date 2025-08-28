/// <reference types="@arcgis/core/interfaces.d.ts" />
declare global {
  interface Window {
    $arcgis: { import: <T>(modules: string | string[]) => Promise<T> };
  }
}
export {};