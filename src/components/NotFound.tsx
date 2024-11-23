import { useNavigate } from 'react-router-dom';

interface NotFoundProps {
  isDarkTheme: boolean;
}

const NotFound = ({ isDarkTheme }: NotFoundProps) => {
  const navigate = useNavigate();

  return (
    <div className={`min-h-screen flex items-center justify-center ${isDarkTheme ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="text-center px-4">
        <h1 className={`text-9xl font-bold mb-4 ${isDarkTheme ? 'text-gray-700' : 'text-gray-200'}`}>404</h1>
        <h2 className={`text-3xl font-semibold mb-4 ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>
          Page Not Found
        </h2>
        <p className={`text-lg mb-8 ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <button
          onClick={() => navigate('/')}
          className="bg-teal-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-teal-700 transition-colors"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default NotFound; 