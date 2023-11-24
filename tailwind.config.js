/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    require("daisyui"),
    require("tailwindcss-animate"),
    require("daisify-shadcn"),
  ],
  daisyui: {
    //  3 themes
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["wireframe"],
          "color-scheme": "light",
          fontFamily: "",
          primary: "#433922",
          secondary: "#34d399",
          accent: "#343232",
          neutral: "#ffe4e6",
          info: "#62c2d5",
          accent: "#966919",
          success: "#25bbac",
          warning: "#c88314",
          error: "#e77982",
          "--rounded-btn": "1.9rem",
          "--tab-border": "2px",
          "--tab-radius": ".5rem",
        },
        dark: {
          ...require("daisyui/src/theming/themes")["wireframe"],
          accent: "#343232",
          fontFamily: "",
          "base-100": "#000000",
          "base-200": "#0D0D0D",
          "base-300": "#1A1919",
          neutral: "#272626",
          "color-scheme": "dark",
          primary: "#433922",
          secondary: "#34d399",
          accent: "#966919",
          info: "#62c2d5",
          success: "#25bbac",
          warning: "#c88314",
          error: "#e77982",
          "--rounded-btn": "1.9rem",
          "--tab-border": "2px",
          "--tab-radius": ".5rem",
        },
        // cupcake: {
        //   ...require("daisyui/src/theming/themes")["cupcake"],
        //   primary: "#4f4530",
        //   "primary-content": "#ffffff",
        //   secondary: "#850a0a",
        //   "secondary-content": "#ffffff",
        // },
      },
    ],

    //  many themes
    // themes: [
    //   {
    //     custom: {
    //       ...require("daisyui/src/theming/themes")["cupcake"],
    //       primary: "#433922",
    //       secondary: "#34d399",
    //       accent: "#a3e635",
    //       neutral: "#ffe4e6",
    //       info: "#62c2d5",
    //       success: "#25bbac",
    //       warning: "#c88314",
    //       error: "#e77982",
    //     },
    //     cupcake: {
    //       ...require("daisyui/src/theming/themes")["cupcake"],
    //       primary: "#4f4530",
    //       "primary-content": "#ffffff",
    //       secondary: "#850a0a",
    //       "secondary-content": "#ffffff",
    //     },
    //   },
    //   "light",
    //   "dark",
    //   "cupcake",
    //   "wireframe",
    //   "black",
    //   "acid",
    //   "night",
    //   "coffee",
    //   "dim",
    //   "nord",
    //   "sunset",
    // ],
  },
};


