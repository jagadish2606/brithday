import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const BirthdayWish = () => {
  // State for countdown
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // State for audio player
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(new Audio('https://www.free-stock-music.com/music/upbeat-happy-ukulele-background-music.mp3'));

  // Handle audio play/pause
  const toggleAudio = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Clean up audio on component unmount
  useEffect(() => {
    return () => {
      audio.pause();
    };
  }, [audio]);

  // Calculate countdown to next birthday or event
  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetDate = new Date('2024-12-31T00:00:00');
      const now = new Date();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft();
    return () => clearInterval(timer);
  }, []);

  const photoCards = [
    {
      id: 1,
      title: 'Beautiful Smile',
      imageUrl: './images/reva.jpeg',
      slogan: 'Your smile brightens every day',
      poem: 'A smile so pure, a heart so true,\nLike morning sun and sparkling dew.\nMay happiness follow wherever you go,\nAnd your inner light forever glow.'
    },
    {
      id: 2,
      title: 'Adventurous Spirit',
      imageUrl: './images/reva.jpeg',
      slogan: 'Life is an adventure with you',
      poem: 'Through every path you boldly tread,\nWith courage strong and dreams widespread.\nMay your journey be wild and free,\nFilled with joy and destiny.'
    },
    {
      id: 3,
      title: 'Kind Heart',
      imageUrl: './images/reva.jpeg',
      slogan: 'Your kindness touches every soul',
      poem: 'A heart so warm, so kind, so bright,\nShining like stars in darkest night.\nYour gentle ways, your caring touch,\nMean more to us than words can clutch.'
    },
    {
      id: 4,
      title: 'Creative Soul',
      imageUrl: './images/reva.jpeg',
      slogan: 'Your creativity inspires us all',
      poem: 'With colors bold and visions clear,\nYou paint the world we hold so dear.\nMay inspiration always flow,\nAnd your artistic spirit grow.'
    },
    {
      id: 5,
      title: 'Loving Friend',
      imageUrl: './images/reva1.jpeg',
      slogan: 'A friend like no other',
      poem: 'Through laughter shared and tears we\'ve known,\nA friendship beautifully grown.\nTreasure these bonds that time can\'t sever,\nHappy birthday, dear friend forever.'
    },
    {
      id: 6,
      title: 'Radiant Beauty',
      imageUrl: './images/reva3.jpeg',
      slogan: 'Your beauty shines inside and out',
      poem: 'Not just in face so fair to see,\nBut in the soul you let us be.\nA light that guides, a heart so true,\nThe world is brighter thanks to you.'
    },
    {
      id: 7,
      title: 'Dream Chaser',
      imageUrl: './images/reva1.jpeg',
      slogan: 'Keep chasing your dreams',
      poem: 'With every step, with every flight,\nYou reach for stars, you seek the light.\nMay all your dreams take shape and form,\nLike sunshine bright after the storm.'
    }
  ];

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        type: 'spring',
        stiffness: 100
      }
    }
  };

  const floating = {
    animate: {
      y: [0, -15, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut'
      }
    }
  };

  const pulse = {
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut'
      }
    }
  };

  const bounce = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        repeatType: 'loop',
        ease: "easeOut"
      }
    }
  };

  // Confetti effect
  const Confetti = () => {
    return (
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-50">
        {[...Array(100)].map((_, i) => (
          <motion.div 
            key={i} 
            className="absolute w-2 h-2 rounded-full" 
            style={{
              backgroundColor: ['#f87171', '#60a5fa', '#fbbf24', '#a78bfa', '#34d399', '#f472b6'][Math.floor(Math.random() * 6)],
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }} 
            initial={{ y: -100, opacity: 1 }} 
            animate={{
              y: [0, window.innerHeight],
              x: [0, Math.random() * 200 - 100],
              rotate: [0, Math.random() * 360],
              opacity: [1, 0]
            }} 
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              repeatDelay: Math.random() * 5,
              ease: 'linear'
            }} 
          />
        ))}
      </div>
    );
  };

  // State for confetti
  const [showConfetti, setShowConfetti] = useState(false);
  const [showHearts, setShowHearts] = useState(false);

  // Floating hearts effect
  const Hearts = () => {
    return (
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-40">
        {[...Array(30)].map((_, i) => (
          <motion.div 
            key={i} 
            className="absolute text-2xl" 
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              color: ['#f87171', '#f472b6', '#ec4899'][Math.floor(Math.random() * 3)]
            }} 
            initial={{ y: -100, opacity: 0 }} 
            animate={{
              y: [0, window.innerHeight],
              x: [0, Math.random() * 100 - 50],
              opacity: [1, 0],
              scale: [0.5, 1.2, 0.8]
            }} 
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              repeatDelay: Math.random() * 10,
              ease: 'linear'
            }} 
          >
            ❤️
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <div className="relative min-h-screen w-screen overflow-x-hidden">
      {/* Special Effects */}
      {showConfetti && <Confetti />}
      {showHearts && <Hearts />}

      {/* Birthday-themed Animated Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-50/80 via-purple-50/80 to-yellow-50/80"></div>
        <motion.div 
          className="absolute top-0 left-0 w-full h-full" 
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
            backgroundSize: ['120% 120%', '150% 150%']
          }} 
          transition={{
            duration: 30,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'linear'
          }} 
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,200,200,0.3) 1px, transparent 1px), radial-gradient(circle at 75% 75%, rgba(200,255,200,0.3) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }} 
        />
      </div>

      {/* Birthday Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }} 
        className="mb-8 sm:mb-12 px-4 sm:px-6 pt-6"
      >
        <div className="flex flex-col items-center sm:flex-row sm:justify-between gap-4 mb-4">
          <motion.div 
            variants={pulse} 
            animate="animate" 
            className="text-center sm:text-left w-full sm:w-auto"
          >
            <h1 className="text-3xl sm:text-5xl font-bold mb-2 sm:mb-4 bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-500 bg-clip-text text-transparent">
              Happy Birthday Revathi! 🎉
            </h1>
          </motion.div>

          {/* Right-aligned buttons */}
          <div className="flex gap-3 justify-center sm:justify-end w-full sm:w-auto">
            {/* <motion.button 
              whileHover={{ scale: 1.1 }} 
              whileTap={{ scale: 0.9 }} 
              className={`p-3 rounded-full shadow-lg flex items-center justify-center ${isPlaying ? 'bg-gradient-to-r from-pink-600 to-purple-600' : 'bg-gradient-to-r from-pink-500 to-purple-500'} text-white`}
              onClick={toggleAudio}
            >
              {isPlaying ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m2.828-9.9a9 9 0 012.728-2.728" />
                </svg>
              )}
            </motion.button> */}

            
          </div>
        </div>

        <p className="text-base sm:text-xl text-gray-600 mb-4 sm:mb-6 mx-auto max-w-3xl text-center">
          Wishing you a day filled with love, laughter, and wonderful memories 💖
        </p>
        
        <div className="flex justify-center gap-4">
          <motion.div 
            whileHover={{ scale: 1.1 }} 
            whileTap={{ scale: 0.9 }} 
            className="inline-block" 
            onClick={() => setShowConfetti(!showConfetti)}
          >
            <div className="px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-full shadow-lg inline-flex items-center text-sm sm:text-base">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 mr-1 sm:mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {showConfetti ? 'Stop Confetti' : 'Start Confetti!'}
            </div>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.1 }} 
            whileTap={{ scale: 0.9 }} 
            className="inline-block" 
            onClick={() => setShowHearts(!showHearts)}
          >
            <div className="px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-red-400 to-pink-400 text-white rounded-full shadow-lg inline-flex items-center text-sm sm:text-base">
              ❤️ {showHearts ? 'Hide Hearts' : 'Show Hearts!'}
            </div>
          </motion.div>
          <Link to="/members">
              <motion.button 
                whileHover={{ scale: 1.1 }} 
                whileTap={{ scale: 0.9 }} 
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-full shadow-lg flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v1h8v-1zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-1a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v1h-3zM4.75 12.094A5.973 5.973 0 004 15v1H1v-1a3 3 0 013.75-2.906z" />
                </svg>
              </motion.button>
            </Link>
        </div>
      </motion.div>

      {/* Birthday Photo Grid */}
      <motion.div 
        variants={container} 
        initial="hidden" 
        animate="show" 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 px-4 sm:px-6 w-full"
      >
        {photoCards.map((card) => (
          <motion.div 
            key={card.id} 
            variants={item} 
            className="bg-white rounded-xl sm:rounded-2xl shadow-md sm:shadow-xl overflow-hidden hover:shadow-lg sm:hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 sm:hover:-translate-y-2 group h-full flex flex-col"
            whileHover={{ scale: 1.02 }}
          >
            <div className="h-48 sm:h-64 overflow-hidden relative">
              <img src={card.imageUrl} alt={card.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-4 sm:p-6">
                <h3 className="text-white font-bold text-lg sm:text-xl mb-1 sm:mb-2">{card.title}</h3>
                <p className="text-white/90 font-medium text-sm sm:text-base">{card.slogan}</p>
              </div>
            </div>
            <div className="p-4 sm:p-6 flex-grow flex flex-col">
              <div className="mb-3 sm:mb-4 flex-grow">
                <h3 className="font-bold text-lg sm:text-xl text-gray-800 mb-1 sm:mb-2">{card.slogan}</h3>
                <p className="text-gray-600 whitespace-pre-line text-sm sm:text-base">{card.poem}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Birthday Message */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ delay: 0.7 }} 
        className="mt-8 sm:mt-16 mb-6 sm:mb-8 px-4 sm:px-6"
      >
        <div className="bg-gradient-to-r from-pink-100 via-purple-100 to-yellow-100 p-4 sm:p-8 rounded-xl sm:rounded-3xl shadow-inner text-center">
          <motion.div 
            animate={{ rotate: [-5, 5, -5] }} 
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut'
            }} 
            className="inline-block mb-2 sm:mb-4"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 sm:h-16 w-10 sm:w-16 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
            </svg>
          </motion.div>
          <h3 className="text-xl sm:text-3xl font-bold text-gray-800 mb-3 sm:mb-6">A Special Message For You 💌</h3>
          <div className="max-w-4xl mx-auto px-4">
            <p className="text-sm sm:text-lg text-gray-700 mb-2 sm:mb-4">
              On your special day, we want you to know how much you mean to us. Your kindness, laughter, and beautiful spirit make the world a better place. ✨
            </p>
            <p className="text-sm sm:text-lg text-gray-700 mb-4 sm:mb-6">
              May this year bring you endless joy, success in all your endeavors, and dreams that turn into reality. You deserve all the happiness in the world! 🌈
            </p>
            <div className="flex justify-center gap-4">
              <motion.div 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }} 
                className="inline-block bg-gradient-to-r from-pink-400 to-purple-400 text-white px-4 sm:px-8 py-2 sm:py-3 rounded-full shadow-lg text-sm sm:text-lg font-medium"
                onClick={() => setShowConfetti(true)}
              >
                🎂 Make A Wish!
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }} 
                className="inline-block bg-gradient-to-r from-red-400 to-pink-400 text-white px-4 sm:px-8 py-2 sm:py-3 rounded-full shadow-lg text-sm sm:text-lg font-medium"
                onClick={() => setShowHearts(true)}
              >
                💖 Send Love!
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Birthday Countdown */}
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 1 }} 
        className="text-center py-4 sm:py-8 px-4 sm:px-6"
      >
        <h4 className="text-lg sm:text-xl font-semibold text-gray-700 mb-3 sm:mb-4">The Celebration Continues... 🎊</h4>
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
          {['Days', 'Hours', 'Minutes', 'Seconds'].map((unit) => (
            <motion.div 
              key={unit} 
              whileHover={{ scale: 1.1 }} 
              className="bg-white p-2 sm:p-4 rounded-lg sm:rounded-xl shadow-sm sm:shadow-md w-16 sm:w-24"
            >
              <div className="text-xl sm:text-3xl font-bold text-pink-500 mb-1">
                {timeLeft[unit.toLowerCase()]}
              </div>
              <div className="text-xs sm:text-sm text-gray-600">{unit}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Floating Birthday Cake */}
      <motion.div 
        className="fixed bottom-4 left-4 z-40" 
        animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }} 
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut'
        }} 
        onClick={() => {
          setShowConfetti(true);
          setShowHearts(true);
        }}
      >
        <div className="text-5xl cursor-pointer">🎂</div>
      </motion.div>

      {/* Audio Player Status */}
      {isPlaying && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-20 right-4 z-40 bg-white px-4 py-2 rounded-full shadow-md text-sm font-medium text-pink-600 flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 animate-pulse" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
          </svg>
          Birthday Song Playing
        </motion.div>
      )}
    </div>
  );
};

export default BirthdayWish;