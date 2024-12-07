import { useNavigate } from 'react-router-dom';

interface NotFoundProps {
  isDarkTheme: boolean;
}

const NotFound = ({ isDarkTheme }: NotFoundProps) => {
  const navigate = useNavigate();

  return (
    <div className={`min-h-screen flex items-center justify-center ${
      isDarkTheme ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
    }`}>
      <div className="text-center px-4">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className={`mb-8 ${
          isDarkTheme ? 'text-gray-400' : 'text-gray-600'
        }`}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="space-y-4">
          <button
            onClick={() => navigate('/')}
            className="inline-block bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors"
          >
            Return Home
          </button>
          <p className={`text-sm ${
            isDarkTheme ? 'text-gray-400' : 'text-gray-600'
          }`}>
            If you believe this is a mistake, please{' '}
            <a
              href="mailto:support@safinaai.com"
              className="text-teal-600 hover:underline"
            >
              contact our support team
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound; 