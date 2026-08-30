import { getContacts } from "@/lib/actions/contacts.actions";
import { ContactsManager } from "@/components/admin/ContactsManager";
export const metadata = { title: "Contact" };
export default async function AdminContactsPage() {
  const contacts = await getContacts(true);
  return <ContactsManager contacts={contacts} />;
}
