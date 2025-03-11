import { useState } from 'react';
import { FaRobot } from 'react-icons/fa';
import { Mail, Lock, Eye, EyeOff, Github } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { BsMicrosoft } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your sign-in logic here
    console.log('Sign in with:', { email, password });
    navigate('/');
  };

  return (
    <div className="flex h-screen">
      {/* Left Side - Logo */}
      <div className="hidden lg:flex lg:w-1/2 bg-gray-900 items-center justify-center">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <FaRobot className="w-24 h-24 text-blue-500 animate-bounce" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">IntelliChat</h1>
          <p className="text-gray-400 text-lg max-w-md mx-auto">
            Experience the future of conversation with our
          </p>
          <p className='text-gray-400 text-lg max-w-md mx-auto'>
          AI-powered chatbot.
          </p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-black">Welcome back</h2>
            <p className="text-black mt-2">Please sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-5 h-5  absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 "
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-black  mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="w-5 h-5  absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500  "
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-black rounded"
                />
                <label htmlFor="remember" className="ml-2 text-sm text-black">
                  Remember me
                </label>
              </div>
              <a href="#forgot-password" className="text-sm text-blue-500 hover:text-blue-600">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-200"
            >
              Sign In
            </button>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white ">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <button className="flex justify-center items-center py-2 px-4 border rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <FcGoogle className="w-5 h-5" />
              </button>
              <button className="flex justify-center items-center py-2 px-4 border rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <Github className="w-5 h-5" />
              </button>
              <button className="flex justify-center items-center py-2 px-4 border rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <BsMicrosoft className="w-5 h-5 text-blue-500" />
              </button>
            </div>
          </div>

          {/* Sign Up Link */}
          <p className="mt-8 text-center text-sm text-black">
            Don&apos;t have an account?{' '}
            <Link to="/signup"><button to="signup" className="text-blue-500 hover:text-blue-600 font-medium">
              Sign up
            </button>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;