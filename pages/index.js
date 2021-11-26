import ScholarList from "../components/ScholarList";

import prisma from "../lib/prisma";

export async function getServerSideProps() {
  const scholars = await prisma.scholar.findMany();

  return { props: { initialScholars: scholars } };
}

export default function Home({ initialScholars }) {
  return (
    <div>
      <ScholarList initialScholars={initialScholars} />
    </div>
  );
}
