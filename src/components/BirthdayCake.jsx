import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import birthdayGif from '../assets/gifs/bday-137.gif';
import Confetti from 'react-confetti';
import birthdaySong from '../assets/audio/hbsong.mp3';

const BirthdayFlashPage = () => {
  const navigate = useNavigate();
  const audioRef = useRef(null);
  const [started, setStarted] = useState(false);

  const startExperience = () => {
    if (audioRef.current) {
      audioRef.current.volume = 0.7;
      audioRef.current.play().then(() => {
        setStarted(true);
      }).catch((error) => {
        console.log('Autoplay error:', error);
      });
    } else {
      setStarted(true);
    }
  };

  useEffect(() => {
    if (!started) return;

    const timer = setTimeout(() => {
      navigate('/next-page');
    }, 29000); // 30 seconds

    return () => {
      clearTimeout(timer);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, [started, navigate]);

  return (
    <div style={styles.container}>
      {started && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={true}
          numberOfPieces={150}
          gravity={0.2}
        />
      )}

      {/* Audio Element */}
      <audio 
        ref={audioRef} 
        src={birthdaySong} 
        loop 
        preload="auto" 
      />

      {!started ? (
        <div style={styles.overlay}>
          <h2 style={styles.tapText}>🎉 Tap to Start the Celebration 🎉</h2>
          <button style={styles.startButton} onClick={startExperience}>
            Start
          </button>
        </div>
      ) : (
        <div style={styles.content}>
          <img 
            src={birthdayGif} 
            alt="Happy Birthday" 
            style={styles.gif}
          />
          <h1 style={styles.text}>Happy Birthday!</h1>
          <p style={styles.subtext}>Welcome to your special day!</p>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: '100vh',
    width: '100vw',
    backgroundColor: '#ffcce6',
    overflow: 'hidden',
    position: 'relative',
  },
  content: {
    textAlign: 'center',
    maxWidth: '90%',
    zIndex: 1,
  },
  gif: {
    width: '300px',
    height: '300px',
    objectFit: 'contain',
    borderRadius: '20px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
    border: '8px solid white',
  },
  text: {
    marginTop: '30px',
    color: '#e91e63',
    fontSize: '3.5rem',
    fontFamily: '"Dancing Script", cursive, sans-serif',
    textShadow: '3px 3px 6px rgba(0, 0, 0, 0.3)',
    fontWeight: '700',
  },
  subtext: {
    color: '#ad1457',
    fontSize: '1.8rem',
    fontFamily: '"Dancing Script", cursive, sans-serif',
    marginTop: '20px',
    fontWeight: '600',
  },
  overlay: {
    textAlign: 'center',
    zIndex: 2,
    backgroundColor: '#ffffffcc',
    padding: '30px',
    borderRadius: '20px',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
  },
  tapText: {
    fontSize: '1.8rem',
    fontWeight: '600',
    marginBottom: '20px',
    color: '#d81b60',
  },
  startButton: {
    background: 'linear-gradient(to right, #ec407a, #ab47bc)',
    color: 'white',
    border: 'none',
    padding: '14px 28px',
    fontSize: '1.2rem',
    borderRadius: '30px',
    cursor: 'pointer',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)',
  }
};

export default BirthdayFlashPage;
