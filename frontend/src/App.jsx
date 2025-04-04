import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopUsers from './pages/topUsers';
import TrendingPosts from './pages/trendingPosts';
import Feed from './pages/feed';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/top-users" element={<TopUsers />} />
        <Route path="/trending-posts" element={<TrendingPosts />} />
        <Route path="/feed" element={<Feed />} />
      </Routes>
    </Router>
  );
}

export default App;
