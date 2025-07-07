import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const JagadishPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center p-4 w-screen overflow-x-hidden">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-2xl w-full"
      >
        <div className="p-8 text-center">
          <motion.img
            src="./images/members/jagadish.jpg"
            alt="Jagadish"
            className="w-32 h-32 mx-auto rounded-full object-cover border-4 border-pink-200 shadow-lg mb-6"
            initial={{ rotate: -10 }}
            animate={{ rotate: 0 }}
            transition={{ type: 'spring', stiffness: 300 }}
          />
          
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Special Message</h1>
          <p className="text-xl text-pink-600 mb-6">For Reva</p>
          
          <div className="bg-pink-50 rounded-xl p-6 mb-8 text-left">
            <p className="text-gray-700 text-lg italic mb-4">
              "This is your very special secret message that only you can see with the correct PIN."
            </p>
            <p className="text-gray-700">
              You can put whatever special message you want to show here, maybe something heartfelt or important.
            </p>
          </div>
          
          <Link to="/members">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-2 rounded-full shadow-lg"
            >
              Back to Members
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default JagadishPage;    