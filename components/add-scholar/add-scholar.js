import { useState } from "react";
import { useRouter } from "next/dist/client/router";

export default function AddScholar() {
  const router = useRouter();
  const [roninAddress, setRoninAddress] = useState("");
  const [scholarName, setScholarName] = useState("");
  const [managerPercentage, setManagerPercentage] = useState("");

  async function addScholar(e) {
    e.preventDefault();
    const data = {
      ronin_address: roninAddress,
      scholar_name: scholarName,
      manager_percentage: parseInt(managerPercentage),
    };

    const response = await fetch("/api/scholars", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (response.status === 200) {
      router.reload();
    }

    return await response.json();
  }

  return (
    <div className="bg-white rounded-xl py-6 px-8 border-2 border-solid mb-4">
      <p className="text-purple-600 font-bold mb-2">Add Scholar</p>
      <form className="grid grid-cols-4 gap-4" onSubmit={addScholar}>
        <input
          className="rounded-xl"
          type="text"
          required
          placeholder="Scholar Name"
          value={scholarName}
          onChange={(e) => setScholarName(e.target.value)}
        />
        <input
          className="rounded-xl"
          type="text"
          required
          placeholder="Ronin Address"
          value={roninAddress}
          onChange={(e) => setRoninAddress(e.target.value)}
        />
        <input
          className="rounded-xl"
          type="number"
          required
          min="0"
          max="100"
          placeholder="Manager's Percentage"
          value={managerPercentage}
          onChange={(e) => setManagerPercentage(e.target.value)}
        />
        <input
          className="rounded-xl bg-purple-600 text-white font-bold cursor-pointer hover:bg-purple-800"
          type="submit"
          value="Add Scholar"
        />
      </form>
    </div>
  );
}
