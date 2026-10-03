const fs = require("fs");

const movies = require("../movies.json");

const getEmbedding = require("../services/embeddings");

async function embedMovies() {

    const movieVectors = [];

    for(const movie of movies) {

        const text =
            movie.title +
            " " +
            movie.description;

        const embedding =
            await getEmbedding(text);

        movieVectors.push({
            ...movie,
            embedding
        });

        console.log(
            movie.title
        );
    }

    fs.writeFileSync(
        "movieVectors.json",
        JSON.stringify(
            movieVectors,
            null,
            2
        )
    );

    console.log(
        "Movie vectors saved"
    );
}

embedMovies();