import { getCertificates } from "@/lib/actions/certificates.actions";
import { CertificatesList } from "@/components/admin/CertificatesList";
export const metadata = { title: "Certificates" };
export default async function AdminCertificatesPage() {
  const certificates = await getCertificates(true);
  return <CertificatesList certificates={certificates} />;
}
