import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const MembersPage = () => {
  const members = [
    {
      id: 1,
      name: 'Hari',
      email: 'jagadishkamil.141@gmail.com',
      role: 'Best Friend',
      profileImg: './images/members/hari.jpeg',
      bio: 'Hari is the most caring and supportive friend anyone could ask for. He loves hiking, photography, and making people laugh.',
      wishes: [
        'Happy birthday to the most amazing person I know! May your day be filled with joy and laughter.',
        'Wishing you another year of great adventures and happiness. Let\'s plan another trip soon!'
      ],
      funFact: 'He can solve a Rubik\'s cube in under 2 minutes!'
    },
    {
      id: 2,
      name: 'Bharath',
      email: 'bharath@example.com',
      role: 'Best Friend',
      profileImg: './images/members/Bharath.jpeg',
      bio: 'Bharath is the tech genius of the group. He\'s always there to help with any gadget problems and makes the best jokes.',
      wishes: [
        'Wishing you endless happiness on your special day! You deserve the world.',
        'Can\'t wait to celebrate with you - I\'ve got the perfect birthday surprise planned!'
      ],
      funFact: 'He once built his own computer from scratch.'
    },
    {
      id: 3,
      name: 'Priya',
      email: 'priya@example.com',
      role: 'Best Friend',
      profileImg: './images/members/priya.jpeg',
      bio: 'Priya is my partner in crime and the most creative person I know. She\'s an amazing artist and the best listener.',
      wishes: [
        'To my dearest friend, may your birthday be as wonderful as you are!',
        'Here\'s to another year of inside jokes and unforgettable memories!'
      ],
      funFact: 'She can draw perfect circles freehand.'
    },
    {
      id: 4,
      name: 'Anuja',
      email: 'anuja@example.com',
      role: 'Best Friend',
      profileImg: './images/members/anuja.jpeg',
      bio: 'Anuja is the life of every party and has the most contagious laugh. She loves animals and has a big heart.',
      wishes: [
        'Happy birthday! Let\'s make this year the best one yet!',
        'Wishing you a year filled with love, success, and lots of puppy cuddles!'
      ],
      funFact: 'She can imitate over 20 different animal sounds.'
    },
    {
      id: 5,
      name: 'Durga Shree',
      email: 'durga@example.com',
      role: 'Best Friend',
      profileImg: './images/members/durga.jpeg',
      bio: 'Durga is the most reliable friend you can count on. She always knows how to cheer you up when you\'re down.',
      wishes: [
        'Happy birthday! Your positivity is contagious and inspiring!',
        'May this year bring you all the happiness you bring to others!'
      ],
      funFact: 'She can recite all the dialogues from her favorite movies.'
    },
    {
      id: 6,
      name: 'Tharun',
      email: 'tharun@example.com',
      role: 'Best Friend',
      profileImg: './images/members/tharun.jpeg',
      bio: 'Tharun is the calm in every storm. His wisdom and patience make him an incredible friend.',
      wishes: [
        'Wishing you peace, joy and success this year and always!',
        'Your friendship means the world to me - happy birthday!'
      ],
      funFact: 'He meditates every morning without fail.'
    },
    {
      id: 7,
      name: 'Dinesh',
      email: 'dinesh@example.com',
      role: 'Bro',
      profileImg: './images/members/dinesh.jpeg',
      bio: 'Dinesh is like a brother to me. His loyalty and support have been unwavering through thick and thin.',
      wishes: [
        'Happy birthday bro! No matter where life takes us, you\'ll always be family!',
        'Here\'s to many more years of friendship and brotherhood!'
      ],
      funFact: 'He can eat 10 idlis in one sitting!'
    }
  ];

  const [selectedMember, setSelectedMember] = useState(members[0]);
  const [currentWishIndex, setCurrentWishIndex] = useState(0);

  const nextWish = () => {
    setCurrentWishIndex(prev => 
      prev === selectedMember.wishes.length - 1 ? 0 : prev + 1
    );
  };

  const prevWish = () => {
    setCurrentWishIndex(prev => 
      prev === 0 ? selectedMember.wishes.length - 1 : prev - 1
    );
  };

  const selectMember = (member) => {
    setSelectedMember(member);
    setCurrentWishIndex(0);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const profileVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 p-4 md:p-8 w-screen overflow-x-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center text-sm font-medium text-gray-700 hover:text-pink-600 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Home
            </motion.button>
          </Link>
        </motion.div>

        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            Messages From Your Loved Ones
          </h1>
          <p className="text-gray-600">Scroll through heartfelt messages from your closest friends</p>
        </motion.div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Member Selector Sidebar */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="lg:w-1/4"
          >
            <motion.div 
              variants={itemVariants}
              className="bg-white rounded-xl shadow-md p-4 sticky top-4"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Family & Friends</h2>
              <div className="space-y-3">
                {members.map((member) => (
                  <motion.div
                    key={member.id}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-3 rounded-lg cursor-pointer transition-all ${selectedMember.id === member.id ? 'bg-pink-100 border-l-4 border-pink-500' : 'hover:bg-gray-50'}`}
                    onClick={() => selectMember(member)}
                  >
                    <div className="flex items-center">
                      <motion.img 
                        src={member.profileImg} 
                        alt={member.name} 
                        className="w-12 h-12 rounded-full object-cover mr-3"
                        whileHover={{ rotate: 5, scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      />
                      <div>
                        <h3 className="font-medium text-gray-800">{member.name}</h3>
                        <p className="text-sm text-gray-600">{member.role}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Member Profile */}
          <motion.div
            key={selectedMember.id}
            initial="hidden"
            animate="visible"
            variants={profileVariants}
            className="lg:w-3/4"
          >
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="md:flex">
                {/* Profile Image */}
                <div className="md:w-1/2 relative">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="h-64 md:h-full w-full bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center"
                  >
                    <motion.img
                      src={selectedMember.profileImg}
                      alt={selectedMember.name}
                      className="w-64 h-64 md:w-80 md:h-80 rounded-full object-cover border-8 border-white shadow-lg"
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      transition={{ 
                        type: "spring",
                        stiffness: 260,
                        damping: 20
                      }}
                    />
                  </motion.div>
                  
                  {/* Floating hearts decoration */}
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute text-pink-400 opacity-70"
                      style={{
                        top: `${Math.random() * 60 + 10}%`,
                        left: `${Math.random() * 80 + 10}%`,
                        fontSize: `${Math.random() * 20 + 10}px`
                      }}
                      animate={{
                        y: [0, -20, 0],
                        opacity: [0.7, 1, 0.7],
                        rotate: [0, Math.random() * 360]
                      }}
                      transition={{
                        duration: Math.random() * 5 + 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      ❤️
                    </motion.div>
                  ))}
                </div>

                {/* Profile Content */}
                <div className="p-6 md:w-1/2">
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="flex items-center mb-4">
                      <h2 className="text-2xl font-bold text-gray-800 mr-3">{selectedMember.name}</h2>
                      <motion.span 
                        className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm font-medium"
                        whileHover={{ scale: 1.05 }}
                      >
                        {selectedMember.role}
                      </motion.span>
                    </div>
                    
                    <div className="mb-6">
                      <p className="text-gray-700 mb-4">{selectedMember.bio}</p>
                      <motion.div 
                        className="bg-pink-50 rounded-lg p-3 border border-pink-100"
                        whileHover={{ scale: 1.01 }}
                      >
                        <p className="text-sm text-pink-700 font-medium">Fun Fact:</p>
                        <p className="text-pink-600">{selectedMember.funFact}</p>
                      </motion.div>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="text-lg font-semibold text-gray-800">Messages for You</h3>
                        {selectedMember.wishes.length > 1 && (
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-500">
                              {currentWishIndex + 1} of {selectedMember.wishes.length}
                            </span>
                            <div className="flex space-x-1">
                              <motion.button
                                onClick={prevWish}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="text-gray-500 hover:text-pink-600 p-1"
                                aria-label="Previous message"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              </motion.button>
                              <motion.button
                                onClick={nextWish}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="text-gray-500 hover:text-pink-600 p-1"
                                aria-label="Next message"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                </svg>
                              </motion.button>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <motion.div 
                        key={currentWishIndex}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-pink-50 rounded-lg p-4 mb-4 shadow-inner"
                      >
                        <p className="text-gray-700 text-lg italic">"{selectedMember.wishes[currentWishIndex]}"</p>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MembersPage;