import { useState, useEffect } from "react";
import { useRouter } from "next/dist/client/router";
import ScholarItem from "./ScholarItem";

import utils from "../lib/utils";
import Loading from "./Loading";
import AddScholar from "./AddScholar";

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

  //setTotalSLP(totalSLP);
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

  //setManagerSLP(managerSLP);
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

  //setScholarSLP(scholarSLP);
  return scholarSLP;
}

export default function ScholarList({ initialScholars }) {
  const router = useRouter();
  const [scholars, setScholars] = useState(initialScholars);
  const [isLoading, setIsLoading] = useState(true);
  const [scholarData, setScholarData] = useState(null);
  const [totalSLP, setTotalSLP] = useState(0);
  const [managerSLP, setManagerSLP] = useState(0);
  const [scholarSLP, setScholarSLP] = useState(0);

  useEffect(() => {
    getAllRoninAddress(scholars);

    async function fetchScholarData() {
      const response = await fetch(
        `https://game-api.axie.technology/api/v1/${scholarsRonin}`
      );
      const data = await response.json();
      setScholarData(data);
      setIsLoading(false);

      setTotalSLP(getTotalSLP(data));
      setManagerSLP(getManagerSLP(scholars, data));
      setScholarSLP(getScholarSLP(scholars, data));
    }

    fetchScholarData();
  }, [scholars]);

  function refresh() {
    router.reload();
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <div
        id="dashboard-summary"
        className="grid gap-4 grid-cols-4 px-4 py-8 bg-gradient-to-r from-purple-600 to-purple-800"
      >
        <div id="total-slp" className="py-6 px-4 bg-white rounded-xl">
          <p className="text-md">Total SLP</p>
          <div className="flex justify-between px-4 items-center">
            <div className="font-bold text-4xl">{totalSLP}</div>
            <div className="text-4xl">💵</div>
          </div>
        </div>
        <div id="manager-percentage" className="py-6 px-4 bg-white rounded-xl">
          <p className="text-md">Manager&apos;s SLP</p>
          <div className="flex justify-between px-4 items-center">
            <div className="font-bold text-4xl">{managerSLP}</div>
            <div className="text-4xl">💼</div>
          </div>
        </div>
        <div id="scholar-percentage" className="py-6 px-4 bg-white rounded-xl">
          <p className="text-md">Scholars&apos; SLP</p>
          <div className="flex justify-between px-4 items-center">
            <div className="font-bold text-4xl">{scholarSLP}</div>
            <div className="text-4xl">🎓</div>
          </div>
        </div>
        <div id="total-scholars" className="py-6 px-4 bg-white rounded-xl">
          <p className="text-md">Total Scholars</p>
          <div className="flex justify-between px-4 items-center">
            <div className="font-bold text-4xl">{scholars.length}</div>
            <div className="text-4xl">👥</div>
          </div>
        </div>
      </div>
      <div className="bg-gray-100 py-8 px-4">
        <AddScholar />
        <div
          id="scholar-list"
          className="pt-2 pb-8 border-2 border-solid rounded-xl bg-white"
        >
          <div
            id="header"
            className="grid grid-cols-5 py-4 px-8 relative items-center"
          >
            <p className="font-bold text-purple-600">Name</p>
            <p className="font-bold text-purple-600">MMR</p>
            <p className="font-bold text-purple-600">Manager&apos;s SLP</p>
            <p className="font-bold text-purple-600">Scholar&apos;s SLP</p>
            <p className="font-bold text-purple-600">Total SLP</p>
            <button
              className="absolute right-8 bg-purple-600 text-white hover:bg-purple-800 font-bold text-xs py-1 px-2 rounded-xl"
              onClick={refresh}
            >
              Refresh
            </button>
          </div>
          {scholars.map((scholar, key) => {
            return (
              <ScholarItem
                key={key}
                scholar={scholar}
                scholarData={
                  scholarData[scholar.ronin_address.replace("ronin:", "0x")]
                }
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
