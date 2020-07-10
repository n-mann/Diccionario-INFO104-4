// Estos imports solo son para ayudar el autocompletado.
// Originalmente estos si son necesarios para usar TypeScript.
import { NextApiRequest, NextApiResponse } from "next";

/**
 *
 * @param {NextApiRequest} req
 * @param {NextApiResponse} res
 */
export default (req, res) => {
  console.log("received: ", req.body);

  res.send(`API Received: "${req.body}", check your console!`);
};
