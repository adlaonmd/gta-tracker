import Image from "next/image";

export default function Loading() {
  return (
    <div
      id="loading"
      className="bg-gradient-to-r from-purple-600 to-purple-800 fixed top-0 w-full h-full flex flex-col justify-center items-center"
    >
      <p className="text-white font-bold text-4xl pb-2">Loading</p>
      <Image
        src="/svg-loaders/ball-triangle.svg"
        alt="Indicator"
        width="60"
        height="60"
      />
    </div>
  );
}
