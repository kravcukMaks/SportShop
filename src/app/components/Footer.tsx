'use client';

export default function Footer() {
  return (
    <footer className="bg-gray-50 text-center py-6 mt-16 text-gray-500 text-sm border-t border-gray-200 shadow-sm">
  © {new Date().getFullYear()} <span className="font-semibold text-gray-700">SportShop</span>. Всі права захищені.
</footer>
  );
}
