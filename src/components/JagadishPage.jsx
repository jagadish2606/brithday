import React, { useState, useRef } from 'react';
// import reva1 from './images/members/durga.jpg';
// import reva2 from './images/members/durga.jpg';
// import reva3 from './images/members/durga.jpg';
import loveSong from '../assets/audio/my_song2.mp3';
import emotional  from '../assets/audio/my_song.mp3';

const LoveHistory = () => {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showMusicModal, setShowMusicModal] = useState(false);
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
    // Add more songs as needed
  ];

  const playSong = (song) => {
    setCurrentSong(song);
    setIsPlaying(true);
    // When changing songs, we need to load the new source
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = song.url;
      audioRef.current.load();
      audioRef.current.play().catch(e => console.log("Audio play error:", e));
    }
    togglePlay();
  };

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.log("Audio play error:", e));
    }
    setIsPlaying(!isPlaying);
  };

  const stopSong = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setCurrentSong(null);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#fff1f2',
        padding: '2rem',
        fontFamily: "'La Belle Aurore', cursive",
        color: '#4b2e2e',
      }}
    >
      {/* Floating Music Player */}
      <div
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          backgroundColor: '#ff85a2',
          borderRadius: '50%',
          width: '60px',
          height: '60px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
          zIndex: 100,
          cursor: 'pointer',
          transition: 'transform 0.3s',
          ':hover': {
            transform: 'scale(1.1)'
          }
        }}
        onClick={() => setShowMusicModal(!showMusicModal)}
      >
        <span style={{ fontSize: '24px' }}>🎵</span>
      </div>

      {/* Music Modal */}
      {showMusicModal && (
        <div
          style={{
            position: 'fixed',
            bottom: '90px',
            right: '20px',
            backgroundColor: '#fff',
            borderRadius: '1rem',
            padding: '1rem',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
            zIndex: 100,
            width: '250px',
            background: 'linear-gradient(135deg, #fff5f7 0%, #ffeef2 100%)',
            border: '1px solid #ff85a2'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <h3 style={{ margin: 0, color: '#db2777' }}>Choose Song</h3>
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
                <span style={{ fontSize: '0.9rem' }}>{currentSong.title}</span>
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

      {/* Grid Layout - Reordered as requested */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {/* Images Card - Now first */}
        <div
          style={{
            backgroundColor: '#fff',
            borderRadius: '1.5rem',
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            border: '2px dashed #f9a8d4',
            background: 'linear-gradient(135deg, #fff9fb 0%, #fff5f7 100%)'
          }}
        >
          <h1 style={{ 
            fontSize: '2rem', 
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
              height: '120px',
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
              height: '120px',
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
              height: '120px',
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
              height: '120px',
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
              height: '120px',
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
              height: '120px',
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
              height: '120px',
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
              height: '120px',
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
              height: '120px',
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
              height: '120px',
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
            fontSize: '1.2rem',
            color: '#9d174d'
          }}>
            Each picture holds a thousand memories of our love story
          </p>
        </div>

        {/* Love History Card - Now second */}
        <div
          style={{
            backgroundColor: '#fff',
            borderRadius: '1.5rem',
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
            padding: '2rem',
            lineHeight: '2.2rem',
            border: '2px dashed #f9a8d4',
            background: 'linear-gradient(135deg, #fff9fb 0%, #fff5f7 100%)'
          }}
        >
          <h1 style={{ 
            fontSize: '2rem', 
            textAlign: 'center', 
            color: '#be185d',
            textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
          }}>
            💌 Our Love memories 💌
          </h1>
          <p style={{ fontSize: '1.3rem', marginTop: '1.5rem' }}>
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
            fontSize: '1.5rem', 
            color: '#db2777', 
            marginTop: '2rem',
            fontWeight: 'bold'
          }}>
            – Un One Side Kadhalan, Jagadish 💕
          </p>
        </div>

        {/* Miss You Card - Now third */}
        <div
          style={{
            backgroundColor: '#fff',
            borderRadius: '1.5rem',
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            border: '2px dashed #f9a8d4',
            background: 'linear-gradient(135deg, #fff9fb 0%, #fff5f7 100%)'
          }}
        >
          <h1 style={{ 
            fontSize: '2rem', 
            textAlign: 'center', 
            color: '#be185d', 
            marginBottom: '1.5rem',
            textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
          }}>
            💝 I Miss You Lot
          </h1>
          <p style={{ 
            fontSize: '1.3rem', 
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

        {/* Love You Card - Now fourth */}
        <div
          style={{
            backgroundColor: '#fff',
            borderRadius: '1.5rem',
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            border: '2px dashed #f9a8d4',
            background: 'linear-gradient(135deg, #fff9fb 0%, #fff5f7 100%)'
          }}
        >
          <h1 style={{ 
            fontSize: '2rem', 
            textAlign: 'center', 
            color: '#be185d', 
            marginBottom: '1.5rem',
            textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
          }}>
            ❤️ I Love You Lot
          </h1>
          <p style={{ 
            fontSize: '1.3rem', 
            textAlign: 'center',
            color: '#831843'
          }}>
            My love for you is beyond measure, <br />
            A never-ending, growing treasure. <br /><br />
            In your arms is where I belong, <br />
            With you is where I'm strong. <br /><br />
            Through every up and every down, <br />
            My love for you will never drown.<br />
            I will never for got our memories 
          I don't know what destiny have  planned for us.... but I konw one thing I can't unlove You and You eill alwayshave my heart...
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
        `}
      </style>
    </div>
  );
};

export default LoveHistory;