'use client';

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-center py-4 mt-12 text-gray-600 text-sm">
      © {new Date().getFullYear()} SportShop. Всі права захищені.
    </footer>
  );
}
