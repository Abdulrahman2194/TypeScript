import React, { useState } from 'react';

// Component for rendering individual movie cards
function MovieItem({ movie, onDelete }) {
  // Convert rating number to star emojis
  const renderStars = (rating) => {
    return '⭐'.repeat(rating);
  };

  return (
    <div style={styles.card}>
      <div style={styles.cardHeader}>
        <h3>{movie.title}</h3>
        <button style={styles.deleteBtn} onClick={() => onDelete(movie.id)}>
          Remove
        </button>
      </div>
      <p style={styles.ratingText}>
        <strong>Rating:</strong> {renderStars(movie.rating)} ({movie.rating}/5)
      </p>
      {movie.review && (
        <p style={styles.reviewText}>
          <strong>Review:</strong> {movie.review}
        </p>
      )}
    </div>
  );
}

// Main App Component
export default function App() {
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState('');
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState('');

  // Handle form submission to add a new movie
  const handleAddMovie = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newMovie = {
      id: Date.now(),
      title: title,
      rating: Number(rating),
      review: review
    };

    setMovies([...movies, newMovie]);

    // Reset Form Fields
    setTitle('');
    setRating(5);
    setReview('');
  };

  // Handle movie removal
  const handleDeleteMovie = (id) => {
    setMovies(movies.filter((movie) => movie.id !== id));
  };

  return (
    <div style={styles.container}>
      <h2>🎬 Movies Watch List</h2>

      {/* Form Section */}
      <form onSubmit={handleAddMovie} style={styles.form}>
        <div style={styles.inputGroup}>
          <label>Movie Title:</label>
          <input
            type="text"
            placeholder="e.g. Inception"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.inputGroup}>
          <label>Star Rating (1 to 5):</label>
          <select
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            style={styles.input}
          >
            <option value={1}>1 Star ⭐</option>
            <option value={2}>2 Stars ⭐⭐</option>
            <option value={3}>3 Stars ⭐⭐⭐</option>
            <option value={4}>4 Stars ⭐⭐⭐⭐</option>
            <option value={5}>5 Stars ⭐⭐⭐⭐⭐</option>
          </select>
        </div>

        <div style={styles.inputGroup}>
          <label>Comment / Review:</label>
          <textarea
            placeholder="Write your review here..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
            style={{ ...styles.input, height: '60px' }}
          />
        </div>

        <button type="submit" style={styles.addBtn}>
          Add Movie
        </button>
      </form>

      {/* Movies List Section */}
      <div style={styles.listSection}>
        <h3>Your List ({movies.length})</h3>
        {movies.length === 0 ? (
          <p>No movies added yet.</p>
        ) : (
          movies.map((movie) => (
            <MovieItem
              key={movie.id}
              movie={movie}
              onDelete={handleDeleteMovie}
            />
          ))
        )}
      </div>
    </div>
  );
}

// Inline Styles
const styles = {
  container: {
    maxWidth: '500px',
    margin: '30px auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f4f4f9',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginBottom: '20px',
    backgroundColor: '#fff',
    padding: '15px',
    borderRadius: '8px'
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  input: {
    padding: '8px',
    fontSize: '14px',
    borderRadius: '4px',
    border: '1px solid #ccc'
  },
  addBtn: {
    padding: '10px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold'
  },
  listSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  card: {
    backgroundColor: '#fff',
    padding: '12px 16px',
    borderRadius: '6px',
    borderLeft: '4px solid #007bff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  deleteBtn: {
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    padding: '6px 10px',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  ratingText: {
    margin: '6px 0 4px 0',
    fontSize: '14px'
  },
  reviewText: {
    margin: '0',
    fontSize: '14px',
    color: '#555'
  }
};