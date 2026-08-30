"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { skillSchema, skillCategorySchema, SkillFormValues, SkillCategoryFormValues } from "@/lib/validations/forms.schema";
import { createSkill, updateSkill, deleteSkill, createSkillCategory, updateSkillCategory, deleteSkillCategory } from "@/lib/actions/skills.actions";
import { SkillCategory, Skill } from "@/types";
import { PageHeader, StatusBadge, EmptyState, Card } from "@/components/ui/shared";
import { Dialog, ConfirmDialog } from "@/components/ui/dialog";
import { Input, Textarea } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Code2, Plus, Pencil, Trash2, FolderPlus } from "lucide-react";
import { toast } from "sonner";

const LEVEL_OPTIONS = [
  { value: "", label: "— No level —" },
  { value: "beginner", label: "Beginner" },
  { value: "elementary", label: "Elementary" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
  { value: "expert", label: "Expert" },
];

const STATUS_OPTIONS = [
  { value: "draft", label: "Draft" },
  { value: "published", label: "Published" },
  { value: "hidden", label: "Hidden" },
];

interface SkillsManagerProps {
  categories: SkillCategory[];
  skills: Skill[];
}

export function SkillsManager({ categories, skills }: SkillsManagerProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // Category dialog
  const [catDialog, setCatDialog] = useState(false);
  const [editingCategory, setEditingCategory] = useState<SkillCategory | null>(null);
  const [deleteCatId, setDeleteCatId] = useState<string | null>(null);

  // Skill dialog
  const [skillDialog, setSkillDialog] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [deleteSkillId, setDeleteSkillId] = useState<string | null>(null);

  // Category form
  const catForm = useForm<SkillCategoryFormValues>({
    resolver: zodResolver(skillCategorySchema),
    defaultValues: { name: "", description: "", sort_order: 0, is_visible: true },
  });

  const openCatDialog = (category?: SkillCategory) => {
    if (category) {
      setEditingCategory(category);
      catForm.reset({ name: category.name, description: category.description || "", sort_order: category.sort_order, is_visible: category.is_visible });
    } else {
      setEditingCategory(null);
      catForm.reset({ name: "", description: "", sort_order: 0, is_visible: true });
    }
    setCatDialog(true);
  };

  const onCatSubmit: SubmitHandler<SkillCategoryFormValues> = (values) => {
    startTransition(async () => {
      let result;
      if (editingCategory) {
        result = await updateSkillCategory(editingCategory.id, values);
      } else {
        result = await createSkillCategory(values);
      }
      if (result?.error) toast.error(result.error);
      else { toast.success(editingCategory ? "Category diperbarui" : "Category dibuat"); setCatDialog(false); router.refresh(); }
    });
  };

  // Skill form
  const skillForm = useForm<SkillFormValues>({
    resolver: zodResolver(skillSchema),
    defaultValues: { name: "", category_id: "", icon: "", description: "", level: undefined, sort_order: 0, status: "draft" },
  });

  const categoryOptions = [{ value: "", label: "— No Category —" }, ...categories.map((c) => ({ value: c.id, label: c.name }))];

  const openSkillDialog = (skill?: Skill) => {
    if (skill) {
      setEditingSkill(skill);
      skillForm.reset({
        name: skill.name,
        category_id: skill.category_id || "",
        icon: skill.icon || "",
        description: skill.description || "",
        level: skill.level || undefined,
        sort_order: skill.sort_order,
        status: skill.status,
      });
    } else {
      setEditingSkill(null);
      skillForm.reset({ name: "", category_id: "", icon: "", description: "", level: undefined, sort_order: 0, status: "draft" });
    }
    setSkillDialog(true);
  };

  const onSkillSubmit: SubmitHandler<SkillFormValues> = (values) => {
    startTransition(async () => {
      let result;
      if (editingSkill) {
        result = await updateSkill(editingSkill.id, { ...values, category_id: values.category_id || null, level: values.level || null });
      } else {
        result = await createSkill({ ...values, category_id: values.category_id || null, level: values.level || null });
      }
      if (result?.error) toast.error(result.error);
      else { toast.success(editingSkill ? "Skill diperbarui" : "Skill dibuat"); setSkillDialog(false); router.refresh(); }
    });
  };

  const handleDeleteCat = async () => {
    if (!deleteCatId) return;
    startTransition(async () => {
      const result = await deleteSkillCategory(deleteCatId);
      if (result.error) toast.error(result.error);
      else { toast.success("Category dihapus"); router.refresh(); }
      setDeleteCatId(null);
    });
  };

  const handleDeleteSkill = async () => {
    if (!deleteSkillId) return;
    startTransition(async () => {
      const result = await deleteSkill(deleteSkillId);
      if (result.error) toast.error(result.error);
      else { toast.success("Skill dihapus"); router.refresh(); }
      setDeleteSkillId(null);
    });
  };

  // Group skills by category
  const uncategorized = skills.filter((s) => !s.category_id);

  return (
    <div>
      <PageHeader
        title="Skills"
        description="Kelola skill dan kategori"
        breadcrumb={[{ label: "Admin", href: "/admin/dashboard" }, { label: "Skills" }]}
        actions={
          <div className="flex gap-2">
            <Button size="sm" variant="secondary" onClick={() => openCatDialog()}>
              <FolderPlus className="h-3.5 w-3.5" />
              Add Category
            </Button>
            <Button size="sm" onClick={() => openSkillDialog()}>
              <Plus className="h-3.5 w-3.5" />
              Add Skill
            </Button>
          </div>
        }
      />

      {/* Categories */}
      <div className="mb-6">
        <h2 className="text-xs font-bold uppercase tracking-widest mb-3 text-[#737373]">Categories ({categories.length})</h2>
        {categories.length === 0 ? (
          <Card>
            <p className="text-sm text-[#737373] text-center py-4">Belum ada kategori. Buat kategori untuk mengorganisir skill Anda.</p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {categories.map((cat) => {
              const catSkills = skills.filter((s) => s.category_id === cat.id);
              return (
                <Card key={cat.id} className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-sm">{cat.name}</p>
                    <p className="text-xs text-[#737373] mt-0.5">{catSkills.length} skills · Order: {cat.sort_order}</p>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <button onClick={() => openCatDialog(cat)} className="p-1.5 hover:bg-[#f5f5f5]" title="Edit"><Pencil className="h-3 w-3" /></button>
                    <button onClick={() => setDeleteCatId(cat.id)} className="p-1.5 hover:bg-red-50 hover:text-red-600" title="Hapus"><Trash2 className="h-3 w-3" /></button>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* Skills */}
      <div>
        <h2 className="text-xs font-bold uppercase tracking-widest mb-3 text-[#737373]">Skills ({skills.length})</h2>
        {skills.length === 0 ? (
          <EmptyState icon={<Code2 className="h-8 w-8" />} title="Belum ada skill" description="Tambahkan skill yang Anda kuasai" action={<Button size="sm" onClick={() => openSkillDialog()}>+ Add Skill</Button>} />
        ) : (
          <div className="border border-[#e5e5e5] bg-white overflow-hidden">
            {/* Group by category */}
            {[...categories, { id: "uncategorized", name: "Uncategorized" } as SkillCategory].map((cat) => {
              const catSkills = cat.id === "uncategorized" ? uncategorized : skills.filter((s) => s.category_id === cat.id);
              if (catSkills.length === 0) return null;
              return (
                <div key={cat.id}>
                  <div className="px-4 py-2 bg-[#f7f7f5] border-b border-[#e5e5e5]">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#737373]">{cat.name}</span>
                  </div>
                  {catSkills.map((skill, i) => (
                    <div key={skill.id} className={`flex items-center gap-4 px-4 py-2.5 ${i !== catSkills.length - 1 ? "border-b border-[#f0f0f0]" : "border-b border-[#e5e5e5]"}`}>
                      <div className="flex-1 min-w-0 flex items-center gap-2">
                        {skill.icon && <span className="text-sm">{skill.icon}</span>}
                        <p className="font-medium text-sm">{skill.name}</p>
                        {skill.level && <span className="text-[10px] font-mono text-[#a3a3a3] uppercase">{skill.level}</span>}
                      </div>
                      <StatusBadge status={skill.status} />
                      <div className="flex gap-1">
                        <button onClick={() => openSkillDialog(skill)} className="p-1.5 hover:bg-[#f5f5f5]"><Pencil className="h-3 w-3" /></button>
                        <button onClick={() => setDeleteSkillId(skill.id)} className="p-1.5 hover:bg-red-50 hover:text-red-600"><Trash2 className="h-3 w-3" /></button>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Category Dialog */}
      <Dialog open={catDialog} onClose={() => setCatDialog(false)} title={editingCategory ? "Edit Category" : "New Category"} className="max-w-md">
        <form onSubmit={catForm.handleSubmit(onCatSubmit)} className="space-y-4">
          <Input label="Category Name" required {...catForm.register("name")} error={catForm.formState.errors.name?.message} />
          <Textarea label="Description" rows={2} {...catForm.register("description")} />
          <Input label="Sort Order" type="number" min={0} {...catForm.register("sort_order")} />
          <div className="flex gap-2 justify-end pt-2">
            <Button type="button" variant="ghost" size="sm" onClick={() => setCatDialog(false)}>Batal</Button>
            <Button type="submit" size="sm" loading={isPending}>{editingCategory ? "Update" : "Buat"}</Button>
          </div>
        </form>
      </Dialog>

      {/* Skill Dialog */}
      <Dialog open={skillDialog} onClose={() => setSkillDialog(false)} title={editingSkill ? "Edit Skill" : "New Skill"} className="max-w-md">
        <form onSubmit={skillForm.handleSubmit(onSkillSubmit)} className="space-y-4">
          <Input label="Skill Name" required {...skillForm.register("name")} error={skillForm.formState.errors.name?.message} />
          <Select label="Category" options={categoryOptions} {...skillForm.register("category_id")} />
          <Select label="Level" options={LEVEL_OPTIONS} {...skillForm.register("level")} />
          <Input label="Icon" placeholder="Emoji atau nama ikon (e.g. 🌐 atau react)" helperText="Opsional" {...skillForm.register("icon")} />
          <Textarea label="Description" rows={2} {...skillForm.register("description")} />
          <div className="grid grid-cols-2 gap-4">
            <Select label="Status" options={STATUS_OPTIONS} {...skillForm.register("status")} />
            <Input label="Sort Order" type="number" min={0} {...skillForm.register("sort_order")} />
          </div>
          <div className="flex gap-2 justify-end pt-2">
            <Button type="button" variant="ghost" size="sm" onClick={() => setSkillDialog(false)}>Batal</Button>
            <Button type="submit" size="sm" loading={isPending}>{editingSkill ? "Update" : "Buat"}</Button>
          </div>
        </form>
      </Dialog>

      {/* Confirm dialogs */}
      <ConfirmDialog open={!!deleteCatId} onClose={() => setDeleteCatId(null)} onConfirm={handleDeleteCat} loading={isPending} title="Hapus Category" message="Hapus kategori ini? Skill yang menggunakan kategori ini tidak akan ikut terhapus." />
      <ConfirmDialog open={!!deleteSkillId} onClose={() => setDeleteSkillId(null)} onConfirm={handleDeleteSkill} loading={isPending} title="Hapus Skill" message="Apakah Anda yakin ingin menghapus skill ini?" />
    </div>
  );
}
