import { Profile } from "@/types";

interface ProfileSectionProps {
  profile: Profile | null;
}

export function ProfileSection({ profile }: ProfileSectionProps) {
  if (!profile?.full_name && !profile?.detailed_bio) return null;

  return (
    <section id="profile" className="py-20 px-6 lg:px-12 max-w-7xl mx-auto">
      {/* Section header */}
      <div className="flex items-start gap-6 mb-12 pb-6 border-b-2 border-foreground">
        <span className="text-mono text-[#a3a3a3] mt-1">[01]</span>
        <h2 className="font-editorial text-4xl lg:text-5xl uppercase">PROFILE</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-12">
        {/* Photo */}
        {profile?.profile_photo_url && (
          <div className="w-full max-w-[240px]">
            <div className="aspect-square overflow-hidden border border-[#e5e5e5]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={profile.profile_photo_url}
                alt={profile.full_name || "Profile"}
                className="w-full h-full object-cover img-grayscale"
              />
            </div>
          </div>
        )}

        {/* Info */}
        <div className="space-y-8">
          {/* Key facts */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {profile?.full_name && (
              <div>
                <p className="text-label text-[#737373] mb-1">Name</p>
                <p className="text-sm font-semibold">{profile.full_name}</p>
              </div>
            )}
            {profile?.university && (
              <div>
                <p className="text-label text-[#737373] mb-1">University</p>
                <p className="text-sm font-semibold">{profile.university}</p>
              </div>
            )}
            {profile?.major && (
              <div>
                <p className="text-label text-[#737373] mb-1">Major</p>
                <p className="text-sm font-semibold">{profile.major}</p>
              </div>
            )}
            {profile?.location && (
              <div>
                <p className="text-label text-[#737373] mb-1">Location</p>
                <p className="text-sm font-semibold">{profile.location}</p>
              </div>
            )}
            {profile?.show_gpa && profile?.gpa && (
              <div>
                <p className="text-label text-[#737373] mb-1">GPA</p>
                <p className="text-sm font-bold font-mono">{profile.gpa} / {profile.gpa_scale || 4}</p>
              </div>
            )}
            {profile?.availability_status && (
              <div>
                <p className="text-label text-[#737373] mb-1">Status</p>
                <p className="text-sm font-semibold capitalize">{profile.availability_status.replace("_", " ")}</p>
              </div>
            )}
          </div>

          {/* Bio */}
          {profile?.detailed_bio && (
            <div>
              <p className="text-label text-[#737373] mb-3">About</p>
              <p className="text-sm leading-relaxed text-[#525252] max-w-2xl whitespace-pre-wrap">
                {profile.detailed_bio}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
