import { css } from "@emotion/react";
import { useState } from "react";
import axios from "axios";

const MasInfo = (props) => {
  return (
    <ul
      css={css`
        border-top: 1px solid #77bafd;
        list-style-type: none;
        margin: 0;
      `}
    >
      {props.masInfo.map((kanji) => (
        <li css={css``}>
          <span css={css``}>{kanji.kanji}</span>
          <span
            css={css`
              margin-left: 10px;
              color: #222;
              font-size: 15px;
            `}
          >
            {kanji.spanish} {kanji.strokes} trazos.{" "}
            {kanji.jlpt > 0 ? " JLTP N" + kanji.jlpt + ". " : ""}
            {kanji.kun != "-1" ? "Kunyomi: " + kanji.kun + ". " : ""}
            {kanji.on != "-1" ? "Onyomi: " + kanji.on + ". " : ""}
            {kanji.nanori != "-1" ? "Nanori: " + kanji.nanori + ". " : ""}
          </span>
        </li>
      ))}
    </ul>
  );
};

const ResultadoFila = (props) => {
  const [masInfo, setMasInfo] = useState(false);
  const datos = props.resultado.resultado;
  return (
    <>
      <tr
        css={css`
          height: 30px;
        `}
      >
        <td>
          <span
            css={css`
              font-size: 0.9em;
              text-indent: 10px;
              color: black;
              margin-left: 10px;
              margin-right: 10px;
            `}
          >
            {datos.japanese}
          </span>
          {props.resultado.masInfo.length > 0 ? (
            <span
              css={css`
                text-indent: 10px;
                font-size: 0.6em;
                color: #4d4d4d;
                margin-right: 30px;
              `}
            >
              ({datos.reading})
            </span>
          ) : (
            ""
          )}
          <span
            css={css`
              font-size: 0.9em;
              text-indent: 10px;
              color: #333333;
            `}
          >
            {datos.spanish}
          </span>
        </td>
        <td
          css={css`
            width: 60px;
          `}
        >
          {props.resultado.masInfo.length > 0 ? (
            <button
              css={css`
                width: 60px;
                height: 30px;
                border: none;
                color: #151515;
              `}
              onClick={() => setMasInfo(!masInfo)}
            >
              {masInfo ? "-" : "+"} Info
            </button>
          ) : (
            ""
          )}
        </td>
      </tr>
      <tr>
        <td
          colspan="2"
          css={css`
            border-bottom: 1px solid black;
          `}
        >
          {props.resultado.masInfo.length > 0 ? (
            <div
              css={
                masInfo
                  ? css`
                      overflow-y: scroll;
                      transition: max-height 0.5s;
                      transition-timing-function: ease-in-out;
                      max-height: 150px;
                    `
                  : css`
                      overflow: hidden;
                      transition: max-height 0.5s;
                      transition-timing-function: ease-in-out;
                      max-height: 0;
                    `
              }
            >
              <MasInfo masInfo={props.resultado.masInfo} />{" "}
              {/* best nombres. such readability */}
            </div>
          ) : (
            ""
          )}
        </td>
      </tr>
    </>
  );
};

const Resultado = (props) => {
  return (
    <>
      <div
        css={css`
          text-indent: 30px;
        `}
      >
        Resultados de "{props.datos.input}":
      </div>
      {props.datos.datos.length > 0 ? (
        <table
          css={css`
            width: 80%;
            left: 10%;
            border: 1px solid black;
            position: absolute;
            margin-top: 20px;
            margin-bottom: 50px;
          `}
        >
          {props.datos.datos.map((resultado) => (
            <ResultadoFila resultado={resultado} masInfo={resultado.masInfo} />
          ))}
        </table>
      ) : (
        <div
          css={css`
            margin: auto;
            text-align: center;
          `}
        >
          No se encontraron resultados.
        </div>
      )}
    </>
  );
};

const Query = (props) => {
  const [loading, setLoading] = useState(false);
  const pedirInformacion = (input, setResultados) => {
    const resultados = [];
    //data.forEach((entrada) => {
    //if (entrada.japanese.includes(input) || entrada.spanish.includes(input))
    // resultados.push(entrada);
    //});
    setLoading(true);
    axios.post("/api/search", { input }).then((response) => {
      setResultados(response.data);
      setLoading(false);
    });

    //setResultados(resultados);
  };
  return (
    <form
      css={css`
        height: 40px;
        display: flex;
        flex-direction: row;
        margin: 20px;
        justify-content: center;
        gap: 1%;
      `}
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <input
        css={css`
          text-indent: 10px;
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
        onClick={() =>
          pedirInformacion(props.texto.toLowerCase(), props.setResultados)
        }
      >
        Buscar
      </button>
      {loading && <span>cargando...</span>}
    </form>
  );
};

const Main = () => {
  const [texto, setTexto] = useState("星");
  const [resultados, setResultados] = useState(null);
  return (
    <>
      <div
        css={css`
          text-align: center;
          height: 130px;
          margin: auto auto;
          line-height: 130px;
          display: flex;
          align-items: center;
          align-content: center;
          justify-content: center;
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
          `}
          alt="anime-girl"
          src="/test.png"
        />
        <span>Diccionario 辞書</span>
      </div>
      <Query texto={texto} setTexto={setTexto} setResultados={setResultados} />
      {resultados ? <Resultado datos={resultados} /> : null}
    </>
  );
};

const c = ""; //Importante. No borrar

export default Main;
