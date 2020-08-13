import { db } from "../../src/api/db";
import { NextApiResponse, NextApiRequest } from "next";

/**
 * @export
 * @param {NextApiRequest} req
 * @param {NextApiResponse} res
 */
export default async (req, res) => {
  const word = "%" + req.body.input + "%";
  const dataHispadic = await Promise.resolve(
    db("hispadic")
      .select("*")
      .where("japanese", "like", word)
      .orWhere("spanish", "like", word)
      .orWhere("reading", "like", word),
  );

  const data = await Promise.all(
    dataHispadic.map(async resultado => {
      return {
        resultado: resultado,
        masInfo: (resultado.japanese == resultado.reading
        ? []
        : await Promise.resolve(
            db("kanjidic")
              .select("*")
              .whereIn("kanji", Array.from(resultado.japanese))
              .limit(Array.from(resultado.japanese).length)
          )
        )
      }
    })
  );

  console.log(data);

  res.send({
    datos: data,
    input: req.body.input,
  });
};
