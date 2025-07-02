import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import birthdayGif from '../assets/gifs/bday-137.gif';
import Confetti from 'react-confetti';

const BirthdayFlashPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/next-page');
    }, 10000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={styles.container}>
      {/* Confetti Animation */}
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        recycle={true}
        numberOfPieces={150}
        gravity={0.2}
      />
      
      <div style={styles.content}>
        <img 
          src={birthdayGif} 
          alt="Happy Birthday" 
          style={styles.gif}
        />
        <h1 style={styles.text}>Happy Birthday!</h1>
        <p style={styles.subtext}>Welcome to your special day!</p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
    backgroundColor: '#ffcce6', // Lighter pink background
    overflow: 'hidden',
    position: 'relative',
  },
  content: {
    textAlign: 'center',
    maxWidth: '90%',
    zIndex: 1, // Ensure content appears above confetti
  },
  gif: {
    width: '400px', // Fixed width
    height: '400px', // Fixed height
    objectFit: 'contain', // Ensures GIF maintains aspect ratio
    borderRadius: '20px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
    border: '8px solid white',
  },
  text: {
    marginTop: '30px',
    color: '#e91e63', // Brighter pink color
    fontSize: '4rem',
    fontFamily: '"Dancing Script", cursive, sans-serif',
    textShadow: '3px 3px 6px rgba(0, 0, 0, 0.3)',
    fontWeight: '700',
  },
  subtext: {
    color: '#ad1457', // Darker pink
    fontSize: '2rem',
    fontFamily: '"Dancing Script", cursive, sans-serif',
    marginTop: '20px',
    fontWeight: '600',
  }
};

export default BirthdayFlashPage; 