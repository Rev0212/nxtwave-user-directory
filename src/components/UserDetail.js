import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  ArrowLeft,
  Mail,
  Phone,
  Globe,
  Building,
  MapPin,
  Briefcase,
  User,
  ExternalLink
} from 'lucide-react';
import { fetchUserById } from '../store/usersSlice';

const UserDetail = ({ isDark }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedUser: user, loading, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUserById(id));
  }, [dispatch, id]);

  const containerStyle = isDark
    ? 'bg-gray-900 text-gray-100'
    : 'bg-gray-50 text-gray-900';

  const cardStyle = isDark
    ? 'bg-gray-800 border-gray-700'
    : 'bg-white border-gray-200';

  if (loading) {
    return (
      <div className={`min-h-screen p-8 ${containerStyle}`}>
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 w-32 mb-6 bg-gray-300 rounded" />
            <div className={`${cardStyle} rounded-lg shadow-lg border p-6`}>
              <div className="space-y-4">
                <div className="h-12 w-3/4 bg-gray-300 rounded" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="space-y-2">
                      <div className="h-4 w-full bg-gray-300 rounded" />
                      <div className="h-4 w-2/3 bg-gray-300 rounded" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className={`min-h-screen p-8 ${containerStyle}`}>
        <div className="max-w-4xl mx-auto text-center">
          <div className={`${cardStyle} rounded-lg shadow-lg border p-8`}>
            <div className="space-y-4">
              <h1 className="text-2xl font-bold">
                {error || 'User not found'}
              </h1>
              <button
                onClick={() => navigate('/')}
                className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Return to Users
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen p-8 ${containerStyle}`}>
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate('/')}
          className="mb-6 inline-flex items-center px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Users
        </button>

        <div className={`${cardStyle} rounded-lg shadow-lg border`}>
          {/* Header */}
          <div className="text-center p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="mx-auto bg-blue-500 rounded-full p-4 mb-4 w-20 h-20 flex items-center justify-center">
              <User className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-3xl font-bold">{user.name}</h1>
            
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             
              <div className="space-y-4">
                <h2 className="text-xl font-semibold flex items-center">
                  <Mail className="mr-2 h-5 w-5 text-blue-500" />
                  Contact Details
                </h2>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <a href={`mailto:${user.email}`} className="hover:text-blue-500 transition-colors">
                      {user.email}
                    </a>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span>{user.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Globe className="h-4 w-4 text-gray-500" />
                    <a
                      href={`https://${user.website}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center hover:text-blue-500 transition-colors"
                    >
                      {user.website}
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  </div>
                </div>
              </div>

              
              <div className="space-y-4">
                <h2 className="text-xl font-semibold flex items-center">
                  <Briefcase className="mr-2 h-5 w-5 text-green-500" />
                  Company Details
                </h2>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Building className="h-4 w-4 text-gray-500" />
                    <span className="font-medium">{user.company.name}</span>
                  </div>
                  <div className="pl-6">
                    <p className="text-gray-600 dark:text-gray-400 italic">
                      "{user.company.catchPhrase}"
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {user.company.bs}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
  <h2 className="text-xl font-semibold flex items-center mb-4">
    <MapPin className="mr-2 h-5 w-5 text-red-500" />
    Location
  </h2>
  <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <p className="text-sm text-gray-700 dark:text-gray-200">Street Address</p>
        <p className="font-medium text-gray-900 dark:text-gray-100">
          {user.address.street}, {user.address.suite}
        </p>
      </div>
      <div>
        <p className="text-sm text-gray-700 dark:text-gray-200">City & Zip</p>
        <p className="font-medium text-gray-900 dark:text-gray-100">
          {user.address.city}, {user.address.zipcode}
        </p>
      </div>
    </div>
    <div className="mt-2">
      <p className="text-sm text-gray-700 dark:text-gray-200">Coordinates</p>
      <p className="font-medium text-gray-900 dark:text-gray-100">
        {user.address.geo.lat}, {user.address.geo.lng}
      </p>
    </div>
  </div>
</div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;