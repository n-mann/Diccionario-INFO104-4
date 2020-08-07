import { db } from "../../src/api/db";
import { NextApiResponse, NextApiRequest } from "next";

/**
 * @export
 * @param {NextApiRequest} req
 * @param {NextApiResponse} res
 */
export default async (req, res) => {
  console.log(req.body.input);
  const word = "%" + req.body.input + "%";
  const [dataHispadic, dataKanji] = await Promise.all([
    db("hispadic")
      .select("*")
      .where("japanese", "like", word)
      .orWhere("spanish", "like", word)
      .orWhere("reading", "like", word),
    db("kanjidic").select("*").whereIn("kanji", req.body.input.split("")),
  ]);
  res.send([...dataHispadic, ...dataKanji]);
};
