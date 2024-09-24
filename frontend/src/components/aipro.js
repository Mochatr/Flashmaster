import { useState, useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
} from '@mui/material';

export default function Generate() {
  const [text, setText] = useState('');
  const [flashcards, setFlashcards] = useState([]);
  const [userId, setUserId] = useState('');
/*   const [decks, setDecks] = useState([]); */
  const navigate = useNavigate();
  const fetchUserData = async () => {
    const response = await fetch('http://localhost:5000/api/user', {
      method: 'GET',
      credentials: 'include',
    });
    if (response.status === 401) {
      // If the user is not authenticated, redirect to login
      navigate('/Authenticate');
      return;
    }
    const data = await response.json();
    setUserId(data._id); 
  };

  const fetchDecks = async () => {
    const response = await fetch(`http://localhost:5000/api/aidecks/${userId}`,
      { method: 'GET', credentials: 'include' }
    );
    const data = await response.json();
 /*    setDecks(data); */
  };

  useEffect(() => {
    fetchUserData();
    if (userId) fetchDecks();
  }, [userId]);

  const handleFlip = (index) => {
    const allFlashcards = [...flashcards];
    allFlashcards[index].flip = !allFlashcards[index].flip;
    setFlashcards(allFlashcards);
  };

  const handleSubmit = async () => {
    if (!text.trim()) {
      alert('Please enter some text to generate flashcards.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ text, userId }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate flashcards');
      }

      const data = await response.json();
      setFlashcards(data);
      setText('');
    } catch (error) {
      console.error('Error generating flashcards:', error);
      alert('An error occurred while generating flashcards. Please try again.');
    }
  };
  const handleHomeClick = () => {
    navigate('/dashboard');
  };
  return (
    <>
      <nav className="dashboard-navbar">
        <div className="nav-left" onClick={handleHomeClick} style={{ cursor: 'pointer' }}>FlashMaster</div>
      </nav>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        {/* Form Section */}
        <Box sx={{ bgcolor: '#f5f5f5', p: 3, borderRadius: 2, boxShadow: 2 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Generate Flashcards
          </Typography>
          <TextField
            value={text}
            onChange={(e) => setText(e.target.value)}
            label="Enter text"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            fullWidth
            sx={{ py: 1.5 }}
          >
            Generate Flashcards
          </Button>
        </Box>

        {/* Flashcards Section */}
        {flashcards.length > 0 && (
          <Box sx={{ mt: 6 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              Generated Flashcards
            </Typography>
            <Grid container spacing={3}>
              {flashcards.map((flashcard, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card
                    sx={{
                      boxShadow: 3,
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.05)',
                      },
                    }}
                  >
                    <CardContent sx={{ p: 2 }}>
                      {flashcard.flip ? (
                        <>
                          <Typography
                            variant="h6"
                            color="primary"
                            sx={{ mb: 1 }}
                          >
                            Answer:
                          </Typography>
                          <Typography variant="body1">
                            {flashcard.back}
                          </Typography>
                        </>
                      ) : (
                        <>
                          <Typography
                            variant="h6"
                            color="primary"
                            sx={{ mb: 1 }}
                          >
                            Question:
                          </Typography>
                          <Typography variant="body1">
                            {flashcard.front}
                          </Typography>
                        </>
                      )}
                    </CardContent>
                    <CardActions>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => handleFlip(index)}
                        sx={{ mx: 'auto', mb: 2 }}
                      >
                        Flip Card
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Container>
    </>
  );
}
