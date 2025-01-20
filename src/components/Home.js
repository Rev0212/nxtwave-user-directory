import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Moon, 
  Sun, 
  Search, 
  Mail, 
  MapPin, 
  Phone,
  ChevronUp, 
  ChevronDown,
  Users,
  ArrowLeftCircle,
  ArrowRightCircle
} from 'lucide-react';
import { fetchUsers, setSearchTerm, setSortDirection } from '../store/usersSlice';

const Home = ({ isDark, setIsDark }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const { list: users, loading, error, searchTerm, sortDirection } = useSelector(
    (state) => state.users
  );

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const filteredUsers = users
    .filter(user => 
      user.name.toLowerCase().includes(searchTerm?.toLowerCase() || '')
    )
    .sort((a, b) => {
      if (sortDirection === 'asc') {
        return a.name.localeCompare(b.name);
      }
      return b.name.localeCompare(a.name);
    });

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-3">
          <Users size={32} className="text-blue-500" />
          <h1 className="text-3xl font-bold">User Directory</h1>
        </div>
        <button
          onClick={() => setIsDark(!isDark)}
          className={`p-3 rounded-full transition-all duration-300 ${
            isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          {isDark ? <Sun size={24} className="text-yellow-400" /> : <Moon size={24} className="text-gray-600" />}
        </button>
      </div>

      {/* Search and Sort */}
      <div className="mb-8 flex gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search users by name..."
            value={searchTerm || ''}
            onChange={(e) => dispatch(setSearchTerm(e.target.value))}
            className={`w-full pl-12 pr-4 py-3 rounded-xl shadow-sm transition-all duration-300 ${
              isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
            } border ${isDark ? 'border-gray-700 focus:border-blue-500' : 'border-gray-300 focus:border-blue-400'} 
            focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 focus:outline-none`}
          />
        </div>
        <button
          onClick={() => dispatch(setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc'))}
          className={`px-4 py-3 rounded-xl shadow-sm transition-all duration-300 flex items-center space-x-2 ${
            isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'
          } border ${isDark ? 'border-gray-700' : 'border-gray-300'}`}
        >
          <span>Sort</span>
          {sortDirection === 'asc' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
      </div>

      {/* Loading and Error States */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
        </div>
      ) : error ? (
        <div className="text-red-500 text-center py-4 bg-red-100 rounded-lg">{error}</div>
      ) : (
        <>
          {/* User List */}
          <div className="grid gap-4">
            {currentUsers.map(user => (
              <div
                key={user.id}
                onClick={() => navigate(`/user/${user.id}`)}
                className={`p-6 rounded-xl shadow-sm cursor-pointer transform transition-all duration-300 hover:scale-[1.01] ${
                  isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'
                } border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="mb-4 md:mb-0">
                    <h2 className="text-xl font-semibold mb-2">{user.name}</h2>
                    <div className="flex flex-col space-y-2">
                      <div className="flex items-center space-x-2 text-gray-500">
                        <Mail size={16} />
                        <span>{user.email}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-500">
                        <MapPin size={16} />
                        <span>{user.address.city}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-500">
                        <Phone size={16} />
                        <span>{user.phone}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
                      isDark 
                        ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                        : 'bg-blue-500 hover:bg-blue-600 text-white'
                    }`}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-8 flex justify-center items-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`p-2 rounded-lg ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200'}`}
            >
              <ArrowLeftCircle size={24} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
                  currentPage === i + 1
                    ? isDark
                      ? 'bg-blue-600 text-white'
                      : 'bg-blue-500 text-white'
                    : isDark
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-lg ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200'}`}
            >
              <ArrowRightCircle size={24} />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;