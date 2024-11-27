import { createTheme } from "@mantine/core"

export const theme = createTheme({
  fontFamily: '"Open Sans", sans-serif',
  headings: { fontFamily: '"Francois One", sans-serif' },
  defaultRadius: "md",
  colors: {
    shGreen: [
      "#f0faf5",
      "#e1f2e9",
      "#bce4d0",
      "#95d6b5",
      "#75ca9e",
      "#61c390",
      "#55c088",
      "#46a975",
      "#3b9667",
      "#2b8257"
    ]
  },
  defaultGradient: {
    from: '#0ba26a',
    to: '#49eea9',
    deg: 45
  },
  primaryColor: 'shGreen',
})
