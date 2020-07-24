import { css } from "@emotion/react";
import { useState } from "react";
import data from "../hispadic1207.json";

const Respuesta = () => {
  return <div>respuesta</div>;
};

const AyNose = () => {
  return (
    <body>
      <h1
        css={css`
          text-align: center;
          background-color: #000033;
          color: #fff;
        `}
      >
        プヅ　辞書
      </h1>
      <img
        css={css`
          width: 120px;
          transition: box-shadow 1s;
          display: block;
          margin: 0px auto;
          :hover {
            box-shadow: 0px 0px 5px 5px #fff;
          }
        `}
        alt="anime-girl"
        src="/test.png"
      />
    </body>
  );
};
const Main = () => {
  const [texto, setTexto] = useState("hola");
  return (
    <div>
      <input
        placeholder="Ingrese su busqueda"
        value={texto}
        onChange={(e) => {}}
      />

      {JSON.stringify(data)}
      <button>Buscar</button>

      <Respuesta />
    </div>
  );
};

export default AyNose;
