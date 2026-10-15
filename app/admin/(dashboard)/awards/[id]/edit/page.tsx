import { notFound } from "next/navigation";
import { getAwardById } from "@/lib/actions/awards.actions";
import { AwardForm } from "@/components/forms/AwardForm";

export const metadata = { title: "Edit Award" };

interface EditAwardPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditAwardPage({ params }: EditAwardPageProps) {
  const { id } = await params;
  const award = await getAwardById(id);

  if (!award) {
    notFound();
  }

  return <AwardForm award={award} isEdit />;
}
