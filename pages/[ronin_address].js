import AxieList from "../components/AxieList";
import ScholarDetails from "../components/ScholarDetails";

import prisma from "../lib/prisma";

export default function Scholar({ scholar, scholarData, axies }) {
  return (
    <div id="scholar">
      <ScholarDetails scholar={scholar} scholarData={scholarData} />
      <div className="bg-gray-100 grid place-items-center">
        {axies.total === 0 ? (
          <div className="py-8 px-4 font-bold text-xl">No axies found</div>
        ) : (
          <AxieList axies={axies} />
        )}
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { ronin_address } = context.query;

  const scholar = await prisma.scholar.findUnique({
    where: {
      ronin_address,
    },
  });

  const scholarData = await fetch(
    `https://game-api.axie.technology/api/v1/${ronin_address}`
  );

  const scholarDataJson = await scholarData.json();

  const axies = await fetch(
    "https://graphql-gateway.axieinfinity.com/graphql",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        operationName: "GetAxieBriefList",
        variables: {
          auctionType: "All",
          criteria: {
            stages: [4],
          },
          from: 0,
          owner: ronin_address.replace("ronin:", "0x"),
          size: 100,
          sort: "IdDesc",
        },
        query:
          "\n  query GetAxieBriefList(\n    $auctionType: AuctionType\n    $criteria: AxieSearchCriteria\n    $from: Int\n    $sort: SortBy\n    $size: Int\n    $owner: String\n  ) {\n    axies(auctionType: $auctionType, criteria: $criteria, from: $from, sort: $sort, size: $size, owner: $owner) {\n      total\n      results {\n        ...AxieBrief\n        __typename\n      }\n      __typename\n    }\n  }\n\n  fragment AxieBrief on Axie {\n    id\n    name\n    stage\n    class\n    genes\n    breedCount\n    owner\n    image\n    title\n    battleInfo {\n      banned\n      __typename\n    }\n    auction {\n      currentPrice\n      currentPriceUSD\n      __typename\n    }\n    parts {\n      id\n      name\n      class\n      type\n      specialGenes\n      __typename\n    }\n    stats {\n      hp\n      speed\n      skill\n      morale\n    }\n    __typename\n  }\n",
      }),
    }
  );

  const axiesJson = await axies.json();

  return {
    props: {
      scholar,
      scholarData: scholarDataJson,
      axies: axiesJson.data.axies,
    },
  };
}
