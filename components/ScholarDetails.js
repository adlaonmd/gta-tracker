import utils from "../lib/utils";

export default function ScholarDetails({ scholar, scholarData }) {
  return (
    <div className="px-4 py-8 bg-gradient-to-r from-purple-600 to-purple-800">
      <div id="scholar" className="place-self-center text-center ">
        <p className="text-white text-4xl font-bold">
          {scholar.scholar_name ? scholar.scholar_name : "N/A"}
        </p>
        <a
          href={`https://marketplace.axieinfinity.com/profile/${scholar.ronin_address}`}
          target="_blank"
          rel="noreferrer"
        >
          <p className="text-white text-xl font-bold hover:text-purple-400 my-1">
            {scholarData.name}
          </p>
        </a>
        <p className="text-white text-lg">{scholar.ronin_address}</p>
      </div>
      <div id="stats" className="grid grid-cols-4 gap-4 mt-4">
        <div className="py-6 px-4 bg-white rounded-xl border-2 border-solid">
          <p className="text-md">Total SLP</p>
          <div className="flex justify-between px-4 items-center">
            <p className="font-bold text-4xl">
              {Number(scholarData.total_slp).toLocaleString()}
            </p>
            <div className="text-4xl">💵</div>
          </div>
        </div>
        <div className="py-6 px-4 bg-white rounded-xl border-2 border-solid">
          <p className="text-md">Manager&apos;s SLP</p>
          <div className="flex justify-between px-4 items-center">
            <p className="font-bold text-4xl">
              {scholar.manager_percentage
                ? Number(
                    utils.toFixedIfNecessary(
                      scholarData.total_slp *
                        (scholar.manager_percentage / 100),
                      2
                    )
                  ).toLocaleString()
                : "N/A"}
            </p>
            <div className="text-4xl">💼</div>
          </div>
        </div>
        <div className="py-6 px-4 bg-white rounded-xl border-2 border-solid">
          <p className="text-md">Scholar&apos;s SLP</p>
          <div className="flex justify-between px-4 items-center">
            <p className="font-bold text-4xl">
              {scholar.scholar_percentage
                ? Number(
                    utils.toFixedIfNecessary(
                      scholarData.total_slp *
                        ((100 - scholar.manager_percentage) / 100),
                      2
                    )
                  ).toLocaleString()
                : "N/A"}
            </p>
            <div className="text-4xl">🎓</div>
          </div>
        </div>
        <div className="py-6 px-4 bg-white rounded-xl border-2 border-solid">
          <p className="text-md">MMR</p>
          <div className="flex justify-between px-4 items-center">
            <p className="font-bold text-4xl">{scholarData.mmr}</p>
            <div className="text-4xl">🏆</div>
          </div>
        </div>
      </div>
    </div>
  );
}
