import prisma from "../../lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method forbidden" });
  }

  const scholarData = JSON.parse(req.body);

  const addedScholar = await prisma.scholar.create({
    data: scholarData,
  });

  return res.json(addedScholar);
}
