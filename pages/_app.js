import { CacheProvider, Global, css } from "@emotion/react";
import { cache } from "@emotion/css";

export const globalStyles = (
  <Global
    styles={css`
      @import url("https://fonts.googleapis.com/css2?family=Lato&display=swap");

      html,
      body {
        /*padding: 1rem 1rem;*/
        margin: 0;
        background: #f4ffff;
        min-height: 100%;
        height: 100%;
        font-family: "Lato", sans-serif;
        font-size: 24px;
      }

      button {
        font-family: "Lato", sans-serif;
        cursor: pointer;
        :disabled {
          cursor: not-allowed;
        }
      }
      /*#__next {
        display: grid;
        height: 100%;
      }*/
    `}
  />
);

function MyApp({ Component, pageProps }) {
  return (
    <CacheProvider value={cache}>
      {globalStyles}
      <Component {...pageProps} />
    </CacheProvider>
  );
}

export default MyApp;
