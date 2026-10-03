import { useEffect, useMemo, useState } from 'react';
import './App.css';

const API_BASE = '/api';

const MOVIE_CATALOG = [
  { title: 'Interstellar', description: 'A group of astronauts travel through a wormhole searching for a new home for humanity.', year: 2014, industry: 'Hollywood', poster: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg' },
  { title: 'Gravity', description: 'An astronaut stranded in space struggles to survive and return safely to Earth.', year: 2013, industry: 'Hollywood', poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPzHcdqR_bLJVGHrIK7cF6PlhTMIin_iHRfTa8NjzlxA&s' },
  { title: 'The Martian', description: 'An astronaut stranded on Mars uses science and ingenuity to survive until rescue.', year: 2015, industry: 'Hollywood', poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSI4O-h_EiqtZJANoP899-9CUcC5eqAwPPRf7xdZc22bQ&s=10' },
  { title: 'Titanic', description: 'Two passengers from different social classes fall in love aboard a doomed ocean liner.', year: 1997, industry: 'Hollywood', poster: 'https://image.tmdb.org/t/p/w500/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg' },
  { title: 'John Wick', description: 'A retired assassin returns to the criminal underworld seeking revenge after a personal loss.', year: 2014, industry: 'Hollywood', poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrGoRen9XruChsJOtNYJEEt42OBYPV9iT5n1D-L7Rdsw&s=10' },
  { title: 'The Dark Knight', description: 'A masked vigilante battles a criminal mastermind who spreads chaos throughout Gotham City.', year: 2008, industry: 'Hollywood', poster: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg' },
  { title: 'Shutter Island', description: 'A detective investigates the disappearance of a patient from an isolated psychiatric hospital and begins questioning reality.', year: 2010, industry: 'Hollywood', poster: 'https://image.tmdb.org/t/p/w500/4GDy0PHYX3VRXUtwK5ysFbg3kEx.jpg' },
  { title: 'Finding Nemo', description: 'A cautious father crosses the ocean searching for his missing son.', year: 2003, industry: 'Hollywood', poster: 'https://image.tmdb.org/t/p/w500/5lc6nQc0VhWFYFbNv016xze8Jvy.jpg' },
  { title: 'The Pursuit of Happyness', description: 'A struggling father faces poverty and homelessness while trying to build a better future for himself and his young son.', year: 2006, industry: 'Hollywood', poster: 'https://image.tmdb.org/t/p/w500/lBYOKAMcxIvuk9s9hMuecB9dPBV.jpg' },
  { title: 'Toy Story', description: 'A group of toys come alive and struggle with friendship, jealousy, identity and being replaced.', year: 1995, industry: 'Hollywood', poster: 'https://image.tmdb.org/t/p/w500/uXDfjJbdP4ijW5hWSBrPrlKpxab.jpg' },
  { title: 'Inception', description: 'A skilled thief enters people\'s dreams to steal secrets and is given a mission to plant an idea inside a target\'s mind.', year: 2010, industry: 'Hollywood', poster: 'https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg' },
  { title: 'The Shawshank Redemption', description: 'A wrongly convicted banker forms a lasting friendship and searches for hope while serving a long prison sentence.', year: 1994, industry: 'Hollywood', poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB0nTDEQuVprdOdrb57bY7N-K4U4IsT6MOIcDs4PIlaIKH1srRfehMSrTdbAV86-awUQuCGlh35-sQWYHiftQe5HMQnCe5vO7n7FQ1yyPvew&s=10' },
  { title: 'Forrest Gump', description: 'A kind-hearted man experiences decades of American history while remaining devoted to the woman he has loved since childhood.', year: 1994, industry: 'Hollywood', poster: 'https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg' },
  { title: 'The Matrix', description: 'A hacker discovers that reality is a simulated world and joins a rebellion against the machines controlling humanity.', year: 1999, industry: 'Hollywood', poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3KWdXeZ4ZN_yGTqVVlws0zOGhL1F0cW0JnLw-g4vSuSNgO0TJiZUnT1XKEdeMvtXJPdCCxWgaKjrqYDnFbR3eE4Jbvn7D6Zd-WOc3tDPBiw&s=10' },
  { title: 'Gladiator', description: 'A betrayed Roman general becomes a gladiator and fights his way toward revenge against the emperor who destroyed his family.', year: 2000, industry: 'Hollywood', poster: 'https://image.tmdb.org/t/p/w500/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg' },
  { title: 'Avengers: Endgame', description: 'The surviving heroes reunite for a final mission to reverse a devastating loss and restore the people who disappeared.', year: 2019, industry: 'Hollywood', poster: 'https://image.tmdb.org/t/p/w500/ulzhLuWrPK07P1YkdWQLZnQh1JL.jpg' },
  { title: 'Jurassic Park', description: 'Scientists and visitors become trapped in a dinosaur theme park after its security systems fail.', year: 1993, industry: 'Hollywood', poster: 'https://image.tmdb.org/t/p/w500/oU7Oq2kFAAlGqbU4VoAE36g4hoI.jpg' },
  { title: 'The Godfather', description: 'The reluctant son of a powerful crime family is drawn into the family\'s violent world and gradually takes control.', year: 1972, industry: 'Hollywood', poster: 'https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg' },
  { title: 'Fight Club', description: 'A disillusioned office worker and a charismatic stranger create an underground fight club that grows into something dangerous.', year: 1999, industry: 'Hollywood', poster: 'https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg' },
  { title: 'La La Land', description: 'An aspiring actress and a jazz musician fall in love while pursuing ambitious creative careers in Los Angeles.', year: 2016, industry: 'Hollywood', poster: 'https://image.tmdb.org/t/p/w500/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg' },
  { title: '3 Idiots', description: 'Three engineering students navigate academic pressure, friendship and expectations while questioning a rigid education system.', year: 2009, industry: 'Bollywood', poster: 'https://image.tmdb.org/t/p/w500/66A9MqXOyVFCssoloscw79z8Tew.jpg' },
  { title: 'Dangal', description: 'A former wrestler trains his daughters to become competitive wrestlers while challenging social expectations in rural India.', year: 2016, industry: 'Bollywood', poster: 'https://image.tmdb.org/t/p/w500/cJRPOLEexI7qp2DKtFfCh7YaaUG.jpg' },
  { title: 'Zindagi Na Milegi Dobara', description: 'Three friends take a road trip across Spain that forces them to confront fear, relationships and how they want to live.', year: 2011, industry: 'Bollywood', poster: 'https://image.tmdb.org/t/p/w500/hKO9O715wYxjkQSEv47giCYcyO8.jpg' },
  { title: 'Taare Zameen Par', description: 'A misunderstood child struggling with dyslexia finds confidence after a compassionate teacher recognizes his creativity.', year: 2007, industry: 'Bollywood', poster: 'https://image.tmdb.org/t/p/w500/puHRt6Raovm5ujGCdwLWvRv4NHU.jpg' },
  { title: 'Lagaan', description: 'Villagers under colonial rule challenge British officers to a cricket match in hopes of escaping a crushing agricultural tax.', year: 2001, industry: 'Bollywood', poster: 'https://image.tmdb.org/t/p/w500/yNX9lFRAFeNLNRIXdqZK9gYrYKa.jpg' },
  { title: 'Dilwale Dulhania Le Jayenge', description: 'Two young Indians living abroad fall in love, but family tradition and an arranged marriage stand between them.', year: 1995, industry: 'Bollywood', poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9HcGexxu7W_aFu1SLuzUUGFzfhNpsVc0QIiFRAlLhoYWcIunfoYSWZQqtLjsY4xYgFCRw8lf4-rdvmIV1NS52RpSZT7m-ZyodmSfRxUdkiw&s=10' },
  { title: 'Gully Boy', description: 'A young man from a poor Mumbai neighborhood uses hip-hop and street rap to pursue a life beyond poverty and social limitations.', year: 2019, industry: 'Bollywood', poster: 'data:image/webp;base64,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' },
  { title: 'Queen', description: 'After being abandoned before her wedding, a sheltered young woman travels alone on her planned honeymoon and discovers independence.', year: 2013, industry: 'Bollywood', poster: 'data:image/webp;base64,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' },
  { title: 'Bajrangi Bhaijaan', description: 'A kind-hearted Indian man crosses borders and overcomes political obstacles to reunite a lost mute Pakistani girl with her family.', year: 2015, industry: 'Bollywood', poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoIK1hfgKaXgac0QMxkIiLOdDdcCH2yBNY-foiXgpfoaKt_B7oZR521Q5BrDVNCMEoo5r2kbfJQLlz28hdohaL985w1Elle9UwmtHejnjArg&s=10' },
  { title: 'Andhadhun', description: 'A pianist pretending to be blind becomes trapped in a dangerous web of murder, deception and unpredictable consequences.', year: 2018, industry: 'Bollywood', poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHv5EF_vTujA4LYvI3AxAL-SBuDrYaHTFwT_VcrcalRKwqlwXzkzJ1szPGFmCu_6cc8iLSh8lF8xAJcvcTV889K2giWRAM2RBNc3VuG4Qx8w&s=10' },
];

function enrichMovie(movie) {
  const fallback = MOVIE_CATALOG.find(
    (entry) => entry.title.toLowerCase() === String(movie.title || '').toLowerCase()
  );

  return {
    ...fallback,
    ...movie,
    title: movie.title || fallback?.title || 'Untitled movie',
    description: movie.description || fallback?.description || 'No description available.',
    industry: movie.industry || fallback?.industry || 'Hollywood',
    year: movie.year || fallback?.year || new Date().getFullYear(),
    poster: movie.poster || fallback?.poster || 'https://placehold.co/500x750/111111/ffffff?text=Movie',
  };
}

function formatScore(score) {
  if (typeof score !== 'number' || Number.isNaN(score)) return '—';
  return `${Math.max(0, Math.round(score * 100))}% match`;
}

function MovieSkeletons({ count = 5 }) {
  return (
    <div className="movie-grid skeleton-grid" aria-label="Loading movies" aria-busy="true">
      {Array.from({ length: count }, (_, index) => (
        <div className="skeleton-card" key={index}>
          <div className="skeleton-poster" />
          <div className="skeleton-line" />
          <div className="skeleton-line skeleton-line-short" />
        </div>
      ))}
    </div>
  );
}

export default function App() {
  const [catalog, setCatalog] = useState(MOVIE_CATALOG);
  const [filter, setFilter] = useState('All');
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('moviematch-theme') === 'light' ? 'light' : 'dark';
    } catch {
      return 'dark';
    }
  });
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [similarError, setSimilarError] = useState('');
  const [statusText, setStatusText] = useState('API connected');
  const [isLoadingCatalog, setIsLoadingCatalog] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoadingSimilar, setIsLoadingSimilar] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem('moviematch-theme', theme);
    } catch {
      // Theme still works for this session when browser storage is unavailable.
    }
  }, [theme]);

  useEffect(() => {
    const loadCatalog = async () => {
      try {
        const response = await fetch(`${API_BASE}/movies`);
        if (!response.ok) throw new Error('Backend responded with an error.');

        const movies = await response.json();
        if (Array.isArray(movies) && movies.length > 0) {
          const enriched = movies.map((movie) => enrichMovie(movie));
          setCatalog(enriched);
          setStatusText('API connected');
          setError('');
        }
      } catch {
        setStatusText('Using local demo catalog');
        setError('Backend unavailable — showing the local catalog instead.');
      } finally {
        setIsLoadingCatalog(false);
      }
    };

    loadCatalog();
  }, []);

  const filteredCatalog = useMemo(() => {
    if (filter === 'All') return catalog;
    return catalog.filter((movie) => movie.industry === filter);
  }, [catalog, filter]);

  const runSearch = async (nextQuery) => {
    const trimmed = nextQuery.trim();
    if (!trimmed) return;

    setIsSearching(true);
    setError('');
    setSearchResults([]);

    try {
      const response = await fetch(`${API_BASE}/search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: trimmed }),
      });

      if (!response.ok) throw new Error('Search request failed.');

      const result = await response.json();
      setSearchResults(Array.isArray(result) ? result.map((movie) => enrichMovie(movie)) : []);
      setQuery(trimmed);
    } catch (searchError) {
      console.error(searchError);
      setError('Semantic search is unavailable right now. Please try again.');
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const openMovie = async (movie) => {
    setSelectedMovie(movie);
    setIsLoadingSimilar(true);
    setSimilarError('');
    setSimilarMovies([]);

    try {
      const response = await fetch(`${API_BASE}/similar/${encodeURIComponent(movie.title)}`);
      if (!response.ok) throw new Error('Unable to fetch similar movies.');

      const result = await response.json();
      setSimilarMovies(Array.isArray(result) ? result.map((item) => enrichMovie(item)) : []);
    } catch (similarError) {
      console.error(similarError);
      setSimilarError('Could not load similar movies. Check your connection and try again.');
      setSimilarMovies([]);
    } finally {
      setIsLoadingSimilar(false);
    }
  };

  const onSearchSubmit = (event) => {
    event.preventDefault();
    runSearch(query);
  };

  return (
    <div className="app-shell" data-theme={theme}>
      <header className="header">
        <div className="brand">MOVIEMATCH</div>
        <div className="header-actions">
          <div className={`api-status ${statusText === 'API connected' ? '' : 'api-status-offline'}`}>
            <span className="status-dot" aria-hidden="true" />
            <span>{statusText}</span>
          </div>
          <button
            className="theme-toggle"
            type="button"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            onClick={() => setTheme((current) => current === 'dark' ? 'light' : 'dark')}
          >
            <span aria-hidden="true">{theme === 'dark' ? '☀' : '☾'}</span>
            <span>{theme === 'dark' ? 'Light mode' : 'Dark mode'}</span>
          </button>
        </div>
      </header>

      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">Embeddings in practice</p>
          <h1>Search by meaning, not keywords.</h1>
          <p className="hero-copy">
            Describe the kind of movie you want. MovieMatch embeds your sentence,
            compares it with locally stored movie vectors, and returns the nearest matches.
          </p>

          <form className="search-box" onSubmit={onSearchSubmit}>
            <input
              type="text"
              autoComplete="off"
              placeholder="e.g. someone alone far from Earth trying to survive"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <button className="primary-button" type="submit" disabled={isSearching}>
              {isSearching ? 'Searching…' : 'Semantic Search'}
            </button>
          </form>

          <div className="example">
            Try: “a student fighting academic pressure”, “a journey of self discovery”,
            or “revenge against criminals”.
          </div>
        </div>
      </section>

      <main>
        {(isSearching || searchResults.length > 0 || (query.trim() && !isSearching && !error)) && (
          <section className="section">
            <div className="section-header">
              <div>
                <h2 className="section-title">Semantic Search Results</h2>
                <p className="section-subtitle">Matches for “{query}”</p>
              </div>
            </div>
            {isSearching ? (
              <MovieSkeletons count={5} />
            ) : searchResults.length > 0 ? (
              <div className="result-grid">
              {searchResults.map((movie, index) => (
                <article key={`${movie.title}-result`} className="movie-card card-enter" style={{ '--card-index': index }} onClick={() => openMovie(movie)}>
                  <div className="poster-wrap">
                    <img className="poster" src={movie.poster} alt={movie.title} />
                    <div className="poster-overlay">
                      <span>{formatScore(movie.score)}</span>
                    </div>
                  </div>
                  <div className="card-body">
                    <h3 className="movie-title">{movie.title}</h3>
                    <div className="movie-meta">
                      <span>{movie.industry}</span>
                      <span>{movie.year}</span>
                    </div>
                    <span className="score">{formatScore(movie.score)}</span>
                  </div>
                </article>
              ))}
              </div>
            ) : (
              <div className="empty-state">No close matches found. Try describing the mood, story, or setting.</div>
            )}
          </section>
        )}

        {error && (
          <div className="section error-state" role="alert">
            <span>{error}</span>
            {query.trim() && (
              <button className="retry-button" type="button" onClick={() => runSearch(query)}>
                Retry search
              </button>
            )}
          </div>
        )}

        <section className="section">
          <div className="section-header">
            <div>
              <h2 className="section-title">Explore the catalog</h2>
              <p className="section-subtitle">Click any movie to find semantically similar movies.</p>
            </div>

            <div className="filters" aria-label="Movie filters">
              {['All', 'Hollywood', 'Bollywood'].map((option) => (
                <button
                  key={option}
                  type="button"
                  className={`filter-button ${filter === option ? 'active' : ''}`}
                  onClick={() => setFilter(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {isLoadingCatalog ? (
            <MovieSkeletons count={10} />
          ) : (
            <div className="movie-grid">
              {filteredCatalog.map((movie, index) => (
                <article key={movie.title} className="movie-card card-enter" style={{ '--card-index': index }} onClick={() => openMovie(movie)}>
                  <div className="poster-wrap">
                    <img className="poster" src={movie.poster} alt={movie.title} />
                    <div className="poster-overlay">
                      <span>{movie.industry}</span>
                    </div>
                  </div>
                  <div className="card-body">
                    <h3 className="movie-title">{movie.title}</h3>
                    <div className="movie-meta">
                      <span>{movie.industry}</span>
                      <span>{movie.year}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>

      {selectedMovie && (
        <div className="modal-backdrop" onClick={() => setSelectedMovie(null)}>
          <div className="modal" role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}>
            <div className="modal-hero">
              <button type="button" className="close-button" aria-label="Close" onClick={() => setSelectedMovie(null)}>×</button>
              <img className="modal-poster" src={selectedMovie.poster} alt={selectedMovie.title} />

              <div className="modal-copy">
                <h2>{selectedMovie.title}</h2>
                <p>{selectedMovie.description}</p>
                <span className="pill">{selectedMovie.industry}</span>
                <span className="pill">{selectedMovie.year}</span>
              </div>
            </div>

            <div className="similar-section">
              <h3>Similar movies</h3>
              <p className="similar-note">
                Ranked using cosine similarity between the selected movie's stored embedding and every other movie embedding.
              </p>

              {isLoadingSimilar ? (
                <MovieSkeletons count={5} />
              ) : similarError ? (
                <div className="error-state" role="alert">
                  <span>{similarError}</span>
                  <button className="retry-button" type="button" onClick={() => openMovie(selectedMovie)}>Retry</button>
                </div>
              ) : similarMovies.length === 0 ? (
                <div className="empty-state">No similar movies were returned.</div>
              ) : (
                <div className="movie-grid">
                  {similarMovies.map((movie, index) => (
                    <article key={`${movie.title}-similar`} className="movie-card card-enter" style={{ '--card-index': index }} onClick={() => openMovie(movie)}>
                      <div className="poster-wrap">
                        <img className="poster" src={movie.poster} alt={movie.title} />
                      </div>
                      <div className="card-body">
                        <h3 className="movie-title">{movie.title}</h3>
                        <div className="movie-meta">
                          <span>{movie.industry}</span>
                          <span>{formatScore(movie.score)}</span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <footer>Demo catalog is stored directly in this page; semantic search and similar-movie ranking are fetched from the backend. Poster imagery is loaded from TMDB\'s image CDN.</footer>
    </div>
  );
}
