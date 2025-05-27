'use client';

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 mt-16 shadow-inner">
      <div className="max-w-7xl mx-auto px-4 py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} <span className="font-semibold text-gray-700">SportShop</span>. Всі права захищені.
      </div>
    </footer>
  );
}
