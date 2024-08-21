/*import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-[#F2EBE3] text-black py-4 ">
      <div className="container mx-auto flex justify-between ">
        <div className="flex space-x-6 items-center">
          <Link href="/" className="hover:text-gray-400">
            <img src="/giftJoy.png" alt="GiftJoy" className="h-16" />
          </Link>
          <Link href="/productos" className="hover:text-gray-400">
            Productos
          </Link>
          <Link href="/promociones" className="hover:text-gray-400">
            Promociones
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Buscar..."
            className="px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Link href="/cart" className="hover:text-gray-400">
            <button data-quantity="2" className="btn-cart">
              <svg
                className="icon-cart"
                viewBox="0 0 24.38 30.52"
                height="30.52"
                width="24.38"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>icon-cart</title>
                <path
                  transform="translate(-3.62 -0.85)"
                  d="M28,27.3,26.24,7.51a.75.75,0,0,0-.76-.69h-3.7a6,6,0,0,0-12,0H6.13a.76.76,0,0,0-.76.69L3.62,27.3v.07a4.29,4.29,0,0,0,4.52,4H23.48a4.29,4.29,0,0,0,4.52-4ZM15.81,2.37a4.47,4.47,0,0,1,4.46,4.45H11.35a4.47,4.47,0,0,1,4.46-4.45Zm7.67,27.48H8.13a2.79,2.79,0,0,1-3-2.45L6.83,8.34h3V11a.76.76,0,0,0,1.52,0V8.34h8.92V11a.76.76,0,0,0,1.52,0V8.34h3L26.48,27.4a2.79,2.79,0,0,1-3,2.44Zm0,0"
                ></path>
              </svg>
              <span className="quantity"></span>
            </button>
          </Link>
          <Link href="/login" className="hover:text-gray-400">
            Inicio de sesión
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
*/
import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-[#F2EBE3] text-black py-4 ">
      <div className="container mx-auto flex justify-between ">
        <div className="flex space-x-6 items-center">
          <Link href="/" className="hover:text-gray-400">
            <img src="/giftJoy.png" alt="GiftJoy" className="h-16" />
          </Link>
          <Link href="/productos" className="hover:text-gray-400">
            Productos
          </Link>
          <Link href="/promociones" className="hover:text-gray-400">
            Promociones
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Buscar..."
            className="px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Link href="/cart" className="hover:text-gray-400">
            <button className="btn-cart">
              <svg
                className="icon-cart"
                viewBox="0 0 24.38 30.52"
                height="30.52"
                width="24.38"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>icon-cart</title>
                <path
                  transform="translate(-3.62 -0.85)"
                  d="M28,27.3,26.24,7.51a.75.75,0,0,0-.76-.69h-3.7a6,6,0,0,0-12,0H6.13a.76.76,0,0,0-.76.69L3.62,27.3v.07a4.29,4.29,0,0,0,4.52,4H23.48a4.29,4.29,0,0,0,4.52-4ZM15.81,2.37a4.47,4.47,0,0,1,4.46,4.45H11.35a4.47,4.47,0,0,1,4.46-4.45Zm7.67,27.48H8.13a2.79,2.79,0,0,1-3-2.45L6.83,8.34h3V11a.76.76,0,0,0,1.52,0V8.34h8.92V11a.76.76,0,0,0,1.52,0V8.34h3L26.48,27.4a2.79,2.79,0,0,1-3,2.44Zm0,0"
                ></path>
              </svg>
              <span className="quantity"></span>
            </button>
          </Link>
          <Link href="/login" className="hover:text-gray-400">
            Inicio de sesión
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
