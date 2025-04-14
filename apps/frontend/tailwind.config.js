/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        editor: {
          bg: "var(--editor-bg)",
          text: "var(--editor-text)",
          border: "var(--editor-border)",
          toolbar: "var(--editor-toolbar-bg)",
          toolbarHover: "var(--editor-toolbar-hover)",
          toolbarActive: "var(--editor-toolbar-active)",
          codeBlock: "var(--editor-code-bg)",
          selection: "var(--editor-selection)",
        },
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "none",
            color: "inherit",
            a: {
              color: "var(--tw-prose-links)",
              textDecoration: "none",
              "&:hover": {
                textDecoration: "underline",
              },
            },
            code: {
              color: "inherit",
              background: "var(--editor-code-bg)",
              padding: "0.25rem 0.4rem",
              borderRadius: "0.25rem",
            },
            "code::before": {
              content: '""',
            },
            "code::after": {
              content: '""',
            },
          },
        },
      },
    },
  },
  plugins: [],
};
