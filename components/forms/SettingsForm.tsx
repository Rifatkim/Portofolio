"use client";

import { useState, useTransition } from "react";
import { updateSiteSettings } from "@/lib/actions/settings.actions";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { PageHeader, Card } from "@/components/ui/shared";
import { SiteSettings } from "@/types";
import { toast } from "sonner";

interface SettingsFormProps {
  settings: SiteSettings;
}

export function SettingsForm({ settings }: SettingsFormProps) {
  const [isPending, startTransition] = useTransition();
  const [showCvButton, setShowCvButton] = useState(settings.show_cv_button);
  const [contactEnabled, setContactEnabled] = useState(settings.contact_section_enabled);
  const [maintenanceMode, setMaintenanceMode] = useState(settings.maintenance_mode);

  const [formValues, setFormValues] = useState({
    site_title: settings.site_title,
    site_description: settings.site_description,
    seo_description: settings.seo_description,
    copyright_text: settings.copyright_text,
  });

  const onSave = () => {
    startTransition(async () => {
      const result = await updateSiteSettings({
        ...formValues,
        show_cv_button: showCvButton,
        contact_section_enabled: contactEnabled,
        maintenance_mode: maintenanceMode,
      });
      if (result?.error) toast.error("Gagal menyimpan settings");
      else toast.success("Settings berhasil disimpan");
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Site Settings"
        description="Pengaturan umum website portfolio"
        breadcrumb={[{ label: "Admin", href: "/admin/dashboard" }, { label: "Settings" }]}
      />

      <Card>
        <h2 className="text-xs font-bold uppercase tracking-widest mb-4 pb-3 border-b border-[#e5e5e5]">Identitas Website</h2>
        <div className="space-y-4">
          <Input
            label="Site Title"
            required
            value={formValues.site_title}
            onChange={(e) => setFormValues((prev) => ({ ...prev, site_title: e.target.value }))}
            helperText="Judul website yang tampil di tab browser"
          />
          <Input
            label="Site Description"
            value={formValues.site_description}
            onChange={(e) => setFormValues((prev) => ({ ...prev, site_description: e.target.value }))}
            helperText="Deskripsi singkat website"
          />
          <Input
            label="SEO Description"
            value={formValues.seo_description}
            onChange={(e) => setFormValues((prev) => ({ ...prev, seo_description: e.target.value }))}
            helperText="Meta description untuk search engine (maks. 160 karakter)"
          />
          <Input
            label="Copyright Text"
            value={formValues.copyright_text}
            onChange={(e) => setFormValues((prev) => ({ ...prev, copyright_text: e.target.value }))}
            helperText="Ditampilkan di footer"
          />
        </div>
      </Card>

      <Card>
        <h2 className="text-xs font-bold uppercase tracking-widest mb-4 pb-3 border-b border-[#e5e5e5]">Fitur Website</h2>
        <div className="space-y-4">
          <Switch
            label="Tampilkan tombol Download CV"
            helperText="Tampilkan tombol CV di hero section"
            checked={showCvButton}
            onChange={setShowCvButton}
          />
          <Switch
            label="Aktifkan section Contact"
            helperText="Tampilkan section contact di halaman publik"
            checked={contactEnabled}
            onChange={setContactEnabled}
          />
          <Switch
            label="Maintenance Mode"
            helperText="Sembunyikan website dari search engine"
            checked={maintenanceMode}
            onChange={setMaintenanceMode}
          />
        </div>
      </Card>

      <div className="flex gap-3">
        <Button onClick={onSave} loading={isPending}>
          {isPending ? "Menyimpan..." : "Simpan Settings"}
        </Button>
      </div>
    </div>
  );
}
