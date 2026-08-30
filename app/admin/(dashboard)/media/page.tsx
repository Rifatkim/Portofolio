import { getMediaLibrary } from "@/lib/actions/media.actions";
import { MediaLibrary } from "@/components/admin/MediaLibrary";
export const metadata = { title: "Media Library" };
export default async function AdminMediaPage() {
  const media = await getMediaLibrary();
  return <MediaLibrary media={media} />;
}
