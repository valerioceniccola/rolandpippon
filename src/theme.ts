import { createTheme } from "@mantine/core"

export const theme = createTheme({
  fontFamily: '"Open Sans", sans-serif',
  headings: { fontFamily: '"Francois One", sans-serif' },
  defaultRadius: "md",
  colors: {
    shGreen: [
      "#eef2fb",
      "#dae0f1",
      "#b1bee6",
      "#859adb",
      "#617bd2",
      "#4b68cd",
      "#3f5ecc",
      "#314eb4",
      "#2a45a2",
      "#1f3b8f"
    ]
  },
  defaultGradient: {
    from: '#314eb4',
    to: '#1f3b8f',
    deg: 45
  },
  primaryColor: 'shGreen',
})
