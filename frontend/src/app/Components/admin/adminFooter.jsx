export default function AdminFooter() {
  return (
    <footer className="border-t bg-white mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-2">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} Admin Panel. All rights reserved.
        </p>

        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span>Version 1.0.0</span>
          <span>•</span>
          <span>Developed by Chandan</span>
        </div>
      </div>
    </footer>
  );
}