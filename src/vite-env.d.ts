/// <reference types="vite/client" />

declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.svg";
declare module "*.gif";

interface ImportMetaEnv {
    readonly VITE_CONVEX_URL: string
    readonly VITE_TURNSTILE_SITE_KEY?: string
    readonly VITE_BUSINESS_ADDRESS_B64?: string
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
