import { useRouter } from "next/dist/client/router";
import Link from "next/link";

import utils from "../lib/utils";

export default function ScholarDetails({ scholar, scholarData }) {
  const router = useRouter();

  async function removeScholar() {
    if (confirm("Are you sure you want to remove this scholar?")) {
      const response = await fetch("/api/scholars", {
        method: "DELETE",
        body: JSON.stringify(scholar.id),
      });

      if (response.status === 200) {
        router.reload();
      }

      return await response.json();
    }
  }

  return (
    <div className="grid grid-cols-5 items-center py-2 px-8 border-b border-solid relative hover:bg-gray-100">
      <Link href={`/${scholar.ronin_address}`}>
        <a className="hover:text-purple-600">
          <p>{scholar.scholar_name}</p>
          <small>{scholarData.name}</small>
        </a>
      </Link>

      <p>{Number(scholarData.mmr).toLocaleString()}</p>
      <p>
        {Number(
          utils.toFixedIfNecessary(
            scholarData.total_slp * (scholar.manager_percentage / 100),
            2
          )
        ).toLocaleString()}
      </p>
      <p>
        {Number(
          utils.toFixedIfNecessary(
            scholarData.total_slp * ((100 - scholar.manager_percentage) / 100),
            2
          )
        ).toLocaleString()}
      </p>
      <p>{Number(scholarData.total_slp).toLocaleString()}</p>
      <div className="absolute right-8">
        <button
          className="bg-red-400 rounded-md p-1 hover:bg-red-500"
          onClick={removeScholar}
        >
          🗑️
        </button>
      </div>
    </div>
  );
}
