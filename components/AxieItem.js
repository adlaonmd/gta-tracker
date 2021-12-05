import Image from "next/image";

export default function AxieItem({ axie }) {
  return (
    <div className="bg-white w-full max-w-sm rounded-xl p-4 border-2 border-solid">
      <Image
        src={axie.image}
        alt={axie.class}
        width={256}
        height={192}
        className="m-auto"
      />
      <p className="font-bold text-md">{axie.name}</p>

      <div className="grid grid-cols-4 mt-4 mb-4">
        <div className="flex items-center justify-center">
          <Image src="/axie-stats/hp.svg" alt="HP" width={32} height={32} />
          <p className="font-bold text-lg">{axie.stats.hp}</p>
        </div>
        <div className="flex items-center justify-center">
          <Image src="/axie-stats/speed.svg" alt="HP" width={32} height={32} />
          <p className="font-bold text-lg">{axie.stats.speed}</p>
        </div>
        <div className="flex items-center justify-center">
          <Image src="/axie-stats/skill.svg" alt="HP" width={32} height={32} />
          <p className="font-bold text-lg">{axie.stats.skill}</p>
        </div>
        <div className="flex items-center justify-center">
          <Image src="/axie-stats/morale.svg" alt="HP" width={32} height={32} />
          <p className="font-bold text-lg">{axie.stats.morale}</p>
        </div>
      </div>
      <hr />
      <div className="grid grid-cols-2 mt-4">
        {axie.parts.map((part, key) => {
          return (
            <div className="flex items-center gap-1 text-left" key={key}>
              <Image
                src={`/axie-parts/${part.class.toLowerCase()}/${part.type.toLowerCase()}.svg`}
                alt={part.type}
                width={50}
                height={50}
              />
              <p>{part.name}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-2">
        <p>
          Breed Count: <strong>{axie.breedCount}</strong>
        </p>
      </div>

      <div className="mt-4 rounded-xl bg-purple-600 text-white font-bold cursor-pointer hover:bg-purple-800 py-2 px-6 max-w-max m-auto">
        <a
          href={`https://marketplace.axieinfinity.com/axie/${axie.id}`}
          target="_blank"
          rel="noreferrer"
        >
          View Axie
        </a>
      </div>
    </div>
  );
}
