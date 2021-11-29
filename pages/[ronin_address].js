import { useRouter } from "next/dist/client/router";

export default function RoninAddress() {
  const router = useRouter();
  const { ronin_address } = router.query;

  return (
    <div className="text-center">
      <h1 className="font-bold text-4xl">WIP</h1>
      <p>
        Ronin Address: <br />
        {ronin_address}
      </p>
    </div>
  );
}
