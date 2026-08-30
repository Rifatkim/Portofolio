import { getSkillCategories, getSkills } from "@/lib/actions/skills.actions";
import { SkillsManager } from "@/components/admin/SkillsManager";
export const metadata = { title: "Skills" };
export default async function AdminSkillsPage() {
  const [categories, skills] = await Promise.all([getSkillCategories(true), getSkills(true)]);
  return <SkillsManager categories={categories} skills={skills} />;
}
