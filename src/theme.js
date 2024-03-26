import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: true,
  },

  styles: {
    global: {
      body: {},
    },
  },

  components: {},
});

export default theme;
