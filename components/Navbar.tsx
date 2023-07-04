import Link from "next/link";

const Navbar = () => {
  const navLinks = (
    <>
      <li>
        <Link href="/">Home</Link>
      </li>
    </>
  );

  return (
    <header className="navbar bg-base-100/80 fixed top-0 left-0 z-[100] shadow-xl border-b border-white/30 backdrop-blur-xl">
      <nav className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navLinks}
          </ul>
        </div>
        <Link href="/" className="btn btn-ghost normal-case text-xl">
          elysianFeeds
        </Link>
      </nav>

      <nav className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navLinks}</ul>
      </nav>

      <nav className="navbar-end">
        <Link href="/login" className="btn btn-accent">
          Login
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;
