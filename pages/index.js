import { css } from "@emotion/react";
import { useState } from "react";
import data from "../hispadic1207.json";

const Resultado = (props) => {
  return (
    <>
      <div>Lista con los resultados para {props.input}</div>
      <ol>
        {props.datos.map((resultado) =>
          <li>{resultado.japanese} ({resultado.reading}): {resultado.spanish}</li>
        )}
      </ol>

      <button
        onClick = {() => props.setResultados(null)}
      >
        Atrás
      </button>
    </>
  );
};

const pedirInformacion = (input, setResultados) => {
  const resultados = []
  data.forEach((entrada) => {
    if (entrada.japanese.includes(input) || entrada.spanish.includes(input)) resultados.push(entrada);
  })
  
  setResultados(resultados)
}

const Query = (props) => {
  return (
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
        value={props.texto}
        onChange={(e) => {props.setTexto(e.target.value)}}
      />
      <button
        css={css`
          font-size: 1em;
          background-color: white;
          color: #4d4d4d;
          border: 1px solid #4d4d4d;
        `}
        onClick = {() => pedirInformacion(props.texto, props.setResultados)}
      >
        Buscar
      </button>
    </div>
  )
}

const Main = () => {
  const [texto, setTexto] = useState("青空");
  const [resultados, setResultados] = useState(null);
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
      {resultados
        ? <Resultado datos={resultados} setResultados={setResultados} input={texto}/>
        : <Query texto={texto} setTexto={setTexto} setResultados={setResultados}/>
      }
    </>
  );
};

const c = "";

export default Main;
