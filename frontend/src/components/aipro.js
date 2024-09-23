import { useState, useEffect } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Grid,
  Card,
  CardContent,
} from '@mui/material';

export default function Generate() {
  const [text, setText] = useState('');
  const [flashcards, setFlashcards] = useState([]);
/*   const [setName, setSetName] = useState(''); */
  const [dialogOpen, setDialogOpen] = useState(false);
  const [userId, setUserId] = useState('');
  const [decks, setDecks] = useState([]);

  const fetchUserData = async () => {
    const response = await fetch('http://localhost:5000/api/user', {
      method: 'GET',
      credentials: 'include',
    });
    const data = await response.json();
    setUserId(data._id); 
  };

  const fetchDecks = async () => {
    const response = await fetch(`http://localhost:5000/api/aidecks/${userId}`,
      { method: 'GET', credentials: 'include' }
    );
    const data = await response.json();
    setDecks(data);
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

/*   const handleSaveDeck = async () => {
    console.log(
      'Saving deck:', { setName, flashcards, userId }
    )
    try {
      const response = await fetch('http://localhost:5000/api/saveDeck', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ setName, cards: flashcards, userId }),
      });

      if (!response.ok) {
        throw new Error('Failed to save deck');
      }

      setDialogOpen(false);
      fetchDecks(); // Reload decks after saving
    } catch (error) {
      console.error('Error saving deck:', error);
    }
  }; */

  const handleOpenDialog = () => setDialogOpen(true);
  const handleCloseDialog = () => setDialogOpen(false);

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
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
        <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth>
          Generate Flashcards
        </Button>
      </Box>

      {flashcards.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            Generated Flashcards
          </Typography>
          <Grid container spacing={2}>
            {flashcards.map((flashcard, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                {flashcard.flip ? (
                  <Card onClick={() => handleFlip(index)} sx={{ cursor: 'pointer' }}>
                    <CardContent>
                      <Typography variant="h6" sx={{ mt: 2 }}>Answer:</Typography>
                      <Typography>{flashcard.back}</Typography>
                    </CardContent>
                  </Card>
                ) : (
                  <Card onClick={() => handleFlip(index)} sx={{ cursor: 'pointer' }}>
                    <CardContent>
                      <Typography variant="h6">Question:</Typography>
                      <Typography>{flashcard.front}</Typography>
                    </CardContent>
                  </Card>
                )}
              </Grid>
            ))}
          </Grid>
      {/*     <Button variant="contained" color="secondary" onClick={handleOpenDialog} sx={{ mt: 4 }}>
            Save Deck
          </Button> */}
        </Box>
      )}

{/*       <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Save Deck</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter a name for your flashcard set.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Deck Name"
            fullWidth
            variant="outlined"
            value={setName}
            onChange={(e) => setSetName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">Cancel</Button>
          <Button onClick={handleSaveDeck} color="secondary">Save</Button>
        </DialogActions>
      </Dialog> */}

{/*       {decks.length > 0 && (
        <Box sx={{ mt: 6 }}>
          <Typography variant="h5" gutterBottom>Your Decks</Typography>
          <Grid container spacing={2}>
            {decks.map((deck) => (
              <Grid item xs={12} sm={6} md={4} key={deck._id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{deck.deckName}</Typography>
                    <Typography>{deck.cards.length} flashcards</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )} */}
    </Container>
  );
}
