import AxieItem from "./AxieItem";

export default function AxieList({ axies }) {
  return (
    <div className="py-8 px-4 grid grid-cols-3 gap-4 w-full max-w-screen-xl text-center">
      {axies.results.map((axie, key) => {
        return <AxieItem axie={axie} key={key} />;
      })}
    </div>
  );
}
