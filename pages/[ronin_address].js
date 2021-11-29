import { useRouter } from "next/dist/client/router";

export default function RoninAddress() {
  const router = useRouter();
  const { ronin_address } = router.query;

  return (
    <div>
      <p>Ronin Address: {ronin_address}</p>
    </div>
  );
}
