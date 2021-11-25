import { useRouter } from "next/dist/client/router";

import utils from "../../lib/utils";

export default function ScholarDetails({ scholar, scholarData }) {
  const router = useRouter();

  async function removeScholar() {
    if (confirm("Are you sure you want to remove this scholar?")) {
      const response = await fetch("/api/scholars", {
        method: "DELETE",
        body: JSON.stringify(scholar.ronin_address),
      });

      if (response.status === 200) {
        router.reload();
      }

      return await response.json();
    }
  }

  return (
    <div className="grid grid-cols-5 items-center py-2 border-b border-solid relative">
      <div>
        <p>{scholar.scholar_name}</p>
        <small>{scholarData.name}</small>
      </div>

      <p>{scholarData.mmr}</p>
      <p>
        {utils.toFixedIfNecessary(
          scholarData.total_slp * (scholar.manager_percentage / 100),
          2
        )}
      </p>
      <p>
        {utils.toFixedIfNecessary(
          scholarData.total_slp * ((100 - scholar.manager_percentage) / 100),
          2
        )}
      </p>
      <p>{scholarData.total_slp}</p>
      <div className="absolute right-0">
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
