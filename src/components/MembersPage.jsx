import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const MembersPage = () => {
  const members = [
    {
      id: 1,
      name: 'Hari',
      email: 'jagadishkamil.141@gmail.com',
      role: 'Best Friend',
      profileImg: './images/members/hari.jpeg',
      Img: './images/members/hari.jpeg',
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
      Img: './images/members/hari.jpeg',
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
      Img: './images/members/hari.jpeg',
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
      Img: './images/members/hari.jpeg',
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
      profileImg: './images/members/durga.jpg',
      Img: './images/members/revaAndDurga.jpg',
      bio: 'Hey my gurl!!U deserve for best things in this world da.. the gurl with strong mindset and kind hearted one.. who can do anything for her loved ones and the pure soul who always keeps her circle engaged and happiee',
      wishes: [
        'Hold ur smile always da..Everything will be fine soon and hope for best da.. u really surrounded by the gud souls in ur life so plzz hold them tight and go forward confidently:) will be there with u always da... Love u always my gurl... Always ennudaya avall💯🫂'
      ],
      funFact: 'All the time and place where we all together is the most funniest one..I love to be with u always gurl... Anywhere with u sounds like hahahahaha!'
    },
    {
      id: 6,
      name: 'Tharun',
      email: 'tharun@example.com',
      role: 'Best Friend',
      profileImg: './images/members/tharun.jpg',
      Img: './images/members/tharunAndReva.jpg',
      bio: 'She is a very caring person,she made me more mature and the only person who stood up with me for the past 7 years',
      wishes: [
       " Everything will be alright soon, hold ur smile and always be happy"
      ],
      funFact: "Food can change her mood in seconds it's her superpower."
    },
    {
      id: 7,
      name: 'Dinesh',
      email: 'dinesh@example.com',
      role: 'Bro',
      profileImg: './images/members/dinesh.jpg',
      Img: './images/members/dineshAndReva.jpg',
      bio: "Dear Sister, No matter where life takes us, you'll always be my first best friend and forever strength. You've been my constant in every storm, my biggest cheerleader, and the one who knows me better than I know myself.I may not say it every day, but I’m truly blessed to have you in my life. Thank you for the love, laughter, and endless support. I’ll always be here for you, just like you’ve always been for me.Love you more than words can express.❤‍",
      wishes: [
        'Happy birthday',
        
      ],
      funFact: 'My sister is truly one of a kind — if she wants something, she wants it right now, no matter what time it is 😅. She always says ‘No more junk food’ but ends up eating it again the next day 😂. I really miss those days when we were at home… disturbing her while she was on calls or doing some work was my favorite part 😜. Life feels incomplete without those silly moments. Love you always, my drama queen ❤'
    }
  ];

  const [selectedMember, setSelectedMember] = useState(members[0]);
  const [currentWishIndex, setCurrentWishIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
    if (isMobile && profileRef.current) {
      profileRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
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
        duration: 0.5,
        ease: "backOut"
      }
    }
  };

  const profileVariants = {
    hidden: { opacity: 0, x: isMobile ? 0 : 50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const wishVariants = {
    enter: { opacity: 0, y: 20 },
    center: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 p-4 md:p-8 w-screen overflow-x-hidden">
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
          className="text-center mb-8 md:mb-12"
        >
          <h1 className="text-3xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
            Messages From Your Loved Ones
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">Scroll through heartfelt birthday wishes from your closest friends and family</p>
        </motion.div>

        {/* Main Content */}
        <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} gap-6 md:gap-8`}>
          {/* Member Selector Sidebar - Always first in mobile */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className={`${isMobile ? 'order-1 mb-6' : 'lg:w-1/3 xl:w-1/4'}`}
          >
            <motion.div 
              variants={itemVariants}
              className={`bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 ${!isMobile && 'sticky top-4'}`}
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="mr-2">👋</span> Family & Friends
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-1 gap-3">
                {members.map((member) => (
                  <motion.div
                    key={member.id}
                    variants={itemVariants}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-3 rounded-xl cursor-pointer transition-all ${
                      selectedMember.id === member.id 
                        ? 'bg-gradient-to-r from-pink-100 to-purple-100 border-l-4 border-pink-500 shadow-md' 
                        : 'bg-white hover:bg-gray-50 shadow-sm'
                    }`}
                    onClick={() => selectMember(member)}
                  >
                    <div className="flex items-center">
                      <motion.div 
                        className="relative"
                        whileHover={{ rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <img 
                          src={member.profileImg} 
                          alt={member.name} 
                          className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover mr-3 border-2 border-white shadow"
                        />
                        <div className={`absolute bottom-0 right-2 w-3 h-3 rounded-full border-2 border-white ${
                          selectedMember.id === member.id ? 'bg-green-500' : 'bg-gray-300'
                        }`}></div>
                      </motion.div>
                      <div>
                        <h3 className="font-medium text-gray-800">{member.name}</h3>
                        <p className="text-xs text-gray-500">{member.role}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Member Profile - Always second in mobile */}
          <motion.div
            key={selectedMember.id}
            initial="hidden"
            animate="visible"
            variants={profileVariants}
            className={`${isMobile ? 'order-2' : 'lg:w-2/3 xl:w-3/4'}`}
            ref={profileRef}
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden">
              <div className="md:flex">
                {/* Profile Image */}
                <div className="md:w-1/2 relative overflow-hidden">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="h-64 md:h-full w-full bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 flex items-center justify-center relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent z-10"></div>
                    <motion.img
                      src={selectedMember.Img}
                      alt={selectedMember.name}
                      className="w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 rounded-full object-cover border-4 md:border-8 border-white shadow-xl z-20 relative"
                      initial={{ scale: 0.9, rotate: -5 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ 
                        type: "spring",
                        stiffness: 260,
                        damping: 20
                      }}
                    />
                    
                    {/* Floating decoration elements */}
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute text-pink-400 opacity-70 z-0"
                        style={{
                          top: `${Math.random() * 80}%`,
                          left: `${Math.random() * 90}%`,
                          fontSize: `${Math.random() * 20 + 10}px`,
                          rotate: Math.random() * 360
                        }}
                        animate={{
                          y: [0, -15 - Math.random() * 30, 0],
                          opacity: [0.5, 0.9, 0.5],
                          rotate: [0, Math.random() * 360]
                        }}
                        transition={{
                          duration: Math.random() * 8 + 5,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        {['❤️', '🎉', '🎂', '✨', '🥳', '🎁', '🌟', '💝'][i % 8]}
                      </motion.div>
                    ))}
                  </motion.div>
                </div>

                {/* Profile Content */}
                <div className="p-6 md:w-1/2">
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="flex flex-wrap items-center mb-4 gap-2">
                      <h2 className="text-2xl md:text-3xl font-bold text-gray-800">{selectedMember.name}</h2>
                      <motion.span 
                        className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-3 py-1 rounded-full text-xs md:text-sm font-medium shadow-sm"
                        whileHover={{ scale: 1.05 }}
                      >
                        {selectedMember.role}
                      </motion.span>
                    </div>
                    
                    <div className="mb-6">
                      <p className="text-gray-700 mb-4 leading-relaxed">{selectedMember.bio}</p>
                      <motion.div 
                        className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-4 border border-pink-100 shadow-inner"
                        whileHover={{ scale: 1.01 }}
                      >
                        <p className="text-sm text-pink-700 font-medium flex items-center">
                          <span className="mr-2">✨</span> Fun Fact
                        </p>
                        <p className="text-pink-600 mt-1">{selectedMember.funFact}</p>
                      </motion.div>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg md:text-xl font-semibold text-gray-800 flex items-center">
                          <span className="mr-2">💌</span> Message to You
                        </h3>
                        {selectedMember.wishes.length > 1 && (
                          <div className="flex items-center space-x-2">
                            <span className="text-xs md:text-sm text-gray-500">
                              {currentWishIndex + 1}/{selectedMember.wishes.length}
                            </span>
                            <div className="flex space-x-1">
                              <motion.button
                                onClick={prevWish}
                                whileHover={{ scale: 1.1, backgroundColor: '#f3f4f6' }}
                                whileTap={{ scale: 0.9 }}
                                className="text-gray-500 hover:text-pink-600 p-1 rounded-full bg-gray-100"
                                aria-label="Previous message"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              </motion.button>
                              <motion.button
                                onClick={nextWish}
                                whileHover={{ scale: 1.1, backgroundColor: '#f3f4f6' }}
                                whileTap={{ scale: 0.9 }}
                                className="text-gray-500 hover:text-pink-600 p-1 rounded-full bg-gray-100"
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
                      
                      <div className="relative h-32 md:h-40">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={currentWishIndex}
                            variants={wishVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.4 }}
                            className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-4 md:p-5 shadow-inner absolute inset-0"
                          >
                            <p className="text-gray-700 text-lg italic">"{selectedMember.wishes[currentWishIndex]}"</p>
                            <div className="absolute bottom-4 right-4 text-2xl text-pink-300">
                              ❤️
                            </div>
                          </motion.div>
                        </AnimatePresence>
                      </div>
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