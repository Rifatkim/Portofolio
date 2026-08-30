"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, ContactFormValues } from "@/lib/validations/forms.schema";
import { createContact, updateContact, deleteContact } from "@/lib/actions/contacts.actions";
import { Contact } from "@/types";
import { PageHeader, EmptyState } from "@/components/ui/shared";
import { Dialog, ConfirmDialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Mail, Plus, Pencil, Trash2, GripVertical } from "lucide-react";
import { toast } from "sonner";

const PLATFORM_SUGGESTIONS = ["Email", "WhatsApp", "GitHub", "LinkedIn", "Instagram", "Twitter/X", "Telegram", "YouTube", "Website", "Other"];

interface ContactsManagerProps {
  contacts: Contact[];
}

export function ContactsManager({ contacts }: ContactsManagerProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [dialog, setDialog] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(true);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { platform: "", display_label: "", value: "", url: "", icon: "", is_visible: true, sort_order: 0 },
  });

  const openDialog = (contact?: Contact) => {
    if (contact) {
      setEditingContact(contact);
      setIsVisible(contact.is_visible);
      form.reset({
        platform: contact.platform,
        display_label: contact.display_label,
        value: contact.value,
        url: contact.url || "",
        icon: contact.icon || "",
        is_visible: contact.is_visible,
        sort_order: contact.sort_order,
      });
    } else {
      setEditingContact(null);
      setIsVisible(true);
      form.reset({ platform: "", display_label: "", value: "", url: "", icon: "", is_visible: true, sort_order: contacts.length });
    }
    setDialog(true);
  };

  const onSubmit: SubmitHandler<ContactFormValues> = (values) => {
    startTransition(async () => {
      const finalValues = { ...values, is_visible: isVisible, url: values.url || null, icon: values.icon || null };
      let result;
      if (editingContact) {
        result = await updateContact(editingContact.id, finalValues);
      } else {
        result = await createContact(finalValues);
      }
      if (result?.error) toast.error(result.error);
      else { toast.success(editingContact ? "Contact diperbarui" : "Contact ditambahkan"); setDialog(false); router.refresh(); }
    });
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    startTransition(async () => {
      const result = await deleteContact(deleteId);
      if (result.error) toast.error(result.error);
      else { toast.success("Contact dihapus"); router.refresh(); }
      setDeleteId(null);
    });
  };

  return (
    <div>
      <PageHeader
        title="Contact"
        description="Kelola informasi kontak dan sosial media"
        breadcrumb={[{ label: "Admin", href: "/admin/dashboard" }, { label: "Contact" }]}
        actions={<Button size="sm" onClick={() => openDialog()}><Plus className="h-3.5 w-3.5" />Add Contact</Button>}
      />

      {contacts.length === 0 ? (
        <EmptyState icon={<Mail className="h-8 w-8" />} title="Belum ada kontak" description="Tambahkan email, WhatsApp, GitHub, atau media sosial lainnya" action={<Button size="sm" onClick={() => openDialog()}>+ Add Contact</Button>} />
      ) : (
        <div className="border border-[#e5e5e5] bg-white overflow-hidden">
          {contacts.map((contact, i) => (
            <div key={contact.id} className={`flex items-center gap-4 px-4 py-3 ${i !== contacts.length - 1 ? "border-b border-[#e5e5e5]" : ""}`}>
              <GripVertical className="h-4 w-4 text-[#d4d4d4] shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  {contact.icon && <span className="text-sm">{contact.icon}</span>}
                  <p className="font-semibold text-sm">{contact.display_label}</p>
                  <span className="text-[10px] font-mono text-[#a3a3a3] uppercase">{contact.platform}</span>
                </div>
                <p className="text-xs text-[#737373] truncate">{contact.value}</p>
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 ${contact.is_visible ? "bg-black text-white" : "bg-[#f5f5f5] text-[#737373] border border-[#e5e5e5]"}`}>
                {contact.is_visible ? "VISIBLE" : "HIDDEN"}
              </span>
              <div className="flex gap-1">
                <button onClick={() => openDialog(contact)} className="p-1.5 hover:bg-[#f5f5f5]"><Pencil className="h-3.5 w-3.5" /></button>
                <button onClick={() => setDeleteId(contact.id)} className="p-1.5 hover:bg-red-50 hover:text-red-600"><Trash2 className="h-3.5 w-3.5" /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Dialog */}
      <Dialog open={dialog} onClose={() => setDialog(false)} title={editingContact ? "Edit Contact" : "Add Contact"} className="max-w-md">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider">Platform *</label>
            <input list="platform-suggestions" {...form.register("platform")} placeholder="Email, GitHub, LinkedIn..." className="w-full border border-[#e5e5e5] px-3 py-2.5 text-sm focus:outline-none focus:border-foreground" />
            <datalist id="platform-suggestions">
              {PLATFORM_SUGGESTIONS.map((p) => <option key={p} value={p} />)}
            </datalist>
            {form.formState.errors.platform && <p className="text-xs text-red-600">{form.formState.errors.platform.message}</p>}
          </div>
          <Input label="Display Label" required placeholder="Email saya" {...form.register("display_label")} error={form.formState.errors.display_label?.message} />
          <Input label="Value" required placeholder="rifat@example.com" helperText="Nilai aktual (email, username, nomor, dll)" {...form.register("value")} error={form.formState.errors.value?.message} />
          <Input label="URL" type="url" placeholder="https://github.com/username" helperText="Opsional" {...form.register("url")} />
          <Input label="Icon" placeholder="📧 atau nama ikon" helperText="Emoji atau nama ikon (opsional)" {...form.register("icon")} />
          <div className="grid grid-cols-2 gap-4">
            <Switch label="Visible di portfolio" checked={isVisible} onChange={setIsVisible} />
            <Input label="Sort Order" type="number" min={0} {...form.register("sort_order")} />
          </div>
          <div className="flex gap-2 justify-end pt-2">
            <Button type="button" variant="ghost" size="sm" onClick={() => setDialog(false)}>Batal</Button>
            <Button type="submit" size="sm" loading={isPending}>{editingContact ? "Update" : "Tambah"}</Button>
          </div>
        </form>
      </Dialog>

      <ConfirmDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} loading={isPending} title="Hapus Contact" message="Apakah Anda yakin ingin menghapus kontak ini?" />
    </div>
  );
}
