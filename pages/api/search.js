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
  const data = await db("hispadic")
    .select("*")
    .where("japanese", "like", word)
    .orWhere("spanish", "like", word)
    .orWhere("reading", "like", word);

  res.send(data);
};
