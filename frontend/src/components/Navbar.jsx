import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="bg-blue-600 text-white p-4 flex justify-center space-x-6 text-lg font-medium">
    <Link to="/top-users" className="hover:underline">Top Users</Link>
    <Link to="/trending-posts" className="hover:underline">Trending Posts</Link>
    <Link to="/feed" className="hover:underline">Feed</Link>
  </nav>
);

export default Navbar;
