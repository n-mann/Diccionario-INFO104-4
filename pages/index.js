import { css } from "@emotion/react";
import { useState } from "react";
import data from "../hispadic1207.json";

const Resultado = () => {
  return <div>Lista con los resultados</div>;
};

const Main = () => {
  const [texto, setTexto] = useState("青空");
  return (
    <>
      <div
        css={css`
          text-align: center;
          background-image: linear-gradient(
            180deg,
            rgba(0, 0, 51, 1) 2%,
            rgba(22, 237, 237, 1) 100%
          );
          color: #fff;
          margin: 0;
          font-size: 2.3em;
          font-weight: bold;
        `}
      >
        Diccionario 辞書
      </div>
      <img
        css={css`
          width: 130px;
          margin: 0px auto;
          display: flex;
          align-content: center;
        `}
        alt="anime-girl"
        src="/test.png"
      />
      <div
        css={css`
          display: flex;
          flex-direction: row;
          margin: 20px;
          justify-content: center;
          gap: 1%;
        `}
      >
        <input
          css={css`
            border: 1px solid #4d4d4d;
            font-size: 1.2em;
            color: #1a1a1a;
          `}
          placeholder="Ingrese su busqueda"
          value={texto}
          onChange={(e) => {}}
        />
        <button
          css={css`
            font-size: 1em;
            background-color: white;
            color: #4d4d4d;
            border: 1px solid #4d4d4d;
          `}
        >
          Buscar
        </button>
      </div>
    </>
  );
};

export default Main;
