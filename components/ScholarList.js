import { useRouter } from "next/dist/client/router";
import Image from "next/image";

import ScholarItem from "./ScholarItem";
import AddScholar from "./AddScholar";
import Loading from "./Loading";

export default function ScholarList({ scholars, scholarData }) {
  const router = useRouter();

  function refresh() {
    router.reload();
  }

  return (
    <div className="bg-gray-100 py-8 px-4">
      <AddScholar />
      {scholars && scholarData ? (
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
      ) : (
        <Loading size="40" />
      )}
    </div>
  );
}
