import Image from "next/image";

export default function Loading({ size }) {
  return (
    <div className="grid items-center">
      <Image
        src="/svg-loaders/ball-triangle.svg"
        alt="Indicator"
        width={size}
        height={size}
      />
    </div>
  );
}
