const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const api = express.Router();

app.use(cors());
app.use(express.json());

const movies = require("./movies.json"); //1st
const getEmbedding = require("./services/embeddings"); //2nd
const { getMovieVectors } = require("./services/movieStore");
const cosineSimilarity = require("./services/cosineSimilarity");

const frontendDist = path.join(__dirname, "..", "frontend", "dist");

app.get("/health", (req, res) => {
    res.json({ status: "ok" });
});

api.get("/movies", (req, res) => {
    res.json(movies);
});

api.get("/test-embedding", async (req, res) => {
    const embedding = await getEmbedding(
        "space movie with astronauts"
    );

    res.json({
        dimension: embedding.length,
    });
});

api.get("/vectors", (req, res) => {

    const vectors =
        getMovieVectors();

    res.json({
        totalMovies:
            vectors.length,

        dimension:
            vectors[0]?.embedding.length
    });

});


api.post("/search", async (req, res) => {

    try {

        const { query } = req.body;

        const queryEmbedding =
            await getEmbedding(query);

        const movies =
            getMovieVectors();

        const rankedMovies =
            movies.map(movie => {

                const score =
                    cosineSimilarity(
                        queryEmbedding,
                        movie.embedding
                    );

                return {
                    title: movie.title,
                    description: movie.description,
                    score
                };
            });

        rankedMovies.sort(
            (a, b) => b.score - a.score
        );

        return res.json(
            rankedMovies.slice(0, 5)
        );

    } catch (error) {

        return res.status(500).json({
            error: error.message
        });
    }
});

api.get("/similar/:title", (req, res) => {

    try {

        const movieTitle = req.params.title;

        const movies = getMovieVectors();

        const selectedMovie = movies.find(
            movie =>
                movie.title.toLowerCase() ===
                movieTitle.toLowerCase()
        );

        if (!selectedMovie) {

            return res.status(404).json({
                message: "Movie not found"
            });

        }

        const similarMovies = movies
            .filter(
                movie =>
                    movie.title !== selectedMovie.title
            )
            .map(movie => {

                const score =
                    cosineSimilarity(
                        selectedMovie.embedding,
                        movie.embedding
                    );

                return {
                    title: movie.title,
                    description: movie.description,
                    score
                };
            })
            .sort(
                (a, b) =>
                    b.score - a.score
            )
            .slice(0, 5);

        res.json(similarMovies);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});

app.use("/api", api);

app.use("/api", (req, res) => {
    res.status(404).json({ error: "API route not found" });
});

app.use(express.static(frontendDist));

app.get("/{*path}", (req, res, next) => {
    res.sendFile(path.join(frontendDist, "index.html"), (error) => {
        if (error) {
            next(error);
        }
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log("Server Started");


    console.log(
        "Movies Ready"
    );

});