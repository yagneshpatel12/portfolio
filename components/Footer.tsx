import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 py-6">
      <p className="text-slate-400 text-sm text-center flex flex-wrap items-center justify-center gap-1.5">
        Yagnesh Patel © {new Date().getFullYear()} · Crafted with
        <Heart size={13} className="text-red-500 fill-red-500" aria-label="love" />
        &amp; caffeine in India
      </p>
    </footer>
  );
}
