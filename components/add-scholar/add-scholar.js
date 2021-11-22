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
    <div>
      <p>Add Scholar</p>
      <form className="grid" onSubmit={addScholar}>
        <input
          type="text"
          required
          placeholder="Ronin Address"
          value={roninAddress}
          onChange={(e) => setRoninAddress(e.target.value)}
        />
        <input
          type="text"
          required
          placeholder="Scholar Name"
          value={scholarName}
          onChange={(e) => setScholarName(e.target.value)}
        />
        <input
          type="number"
          required
          min="0"
          max="100"
          placeholder="Manager's Percentage"
          value={managerPercentage}
          onChange={(e) => setManagerPercentage(e.target.value)}
        />
        <input type="submit" value="Add Scholar" />
      </form>
    </div>
  );
}
