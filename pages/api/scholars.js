import prisma from "../../lib/prisma";

export default async function handler(req, res) {
  switch (req.method) {
    case "POST": {
      const scholarData = JSON.parse(req.body);

      const addedScholar = await prisma.scholar.create({
        data: scholarData,
      });

      return res.json(addedScholar);
    }

    case "DELETE": {
      const scholarId = JSON.parse(req.body);

      const removedScholar = await prisma.scholar.delete({
        where: {
          id: scholarId,
        },
      });

      return res.json(removedScholar);
    }

    default: {
      return res.status(405).json({ message: "Method forbidden" });
    }
  }
}
