import Scholar from "../components/scholar/scholar";

import prisma from "../lib/prisma";

export async function getServerSideProps() {
  const scholars = await prisma.scholar.findMany({ take: 10 });

  return { props: { initialScholars: scholars } };
}

export default function Home({ initialScholars }) {
  return (
    <div>
      <Scholar initialScholars={initialScholars} />
    </div>
  );
}
