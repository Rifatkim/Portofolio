import { createClient } from "@/lib/supabase/server";
import { PageHeader, Card } from "@/components/ui/shared";
export const metadata = { title: "Account" };

export default async function AdminAccountPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div>
      <PageHeader
        title="Account"
        description="Informasi akun administrator"
        breadcrumb={[{ label: "Admin", href: "/admin/dashboard" }, { label: "Account" }]}
      />
      <Card className="max-w-md">
        <h2 className="text-xs font-bold uppercase tracking-widest mb-4 pb-3 border-b border-[#e5e5e5]">Informasi Akun</h2>
        <div className="space-y-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#737373] mb-0.5">Email</p>
            <p className="text-sm font-medium">{user?.email}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#737373] mb-0.5">User ID</p>
            <p className="text-xs font-mono text-[#737373]">{user?.id}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#737373] mb-0.5">Last Sign In</p>
            <p className="text-sm">{user?.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleString("id-ID") : "—"}</p>
          </div>
        </div>
        <div className="mt-6 pt-4 border-t border-[#e5e5e5]">
          <p className="text-xs text-[#737373]">
            Untuk mengubah password, gunakan Supabase Dashboard → Authentication → Users.
          </p>
        </div>
      </Card>
    </div>
  );
}
