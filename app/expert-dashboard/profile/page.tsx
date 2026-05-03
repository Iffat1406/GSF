"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { useProfile } from "@/lib/hooks/useProfile";
import { useExpertProfile } from "@/lib/hooks/useExpertProfile";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { Edit3, Save, Mail, Globe, Link2, MapPin, Camera, Star, Award, Briefcase } from "lucide-react";

const DOMAINS_ALL = ["HealthTech","FinTech","EdTech","Product","Growth","Legal","AgriTech","ClimaTech","SaaS","DeepTech","Fundraising"];

const fadeUp = (d = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: d, duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
});

export default function ExpertProfilePage() {
  const { profile,        loading: profileLoading,  saving: profileSaving,  updateProfile, refetch: refetchProfile } = useProfile();
  const { profile: ep,   loading: epLoading,        saving: epSaving,       updateExpertProfile } = useExpertProfile();
  const { user: clerkUser } = useUser();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);

  const [editing, setEditing] = useState(false);
  const [saved,   setSaved]   = useState(false);

  const [form, setForm] = useState({
    name:            "",
    bio:             "",
    title:           "",
    company:         "",
    location:        "",
    email:           "",
    linkedin:        "",
    website:         "",
    experience:      "",
    sessionRate:     "100",
    weeklySlots:     "4",
    specializations: [] as string[],
  });

  // Sync from both sources when loaded
  useEffect(() => {
    setForm(prev => ({
      ...prev,
      name:     profile?.name     ?? prev.name,
      bio:      profile?.bio      ?? prev.bio,
      location: profile?.location ?? prev.location,
      email:    profile?.email    ?? prev.email,
      linkedin: profile?.linkedin ?? prev.linkedin,
      website:  profile?.website  ?? prev.website,
    }));
  }, [profile]);

  useEffect(() => {
    if (ep) {
      setForm(prev => ({
        ...prev,
        title:           ep.title           ?? prev.title,
        company:         ep.company         ?? prev.company,
        experience:      ep.experience      ?? prev.experience,
        sessionRate:     String(ep.sessionRate ?? 100),
        weeklySlots:     String(ep.weeklySlots ?? 4),
        specializations: ep.specializations ?? prev.specializations,
      }));
    }
  }, [ep]);

  const loading = profileLoading || epLoading;
  const saving  = profileSaving  || epSaving;

  async function handleSave() {
    const [ok1, ok2] = await Promise.all([
      updateProfile({ name: form.name, bio: form.bio, location: form.location, linkedin: form.linkedin, website: form.website }),
      updateExpertProfile({
        title: form.title, company: form.company, experience: form.experience,
        sessionRate: parseInt(form.sessionRate) || 100,
        weeklySlots: parseInt(form.weeklySlots) || 4,
        specializations: form.specializations,
      }),
    ]);
    if (ok1 && ok2) {
      setSaved(true);
      setEditing(false);
      setTimeout(() => setSaved(false), 2500);
    }
  }

  async function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !clerkUser) return;
    setUploadingPhoto(true);
    try {
      await clerkUser.setProfileImage({ file });
      // clerkUser.imageUrl updates automatically via useUser() — no refetch needed
    } catch (err) {
      console.error("Photo upload failed:", err);
    } finally {
      setUploadingPhoto(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  function toggleSpec(domain: string) {
    setForm(prev => ({
      ...prev,
      specializations: prev.specializations.includes(domain)
        ? prev.specializations.filter(d => d !== domain)
        : [...prev.specializations, domain],
    }));
  }

  const avatarInitials = form.name
    ? form.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)
    : "??";

  if (loading) {
    return (
      <DashboardShell role="expert">
        <div className="max-w-3xl mx-auto space-y-6 animate-pulse">
          <div className="h-8 w-48 rounded-xl" style={{ backgroundColor: "var(--bg-surface-2)" }} />
          <div className="card p-6 h-32" />
        </div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell role="expert">
      <div className="max-w-3xl mx-auto space-y-6">
        <motion.div {...fadeUp(0)} className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: "var(--text-primary)" }}>
              Expert Profile
            </h1>
            <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
              Your public expert profile visible to all founders on the platform.
            </p>
          </div>
          <div className="flex items-center gap-2">
            {saved && (
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-emerald-500 font-medium">
                ✓ Saved
              </motion.span>
            )}
            {editing ? (
              <>
                <button onClick={() => setEditing(false)} className="btn-outline text-sm py-2 px-4">Cancel</button>
                <button onClick={handleSave} disabled={saving} className="btn-primary text-sm py-2 px-5 flex items-center gap-1.5">
                  <Save className="size-3.5" /> {saving ? "Saving…" : "Save"}
                </button>
              </>
            ) : (
              <button onClick={() => setEditing(true)} className="btn-primary text-sm py-2 px-5 flex items-center gap-1.5">
                <Edit3 className="size-3.5" /> Edit Profile
              </button>
            )}
          </div>
        </motion.div>

        {/* Avatar + hero */}
        <motion.div {...fadeUp(0.05)} className="card p-6">
          <div className="flex items-center gap-5">
            <div className="relative">
              {/* Hidden file input */}
              <input type="file" accept="image/*" hidden ref={fileInputRef} onChange={handlePhotoChange} />
              {/* Use clerkUser.imageUrl — reactive, updates instantly after upload */}
              {clerkUser?.imageUrl ? (
                <Image src={clerkUser.imageUrl} alt={form.name || "Profile"} width={80} height={80}
                  className="size-20 rounded-2xl object-cover flex-shrink-0" unoptimized />
              ) : (
                <div className="size-20 rounded-2xl flex items-center justify-center text-2xl font-bold text-white flex-shrink-0"
                  style={{ background: "linear-gradient(135deg, #4FD1C5, #5B6CFF)" }}>
                  {avatarInitials}
                </div>
              )}
              <button
                title="Change profile photo"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploadingPhoto}
                className="absolute -bottom-1 -right-1 size-7 rounded-lg flex items-center justify-center shadow-md hover:scale-110 transition-transform"
                style={{ backgroundColor: "var(--bg-card)", border: "1.5px solid var(--border-default)" }}>
                {uploadingPhoto
                  ? <span className="size-3 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                  : <Camera className="size-3.5" style={{ color: "var(--text-muted)" }} />}
              </button>
            </div>
            <div className="flex-1">
              {editing ? (
                <input className="input text-lg font-bold mb-2" value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })} />
              ) : (
                <h2 className="text-xl font-bold mb-1" style={{ color: "var(--text-primary)" }}>{form.name}</h2>
              )}
              <div className="flex items-center gap-3 flex-wrap">
                <span className="badge badge-teal text-xs flex items-center gap-1">
                  <Award className="size-3" /> Verified Expert
                </span>
                {(form.title || form.company) && (
                  <span className="flex items-center gap-1 text-xs" style={{ color: "var(--text-muted)" }}>
                    <Briefcase className="size-3" />{form.title}{form.company ? ` @ ${form.company}` : ""}
                  </span>
                )}
                {form.location && (
                  <span className="flex items-center gap-1 text-xs" style={{ color: "var(--text-muted)" }}>
                    <MapPin className="size-3" />{form.location}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1 mt-2">
                {[1,2,3,4,5].map(s => <Star key={s} className="size-3.5 fill-yellow-400 text-yellow-400" />)}
                <span className="text-xs font-medium ml-1" style={{ color: "var(--text-primary)" }}>
                  {ep?.rating ?? "—"}
                </span>
                <span className="text-xs ml-1" style={{ color: "var(--text-muted)" }}>
                  ({ep?.totalSessions ?? 0} sessions)
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Bio + details */}
          <motion.div {...fadeUp(0.1)} className="card p-6 space-y-4">
            <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>About</h3>
            {[
              { label: "Bio",        key: "bio",        multiline: true },
              { label: "Title",      key: "title"                      },
              { label: "Company",    key: "company"                    },
              { label: "Location",   key: "location"                   },
              { label: "Experience", key: "experience"                  },
            ].map(({ label, key, multiline }) => (
              <div key={key}>
                <label className="block text-xs font-medium mb-1" style={{ color: "var(--text-muted)" }}>{label}</label>
                {editing ? (
                  multiline ? (
                    <textarea className="input textarea text-sm" value={(form as unknown as Record<string, string>)[key]}
                      onChange={e => setForm({ ...form, [key]: e.target.value })} />
                  ) : (
                    <input className="input text-sm" value={(form as unknown as Record<string, string>)[key]}
                      onChange={e => setForm({ ...form, [key]: e.target.value })} />
                  )
                ) : (
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {(form as unknown as Record<string, string>)[key] || "—"}
                  </p>
                )}
              </div>
            ))}
            {/* Links */}
            {[
              { label: "LinkedIn", key: "linkedin", icon: Link2, type: "url" },
              { label: "Website",  key: "website",  icon: Globe, type: "url" },
              { label: "Email",    key: "email",    icon: Mail,  type: "email" },
            ].map(({ label, key, icon: Icon, type }) => (
              <div key={key}>
                <label className="block text-xs font-medium mb-1 flex items-center gap-1" style={{ color: "var(--text-muted)" }}>
                  <Icon className="size-3" />{label}
                </label>
                {editing ? (
                  <input type={type} className="input text-sm" value={(form as unknown as Record<string, string>)[key]}
                    onChange={e => setForm({ ...form, [key]: e.target.value })}
                    disabled={key === "email"} />
                ) : (
                  <p className="text-sm" style={{ color: (form as unknown as Record<string, string>)[key] ? "var(--accent-indigo)" : "var(--text-muted)" }}>
                    {(form as unknown as Record<string, string>)[key] || "Not added"}
                  </p>
                )}
              </div>
            ))}
          </motion.div>

          <div className="space-y-5">
            {/* Session settings */}
            <motion.div {...fadeUp(0.15)} className="card p-5 space-y-4">
              <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Session Settings</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium mb-1" style={{ color: "var(--text-muted)" }}>Credit Rate / session</label>
                  {editing ? (
                    <input type="number" className="input text-sm" value={form.sessionRate}
                      onChange={e => setForm({ ...form, sessionRate: e.target.value })} />
                  ) : (
                    <p className="text-xl font-bold" style={{ color: "var(--accent-indigo)" }}>{form.sessionRate} cr</p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1" style={{ color: "var(--text-muted)" }}>Slots / week</label>
                  {editing ? (
                    <input type="number" className="input text-sm" value={form.weeklySlots}
                      onChange={e => setForm({ ...form, weeklySlots: e.target.value })} />
                  ) : (
                    <p className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>{form.weeklySlots}</p>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Specializations */}
            <motion.div {...fadeUp(0.2)} className="card p-5">
              <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--text-primary)" }}>Specializations</h3>
              {editing ? (
                <div className="flex flex-wrap gap-2">
                  {DOMAINS_ALL.map(d => (
                    <button key={d} onClick={() => toggleSpec(d)} className="badge text-xs transition-all"
                      style={form.specializations.includes(d)
                        ? { backgroundColor: "rgba(91,108,255,0.15)", color: "var(--accent-indigo)", border: "1px solid rgba(91,108,255,0.4)" }
                        : { backgroundColor: "var(--bg-surface-2)", color: "var(--text-muted)", border: "1px solid var(--border-default)" }
                      }>
                      {d}
                    </button>
                  ))}
                </div>
              ) : form.specializations.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {form.specializations.map(d => (
                    <span key={d} className="badge badge-blue text-xs">{d}</span>
                  ))}
                </div>
              ) : (
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>No specializations set</p>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
