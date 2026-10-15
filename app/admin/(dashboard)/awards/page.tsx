import { getAwards } from "@/lib/actions/awards.actions";
import { AwardsList } from "@/components/admin/AwardsList";

export const metadata = { title: "Awards" };

export default async function AdminAwardsPage() {
  const awards = await getAwards(true);
  return <AwardsList awards={awards} />;
}
