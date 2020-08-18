import { db } from "../../src/api/db";
import { NextApiResponse, NextApiRequest } from "next";
import { orderBy } from "lodash";

// 々 es omitido
function esKanji(c) {
  return c != "々" && c >= "\u4e00" && c <= "\u9faf";
}

/**
 * @export
 * @param {NextApiRequest} req
 * @param {NextApiResponse} res
 */
export default async (req, res) => {
  const word = "%" + req.body.input + "%";
  const dataHispadic = await db("hispadic")
    .select("*")
    .where("japanese", "like", word)
    .orWhere("spanish", "like", word)
    .orWhere("reading", "like", word)
    .orderByRaw("locate('" + req.body.input + "', japanese)")
    .limit(50);

  const listaKanji = [];
  dataHispadic.map((resultado) => {
    Array.from(resultado.japanese).map((kanji) => {
      if (esKanji(kanji) && !listaKanji.includes(kanji)) listaKanji.push(kanji);
    });
  });

  // Alternativa 1
  const dataKanji = await db("kanjidic")
    .select("*")
    .whereIn("kanji", listaKanji)
    .limit(listaKanji.length);

  const dataKanjidic = {};
  dataKanji.map((resultado) => {
    dataKanjidic[resultado.kanji] = resultado;
  });

  res.send({
    datos: dataHispadic,
    masInfo: dataKanjidic,
    input: req.body.input,
  });
};
