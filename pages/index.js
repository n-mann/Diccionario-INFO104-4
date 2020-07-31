import { css } from "@emotion/react";
import { useState } from "react";
import data from "../hispadic1207.json";

const Resultado = (props) => {
  return (
    <>
      <div
        css={css`
          text-indent: 30px;
        `}
      >
        Resultados de {props.input}
      </div>
      <ul
        css={css`
          display: flex;
          flex-direction: column;
          list-style-type: none;
          align-items: center;
        `}
      >
        {props.datos.map((resultado) => (
          <li
            css={css`
              height: 70px;
              width: 80%;
              line-height: 70px;
              display: flex;
              flex-direction: row;
              list-style-type: none;
              justify-content: left;
              border: solid 1px;
            `}
          >
            <span
              css={css`
                text-indent: 10px;
                color: black;
              `}
            >
              {resultado.japanese}
            </span>
            <span
              css={css`
                text-indent: 10px;
                font-size: 0.7em;
                color: #4d4d4d;
              `}
            >
              ({resultado.reading})
            </span>
            <span
              css={css`
                text-indent: 10px;
                color: #333333;
              `}
            >
              {resultado.spanish}
            </span>
            <div
              css={css`
                margin: auto;
                align-self: right;
                display: flex;
                flex-direction: column;
                align-items: right;
              `}
            >
              <button
                css={css`
                  height: 30px;
                  border: none;
                  color: #333333;
                `}
              >
                + Info
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

const pedirInformacion = (input, setResultados) => {
  const resultados = [];
  data.forEach((entrada) => {
    if (entrada.japanese.includes(input) || entrada.spanish.includes(input))
      resultados.push(entrada);
  });

  setResultados(resultados);
};

const Query = (props) => {
  return (
    <div
      css={css`
        height: 40px;
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
        value={props.texto}
        onChange={(e) => {
          props.setTexto(e.target.value);
        }}
      />
      <button
        css={css`
          font-size: 1em;
          background-color: white;
          color: #4d4d4d;
          border: 1px solid #4d4d4d;
        `}
        onClick={() => pedirInformacion(props.texto, props.setResultados)}
      >
        Buscar
      </button>
    </div>
  );
};

const Main = () => {
  const [texto, setTexto] = useState("青空");
  const [resultados, setResultados] = useState(null);
  return (
    <>
      <div
        css={css`
          text-align: center;
          height: 130px;
          line-height: 130px;
          align-items: center;
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
        <img
          css={css`
            width: 90px;
            margin: auto auto;
            display: inline-flex;
            align-content: center;
            justify-content: center;
          `}
          alt="anime-girl"
          src="/test.png"
        />
        Diccionario 辞書
      </div>
      <Query texto={texto} setTexto={setTexto} setResultados={setResultados} />
      {resultados ? (
        <Resultado
          datos={resultados}
          setResultados={setResultados}
          input={texto}
        />
      ) : null}
    </>
  );
};

const c = ""; //Importante. No borrar

export default Main;
