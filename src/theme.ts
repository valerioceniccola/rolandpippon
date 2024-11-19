import { createTheme } from "@mantine/core";

export const theme = createTheme({
  fontFamily: 'Open-Sans, sans-serif',
  defaultRadius: "md",
  colors: {
    shGreen: [
      "#e5feee",
      "#d2f9e0",
      "#a8f1c0",
      "#7aea9f",
      "#53e383",
      "#3bdf70",
      "#2bdd66",
      "#1ac455",
      "#0caf49",
      "#00963c"
    ]
  },
  defaultGradient: {
    from: '#00963c',
    to: '#3bdf70',
    deg: 45
  },
  primaryColor: 'shGreen',
})
