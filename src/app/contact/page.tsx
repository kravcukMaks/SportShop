
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="max-w-xl mx-auto p-8 bg-white rounded-2xl shadow-md mt-12">
     <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800">
    Контакти
  </h1>

  <form className="space-y-6">
    <div>
      <label htmlFor="name" className="block text-gray-700 font-medium mb-1">Ваше ім’я</label>
      <input
        type="text"
        id="name"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div>
      <label htmlFor="message" className="block text-gray-700 font-medium mb-1">Повідомлення</label>
      <textarea
        id="message"
        rows={4}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
      ></textarea>
    </div>

    <button
      type="submit"
      className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200"
    >
      Відправити
    </button>
  </form>
</main>

      <Footer />
    </>
  );
}
