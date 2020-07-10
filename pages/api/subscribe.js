import { db } from "../../src/api/db";
import { isEmail } from "../../src/utils";
import { NextApiResponse, NextApiRequest } from "next";

/**
 * @export
 * @param {NextApiRequest} req
 * @param {NextApiResponse} res
 */
export default async function (req, res) {
  const email = req.body?.email;

  if (await isEmail.isValid(email)) {
    db("subscriptions")
      .insert({
        email,
      })
      .then(() => {
        res.send("Ok");
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  } else {
    res.status(400).send("Invalid email parameter!");
  }
}
