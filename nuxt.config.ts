// https://nuxt.com/docs/api/configuration/nuxt-config
import type { NuxtConfig } from "@nuxt/schema";

export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    "@nuxtjs/turnstile",
    "@nuxtjs/google-fonts",
    "@vueuse/nuxt",
    "@vee-validate/nuxt",
    "@nuxtjs/seo",
  ],
  build: {
    transpile: ["trpc-nuxt"],
  },
  shadcn: {
    prefix: "",
    componentDir: "./components/ui",
  },
  turnstile: {
    siteKey: "0x4AAAAAAAPSVV6npal5h42o",
  },
  googleFonts: {
    families: {
      Michroma: [400, 500],
    },
    download: true,
  },
  app: {
    head: {
      link: [
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/apple-touch-icon.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon-32x32.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/favicon-16x16.png",
        },
        { rel: "manifest", href: "/site.webmanifest" },
        { rel: "mask-icon", href: "/safari-pinned-tab.svg", color: "#000000" },
        { rel: "shortcut icon", href: "/favicon.ico" },
      ],
      meta: [
        { name: "msapplication-TileColor", content: "#000000" },
        { name: "msapplication-Config", content: "/browserconfig.xml" },
        { name: "theme-color", content: "#000000" },
        { name: "og:title", content: "Enes Genç - Student & Web Developer" },
        { name: "og:image", content: "https://enesgenc.dev/ogimage.svg" },
      ],
    },
  },
  site: {
    url: "https://enesgenc.dev",
    name: "Enes Genç",
    description: "Student & Web Developer",
    defaultLocale: "en",
  },
  devtools: { enabled: true },
}) as NuxtConfig;
