// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { initDB } from "../../utils/initDB"
export default async function (req, res) {
  await initDB();
  res.status(200).json({data:"success"})
}