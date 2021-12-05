import { useState, useEffect } from "react";
import Overview from "../components/Overview";
import ScholarList from "../components/ScholarList";

import prisma from "../lib/prisma";
import utils from "../lib/utils";

let scholarsRonin = null;

function getAllRoninAddress(scholars) {
  scholars.map((scholar) => {
    if (!scholarsRonin) {
      return (scholarsRonin = scholar.ronin_address);
    }
    return (scholarsRonin = scholarsRonin.concat(",", scholar.ronin_address));
  });
}

function getTotalSLP(scholarData) {
  let totalSLP = 0;
  for (let key in scholarData) {
    totalSLP += scholarData[key].total_slp;
  }

  return totalSLP;
}

function getManagerSLP(scholars, scholarData) {
  let i = 0;
  let managerSLP = 0;
  for (let key in scholarData) {
    managerSLP +=
      scholarData[key].total_slp * (scholars[i].manager_percentage / 100);
    i++;
  }

  managerSLP = utils.toFixedIfNecessary(managerSLP, 2);

  return managerSLP;
}

function getScholarSLP(scholars, scholarData) {
  let i = 0;
  let scholarSLP = 0;
  for (let key in scholarData) {
    scholarSLP +=
      scholarData[key].total_slp *
      ((100 - scholars[i].manager_percentage) / 100);
    i++;
  }

  scholarSLP = utils.toFixedIfNecessary(scholarSLP, 2);

  return scholarSLP;
}

export default function Home({ initialScholars }) {
  const [scholars, setScholars] = useState(initialScholars);
  const [totalScholars, setTotalScholars] = useState(initialScholars.length);
  const [scholarData, setScholarData] = useState(null);
  const [totalSLP, setTotalSLP] = useState(null);
  const [managerSLP, setManagerSLP] = useState(null);
  const [scholarSLP, setScholarSLP] = useState(null);

  useEffect(() => {
    getAllRoninAddress(scholars);

    async function fetchScholarData() {
      const response = await fetch(
        `https://game-api.axie.technology/api/v1/${scholarsRonin}`
      );
      const data = await response.json();
      setScholarData(data);

      setTotalSLP(getTotalSLP(data));
      setManagerSLP(getManagerSLP(scholars, data));
      setScholarSLP(getScholarSLP(scholars, data));
    }

    fetchScholarData();
  }, [scholars]);

  return (
    <div id="home">
      <Overview
        totalSLP={totalSLP}
        managerSLP={managerSLP}
        scholarSLP={scholarSLP}
        totalScholars={totalScholars}
      />
      <ScholarList scholars={initialScholars} scholarData={scholarData} />
    </div>
  );
}

export async function getServerSideProps() {
  const scholars = await prisma.scholar.findMany();

  return { props: { initialScholars: scholars } };
}
