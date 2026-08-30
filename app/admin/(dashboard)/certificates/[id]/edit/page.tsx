import { notFound } from "next/navigation";
import { getCertificateById } from "@/lib/actions/certificates.actions";
import { CertificateForm } from "@/components/forms/CertificateForm";
export const metadata = { title: "Edit Certificate" };
export default async function EditCertificatePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const certificate = await getCertificateById(id);
  if (!certificate) notFound();
  return <CertificateForm certificate={certificate} isEdit />;
}
