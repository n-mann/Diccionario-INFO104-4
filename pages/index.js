import { css } from "@emotion/react";
import { useState } from "react";
import axios from "axios";

const MasInfo = (props) => {
  return (
    <ul
      css={css`
        list-style-type: none;
        margin: 0;
      `}
    >
      {props.masInfo.map((kanji) => (
        <li
          css={css`
            position: relative;
            top: 0px;
            left: 0px;
            height: 80px;
            width: 99%;
            border-top: 2px solid greenyellow;
            padding: 10px;
          `}
        >
          <div
            css={css`
              position: absolute;
              top: 0px;
              left: 0px;
              height: 80px;
              width: 10%;
            `}
          >
            {kanji.kanji}
          </div>
          <table
            css={css`
              table-layout: fixed;
              font-size: 0.6em;
              position: absolute;
              top: 0px;
              right: 0px;
              height: 80px;
              width: 90%;
            `}
          >
            <td
              css={css`
                width: 65%;
                background-color: mintcream;
              `}
            >
              <tr
                css={css`
                  font-weight: bold;
                `}
              >
                {kanji.spanish != "-1"
                  ? kanji.spanish + ". "
                  : kanji.english != "-1"
                  ? kanji.english + "."
                  : "No meaning available"}
              </tr>
              <tr>Kunyomi: {kanji.kun != "-1" ? kanji.kun : "-"}</tr>
              <tr>Onyomi: {kanji.on != "-1" ? kanji.on : "-"}</tr>
              <tr>Nanori: {kanji.nanori != "-1" ? kanji.nanori : "-"}</tr>
            </td>
            <td
              css={css`
                width: 30%;
                background-color: mintcream;
              `}
            >
              <tr>Trazos: {kanji.strokes > 0 ? kanji.strokes : "-"}</tr>
              <tr>JLTP N{kanji.jlpt > 0 ? kanji.jlpt : " - "}</tr>
              <tr>Grado: {kanji.grade > 0 ? kanji.grade : "-"}</tr>
              <tr>Frecuencia: {kanji.frequency > 0 ? kanji.frequency : "-"}</tr>
            </td>
          </table>
        </li>
      ))}
    </ul>
  );
};

const ResultadoFila = (props) => {
  const [masInfo, setMasInfo] = useState(false);

  let infoKanji = Array.from(props.datos.japanese)
    .map((kanji) => {
      if (props.masInfo.hasOwnProperty(kanji)) return props.masInfo[kanji];
    })
    .filter((kanji) => kanji);

  return (
    <>
      <tr
        css={css`
          height: 50px;
        `}
      >
        <td>
          <table
            css={css`
              height: 50px;
              width: 100%;
              table-layout: fixed;
            `}
          >
            <td
              css={css`
                margin-left: 10px;
                background-color: #5f73fe;
                width: 30%;
              `}
            >
              <tr
                css={css`
                  font-size: 0.8em;
                  text-indent: 10px;
                  color: black;
                `}
              >
                {props.datos.japanese}
              </tr>
              <tr>
                {infoKanji.length > 0 ? (
                  <td
                    css={css`
                      text-indent: 10px;
                      font-size: 0.6em;
                      /*color: #4d4d4d;*/
                      color: white;
                    `}
                  >
                    ({props.datos.reading})
                  </td>
                ) : (
                  ""
                )}
              </tr>
            </td>

            <td
              css={css`
                font-size: 0.6em;
                text-indent: 10px;
                background-color: lightgreen;
                color: white;
                width: 8%;
              `}
            >
              {props.datos.class}
            </td>
            <td
              css={css`
                font-size: 0.8em;
                text-indent: 10px;
                color: #333333;
              `}
            >
              {props.datos.spanish}
            </td>
          </table>
        </td>

        <td
          css={css`
            width: 60px;
            position: relative;
          `}
        >
          {infoKanji.length > 0 ? (
            <button
              css={css`
                width: 60px;
                height: 30px;
                position: absolute;
                bottom: 0px;
                right: 0px;
                border: none;
                background: none;
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
          {infoKanji.length > 0 ? (
            <div
              css={
                masInfo
                  ? css`
                      overflow-y: scroll;
                      transition: max-height 0.5s;
                      transition-timing-function: ease-in-out;
                      max-height: 200px;
                    `
                  : css`
                      overflow: hidden;
                      transition: max-height 0.5s;
                      transition-timing-function: ease-in-out;
                      max-height: 0;
                    `
              }
            >
              <MasInfo palabra={props.datos.japanese} masInfo={infoKanji} />
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
        Resultados de "{props.input}":
      </div>
      {props.datos.length > 0 ? (
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
          {props.datos.map((resultado) => (
            <ResultadoFila datos={resultado} masInfo={props.masInfo} />
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
  const pedirInformacion = (input, setResultados) => {
    const resultados = [];

    setResultados("loading");
    axios.post("/api/search", { input }).then((response) => {
      setResultados(response.data);
    });
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
    </form>
  );
};

const Loading = () => {
  return (
    <div
      css={css`
        width: 100%;
        text-align: center;
        position: absolute;
      `}
    >
      <img
        css={css`
          position: relative;
          width: 180px;
        `}
        alt="anime-girl"
        src="/test.png"
      />
      <br />
      Cargando...
    </div>
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
        <span>Diccionario 青空</span>
      </div>
      <Query texto={texto} setTexto={setTexto} setResultados={setResultados} />
      {resultados == "loading" ? (
        <Loading />
      ) : resultados ? (
        <Resultado
          input={resultados.input}
          datos={resultados.datos}
          masInfo={resultados.masInfo}
        />
      ) : null}
    </>
  );
};

const c = ""; //No importante. Borrar

export default Main;
