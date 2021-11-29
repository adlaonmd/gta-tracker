import Loading from "./Loading";

export default function Overview({
  totalSLP,
  managerSLP,
  scholarSLP,
  totalScholars,
}) {
  return (
    <div className="grid gap-4 grid-cols-4 px-4 py-8 bg-gradient-to-r from-purple-600 to-purple-800">
      <div id="total-slp" className="py-6 px-4 bg-white rounded-xl">
        <p className="text-md">Total SLP</p>
        <div className="flex justify-between px-4 items-center">
          <div className="font-bold text-4xl">
            {totalSLP ? (
              Number(totalSLP).toLocaleString()
            ) : (
              <Loading size="40" />
            )}
          </div>
          <div className="text-4xl">💵</div>
        </div>
      </div>
      <div id="manager-percentage" className="py-6 px-4 bg-white rounded-xl">
        <p className="text-md">Manager&apos;s SLP</p>
        <div className="flex justify-between px-4 items-center">
          <div className="font-bold text-4xl">
            {managerSLP ? (
              Number(managerSLP).toLocaleString()
            ) : (
              <Loading size="40" />
            )}
          </div>
          <div className="text-4xl">💼</div>
        </div>
      </div>
      <div id="scholar-percentage" className="py-6 px-4 bg-white rounded-xl">
        <p className="text-md">Scholars&apos; SLP</p>
        <div className="flex justify-between px-4 items-center">
          <div className="font-bold text-4xl">
            {scholarSLP ? (
              Number(scholarSLP).toLocaleString()
            ) : (
              <Loading size="40" />
            )}
          </div>
          <div className="text-4xl">🎓</div>
        </div>
      </div>
      <div id="total-scholars" className="py-6 px-4 bg-white rounded-xl">
        <p className="text-md">Total Scholars</p>
        <div className="flex justify-between px-4 items-center">
          <div className="font-bold text-4xl">
            {Number(totalScholars).toLocaleString()}
          </div>
          <div className="text-4xl">👥</div>
        </div>
      </div>
    </div>
  );
}
