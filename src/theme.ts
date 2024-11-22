import { createTheme } from "@mantine/core";

export const theme = createTheme({
  fontFamily: 'Open-Sans, sans-serif',
  defaultRadius: "md",
  colors: {
    shGreen: [
      "#ecfef7",
      "#d9faee",
      "#acf7da",
      "#7ef3c5",
      "#5cf0b4",
      "#49eea9",
      "#3eeda3",
      "#32d38e",
      "#26bb7d",
      "#0ba26a"
    ]
  },
  defaultGradient: {
    from: '#0ba26a',
    to: '#49eea9',
    deg: 45
  },
  primaryColor: 'shGreen',
})
