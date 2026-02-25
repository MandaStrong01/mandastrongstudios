export default function Footer() {
  return (
    <footer className="bg-black/50 backdrop-blur-sm border-t border-purple-500/30 py-6 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-white/60 text-sm">
          &copy; {new Date().getFullYear()} MandaStrong Studio. All rights reserved.
        </p>
        <p className="text-white/40 text-xs mt-2">
          Empowering creators to make a difference through storytelling
        </p>
      </div>
    </footer>
  );
}
