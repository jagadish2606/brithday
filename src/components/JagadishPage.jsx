import React, { useState, useRef, useEffect } from 'react';
import loveSong from '../assets/audio/my_song2.mp3';
import emotional from '../assets/audio/my_song.mp3';

const LoveHistory = () => {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showMusicModal, setShowMusicModal] = useState(false);
  const [showSongTitle, setShowSongTitle] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeCard, setActiveCard] = useState(0);
  const containerRef = useRef(null);
  const audioRef = useRef(null);

  const songs = [
    {
      id: 1,
      title: "Emotional Song",
      url: emotional,
      type: "feelings"
    },
    {
      id: 2,
      title: "Love Song",
      url: loveSong,
      type: "love"
    },
  ];

  // Check for mobile view and handle scroll
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setActiveCard(0);
    };
    
    const handleScroll = () => {
      if (!isMobile || !containerRef.current) return;
      
      const container = containerRef.current;
      const scrollPosition = container.scrollTop + container.clientHeight / 2;
      const cards = Array.from(container.children);
      
      cards.forEach((card, index) => {
        const cardTop = card.offsetTop;
        const cardHeight = card.clientHeight;
        
        if (scrollPosition > cardTop && scrollPosition < cardTop + cardHeight) {
          setActiveCard(index);
        }
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    
    if (containerRef.current) {
      containerRef.current.addEventListener('scroll', handleScroll);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current) {
        containerRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, [isMobile]);

  const playSong = (song) => {
    setCurrentSong(song);
    setIsPlaying(true);
    setShowSongTitle(true);
    
    setTimeout(() => {
      setShowSongTitle(false);
    }, 3000);

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = song.url;
      audioRef.current.load();
      audioRef.current.play().catch(e => console.log("Audio play error:", e));
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.log("Audio play error:", e));
    }
    setIsPlaying(!isPlaying);
    setShowSongTitle(true);
    setTimeout(() => setShowSongTitle(false), 3000);
  };

  const stopSong = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setCurrentSong(null);
    setShowSongTitle(false);
  };

  const handleMusicIconClick = () => {
    setShowMusicModal(!showMusicModal);
    if (!currentSong && !showMusicModal) {
      playSong(songs[0]);
    }
  };

  // Auto-play the first song when component mounts
  useEffect(() => {
    if (!currentSong) {
      playSong(songs[0]);
    }
  }, []);

  // Scroll to active card on mobile
  useEffect(() => {
    if (isMobile && containerRef.current) {
      const container = containerRef.current;
      const activeElement = container.children[activeCard];
      if (activeElement) {
        container.scrollTo({
          top: activeElement.offsetTop - 20,
          behavior: 'smooth'
        });
      }
    }
  }, [activeCard, isMobile]);

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#fff1f2',
        padding: isMobile ? '0' : '2rem',
        fontFamily: "'La Belle Aurore', cursive",
        color: '#4b2e2e',
        overflow: isMobile ? 'hidden' : 'visible',
        width: '100vw',        // Add this line (equivalent to w-screen)
        overflowX: 'hidden', 
      }}
    >
      {/* Floating Music Player with enhanced tooltip */}
      <div
        style={{
          position: 'fixed',
          bottom: '20px',
          right: isMobile ? '15px' : '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          zIndex: 100,
        }}
      >
        {showSongTitle && currentSong && (
          <div
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              padding: '8px 15px',
              borderRadius: '20px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              fontSize: isMobile ? '12px' : '14px',
              color: '#db2777',
              fontWeight: 'bold',
              animation: 'fadeIn 0.5s',
              maxWidth: isMobile ? '150px' : 'none',
            }}
          >
            Now Playing: {currentSong.title}
          </div>
        )}
        
        <div
          style={{
            position: 'relative',
            backgroundColor: '#ff85a2',
            borderRadius: '50%',
            width: isMobile ? '50px' : '60px',
            height: isMobile ? '50px' : '60px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
            cursor: 'pointer',
            transition: 'all 0.3s',
            ':hover': {
              transform: 'scale(1.1)',
              backgroundColor: '#ff6b8b'
            }
          }}
          onClick={handleMusicIconClick}
          onMouseEnter={() => setShowSongTitle(true)}
          onMouseLeave={() => setTimeout(() => setShowSongTitle(false), 1000)}
        >
          <span style={{ fontSize: isMobile ? '20px' : '24px' }}>🎵</span>
          
          {/* Enhanced Tooltip */}
          <div
            style={{
              position: 'absolute',
              bottom: '100%',
              right: '50%',
              transform: 'translateX(50%)',
              backgroundColor: 'rgba(0,0,0,0.8)',
              color: 'white',
              padding: '8px 12px',
              borderRadius: '8px',
              fontSize: '14px',
              whiteSpace: 'nowrap',
              marginBottom: '12px',
              opacity: showSongTitle ? 1 : 0,
              visibility: showSongTitle ? 'visible' : 'hidden',
              transition: 'all 0.3s ease',
              pointerEvents: 'none',
              zIndex: 101,
              '::after': {
                content: '""',
                position: 'absolute',
                top: '100%',
                left: '50%',
                marginLeft: '-5px',
                borderWidth: '5px',
                borderStyle: 'solid',
                borderColor: 'rgba(0,0,0,0.8) transparent transparent transparent'
              }
            }}
          >
            {currentSong ? 'Change background music' : 'Set background music'}
          </div>
        </div>
      </div>

      {/* Music Modal */}
      {showMusicModal && (
        <div
          style={{
            position: 'fixed',
            bottom: isMobile ? '80px' : '90px',
            right: isMobile ? '15px' : '20px',
            backgroundColor: '#fff',
            borderRadius: '1rem',
            padding: '1rem',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
            zIndex: 100,
            width: isMobile ? '90%' : '250px',
            maxWidth: '300px',
            background: 'linear-gradient(135deg, #fff5f7 0%, #ffeef2 100%)',
            border: '1px solid #ff85a2'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <h3 style={{ margin: 0, color: '#db2777', fontSize: isMobile ? '1.1rem' : '1.2rem' }}>Choose Song</h3>
            <span 
              style={{ cursor: 'pointer', fontSize: '20px', color: '#db2777' }}
              onClick={() => setShowMusicModal(false)}
            >
              &times;
            </span>
          </div>
          
          <div style={{ marginBottom: '15px' }}>
            {songs.map(song => (
              <div 
                key={song.id} 
                style={{ 
                  padding: '8px',
                  margin: '5px 0',
                  cursor: 'pointer',
                  backgroundColor: currentSong?.id === song.id ? '#fce7f3' : 'transparent',
                  borderRadius: '8px',
                  color: currentSong?.id === song.id ? '#db2777' : '#4b2e2e',
                  fontWeight: currentSong?.id === song.id ? 'bold' : 'normal',
                  transition: 'all 0.2s',
                  ':hover': {
                    backgroundColor: '#fce7f3'
                  }
                }}
                onClick={() => playSong(song)}
              >
                {song.title}
              </div>
            ))}
          </div>
          
          {currentSong && (
            <div style={{ 
              marginTop: '15px', 
              display: 'flex', 
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: '#fce7f3',
              padding: '10px',
              borderRadius: '8px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <button 
                  onClick={togglePlay}
                  style={{
                    backgroundColor: '#db2777',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: '30px',
                    height: '30px',
                    marginRight: '10px',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  {isPlaying ? '❚❚' : '▶'}
                </button>
                <span style={{ fontSize: isMobile ? '0.8rem' : '0.9rem' }}>{currentSong.title}</span>
              </div>
              <button 
                onClick={stopSong}
                style={{
                  backgroundColor: '#ff4757',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '4px 8px',
                  cursor: 'pointer',
                  fontSize: '0.8rem'
                }}
              >
                Stop
              </button>
            </div>
          )}
        </div>
      )}

      {/* Audio Element (hidden) */}
      <audio 
        ref={audioRef}
        src={currentSong?.url}
        loop 
        style={{ display: 'none' }}
      />

      {/* Mobile Navigation Dots */}
      {isMobile && (
        <div style={{
          position: 'fixed',
          bottom: '80px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '10px',
          zIndex: 99,
        }}>
          {[0, 1, 2, 3].map((index) => (
            <div
              key={index}
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: activeCard === index ? '#db2777' : '#ffb6c1',
                cursor: 'pointer',
                transition: 'all 0.3s',
              }}
              onClick={() => setActiveCard(index)}
            />
          ))}
        </div>
      )}

      {/* Main Content Container */}
      <div
        ref={containerRef}
        style={{
          display: isMobile ? 'block' : 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: isMobile ? '0' : '2rem',
          maxWidth: '1200px',
          margin: '0 auto',
          height: isMobile ? '100vh' : 'auto',
          overflowY: isMobile ? 'scroll' : 'visible',
          scrollSnapType: isMobile ? 'y mandatory' : 'none',
          scrollBehavior: 'smooth',
          padding: isMobile ? '0' : 'inherit',
        }}
      >
        {/* Images Card */}
        <div
          style={{
            backgroundColor: '#fff',
            borderRadius: isMobile ? '0' : '1.5rem',
            boxShadow: isMobile ? 'none' : '0 10px 25px rgba(0,0,0,0.1)',
            padding: isMobile ? '2rem 1.5rem' : '2rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            border: isMobile ? 'none' : '2px dashed #f9a8d4',
            background: 'linear-gradient(135deg, #fff9fb 0%, #fff5f7 100%)',
            height: isMobile ? '100vh' : 'auto',
            scrollSnapAlign: isMobile ? 'start' : 'none',
            position: 'relative',
          }}
        >
          <h1 style={{ 
            fontSize: isMobile ? '1.8rem' : '2rem', 
            textAlign: 'center', 
            color: '#be185d', 
            marginBottom: '1.5rem',
            textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
          }}>
            📸 Our Memories
          </h1>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '1rem',
              width: '100%',
            }}
          >
            {/* Actual images */}
            <div style={{
              height: isMobile ? '100px' : '120px',
              borderRadius: '0.8rem',
              overflow: 'hidden',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
            }}>
              <img 
                src={"/images/jaga@1.jpg"} 
                alt="Memory 1" 
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </div>
            <div style={{
              height: isMobile ? '100px' : '120px',
              borderRadius: '0.8rem',
              overflow: 'hidden',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
            }}>
              <img 
                src={"/images/jaga@5.jpg"}
                alt="Memory 2" 
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </div>
            <div style={{
              height: isMobile ? '100px' : '120px',
              borderRadius: '0.8rem',
              overflow: 'hidden',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
            }}>
              <img 
                src={"/images/jaga@3.jpg"} 
                alt="Memory 3" 
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </div>
            <div style={{
              backgroundColor: '#fce7f3',
              height: isMobile ? '100px' : '120px',
              borderRadius: '0.8rem',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '2rem',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
            }}>
              <img 
                src={"/images/jaga@4.jpg"} 
                alt="Memory 3" 
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </div>
            <div style={{
              height: isMobile ? '100px' : '120px',
              borderRadius: '0.8rem',
              overflow: 'hidden',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
            }}>
              <img 
                src={"/images/jaga@8.jpg"} 
                alt="Memory 1" 
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </div>
            <div style={{
              height: isMobile ? '100px' : '120px',
              borderRadius: '0.8rem',
              overflow: 'hidden',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
            }}>
              <img 
                src={"/images/jaga@6.jpg"}
                alt="Memory 2" 
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </div>
            <div style={{
              height: isMobile ? '100px' : '120px',
              borderRadius: '0.8rem',
              overflow: 'hidden',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
            }}>
              <img 
                src={"/images/jaga@7.jpg"} 
                alt="Memory 3" 
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </div>
            <div style={{
              height: isMobile ? '100px' : '120px',
              borderRadius: '0.8rem',
              overflow: 'hidden',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
            }}>
              <img 
                src={"/images/jaga@9.jpg"}
                alt="Memory 2" 
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </div>
            <div style={{
              height: isMobile ? '100px' : '120px',
              borderRadius: '0.8rem',
              overflow: 'hidden',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
            }}>
              <img 
                src={"/images/jaga@10.jpg"} 
                alt="Memory 3" 
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </div>
            <div style={{
              height: isMobile ? '100px' : '120px',
              borderRadius: '0.8rem',
              overflow: 'hidden',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
            }}>
              <img 
                src={"/images/jaga@11.jpg"} 
                alt="Memory 3" 
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </div>
          </div>
          <p style={{ 
            textAlign: 'center', 
            marginTop: '1.5rem', 
            fontSize: isMobile ? '1.1rem' : '1.2rem',
            color: '#9d174d'
          }}>
            Each picture holds a thousand memories of our love story
          </p>
          
          {isMobile && (
            <div style={{
              position: 'absolute',
              bottom: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
              animation: 'bounce 2s infinite'
            }}>
              <span style={{ fontSize: '2rem' }}>👇</span>
            </div>
          )}
        </div>

        {/* Love History Card */}
        <div
          style={{
            backgroundColor: '#fff',
            borderRadius: isMobile ? '0' : '1.5rem',
            boxShadow: isMobile ? 'none' : '0 10px 25px rgba(0,0,0,0.1)',
            padding: isMobile ? '2rem 1.5rem' : '2rem',
            lineHeight: '2.2rem',
            border: isMobile ? 'none' : '2px dashed #f9a8d4',
            background: 'linear-gradient(135deg, #fff9fb 0%, #fff5f7 100%)',
            height: isMobile ? '100vh' : 'auto',
            scrollSnapAlign: isMobile ? 'start' : 'none',
          }}
        >
          <h1 style={{ 
            fontSize: isMobile ? '1.8rem' : '2rem', 
            textAlign: 'center', 
            color: '#be185d',
            textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
          }}>
            💌 Our Love memories 💌
          </h1>
          <p style={{ fontSize: isMobile ? '1.1rem' : '1.3rem', marginTop: '1.5rem' }}>
            Revathi <br /><br />
            Unna ennaku romba romba pudikum ma... Na un kooda irundha neram la enakku unmayaana santhosham erukum.
            <br /><br />
            <strong style={{ color: '#db2777' }}>25/06/2024</strong> – Nee ennaku kudutha first surprise… andha naal en life la maraka mudiyadha moment.
            <br />
            <strong style={{ color: '#db2777' }}>04/07/2024</strong> – Na unnai propose pannadhu... mari yarkum propose pannadhu ella edhu aprm mu panna matta.
            <br /><br />
            Namma rendu perum neraya memories create pannom – movies, temples, fights, Beach, and more love.
            <br />
            Hospital la Ponum la nambha, bus la V2-ku pona memory, unakku dag kudutha naal and etc.. – ellame enakku romba pudikum.
            <br /><br />
            Na unakku kudutha promise(na un kudha kadhasevarikum erupa)-a kapatha mudiyala Revathi… aana naa ella na nee happy-aa irupa na adhu pothum..
            <br /><br />
            ennaku aprm un mela ennaku yadha kovammum ella, ne yadhu pannalum en naladhuku tha erukum I know.  I say with your memories di clm.
          </p>
          <p style={{ 
            textAlign: 'right', 
            fontSize: isMobile ? '1.3rem' : '1.5rem', 
            color: '#db2777', 
            marginTop: '2rem',
            fontWeight: 'bold'
          }}>
            – Un One Side Kadhalan, Jagadish 💕
          </p>
        </div>

        {/* Miss You Card */}
        <div
          style={{
            backgroundColor: '#fff',
            borderRadius: isMobile ? '0' : '1.5rem',
            boxShadow: isMobile ? 'none' : '0 10px 25px rgba(0,0,0,0.1)',
            padding: isMobile ? '2rem 1.5rem' : '2rem',
            display: 'flex',
            flexDirection: 'column',
            border: isMobile ? 'none' : '2px dashed #f9a8d4',
            background: 'linear-gradient(135deg, #fff9fb 0%, #fff5f7 100%)',
            height: isMobile ? '100vh' : 'auto',
            scrollSnapAlign: isMobile ? 'start' : 'none',
            justifyContent: 'center',
          }}
        >
          <h1 style={{ 
            fontSize: isMobile ? '1.8rem' : '2rem', 
            textAlign: 'center', 
            color: '#be185d', 
            marginBottom: '1.5rem',
            textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
          }}>
            💝 I Miss You Lot
          </h1>
          <p style={{ 
            fontSize: isMobile ? '1.1rem' : '1.3rem', 
            textAlign: 'center',
            color: '#831843'
          }}>
            Every moment without you feels incomplete. <br />
            Your smile, your voice, your presence - <br />
            I miss it all more than words can express. <br /><br />
            The days feel longer when we're apart, <br />
            But my love for you only grows stronger in my heart.
          </p>
          <div style={{ 
            textAlign: 'center', 
            marginTop: '1.5rem',
            animation: 'pulse 2s infinite'
          }}>
            <span style={{ fontSize: '3rem' }}>💌</span>
          </div>
        </div>

        {/* Love You Card */}
        <div
          style={{
            backgroundColor: '#fff',
            borderRadius: isMobile ? '0' : '1.5rem',
            boxShadow: isMobile ? 'none' : '0 10px 25px rgba(0,0,0,0.1)',
            padding: isMobile ? '2rem 1.5rem' : '2rem',
            display: 'flex',
            flexDirection: 'column',
            border: isMobile ? 'none' : '2px dashed #f9a8d4',
            background: 'linear-gradient(135deg, #fff9fb 0%, #fff5f7 100%)',
            height: isMobile ? '100vh' : 'auto',
            scrollSnapAlign: isMobile ? 'start' : 'none',
            justifyContent: 'center',
          }}
        >
          <h1 style={{ 
            fontSize: isMobile ? '1.8rem' : '2rem', 
            textAlign: 'center', 
            color: '#be185d', 
            marginBottom: '1.5rem',
            textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
          }}>
            ❤️ I Love You Lot
          </h1>
          <p style={{ 
            fontSize: isMobile ? '1.1rem' : '1.3rem', 
            textAlign: 'center',
            color: '#831843'
          }}>
            My love for you is beyond measure, <br />
            A never-ending, growing treasure. <br /><br />
            In your arms is where I belong, <br />
            With you is where I'm strong. <br /><br />
            Through every up and every down, <br />
            My love for you will never drown.<br />
            I will never forget our memories.
            I don't know what destiny has planned for us.... but I know one thing I can't unlove You and You will always have my heart...
          </p>
          <div style={{ 
            textAlign: 'center', 
            marginTop: '1.5rem',
            animation: 'heartbeat 1.5s infinite'
          }}>
            <span style={{ fontSize: '3rem' }}>💖</span>
          </div>
        </div>
      </div>

      {/* Global styles for animations */}
      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
          }
          @keyframes heartbeat {
            0% { transform: scale(1); }
            25% { transform: scale(1.1); }
            50% { transform: scale(1); }
            75% { transform: scale(1.1); }
            100% { transform: scale(1); }
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateX(20px); }
            to { opacity: 1; transform: translateX(0); }
          }
          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-20px); }
            60% { transform: translateY(-10px); }
          }
          
          /* Custom scrollbar for mobile */
          ::-webkit-scrollbar {
            width: 0px;
            background: transparent;
          }
        `}
      </style>
    </div>
  );
};

export default LoveHistory;