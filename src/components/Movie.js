import React from "react";
import { useParams } from "react-router-dom";

// hooks
import { useMovieFetch } from "../hooks/useMovieFetch";

// components
import BreadCumb from "./BreadCumb";
import Spinner from "./Spinner";
import MovieInfo from "./MovieInfo";
import MovieInfoBar from "./MovieInfoBar";
import Grid from "./Grid";
import Actor from "./Actor";

// config
import { IMAGE_BASE_URL, POSTER_SIZE } from "../config";
import NoImage from "../images/no_image.jpg";

const Movie = () => {
  const { movieId } = useParams();
  const { state, loading, error } = useMovieFetch(movieId);
  if (loading) return <Spinner />;
  if (error) return <div>Something went wrong...</div>
  return (
    <>
      <BreadCumb movieTitle={state.original_title} />
      <MovieInfo movie={state} />
      <MovieInfoBar time={state.runtime} budget={state.budget} revenue={state.revenue} />
      <Grid header='Actors'>
        {state.actors.map(actor => (
          <Actor
            key={actor.credit_id}
            name={actor.name}
            character={actor.character}
            imageUrl={actor.profile_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${actor.profile_path}` : NoImage}
          />
        ))}
      </Grid>
    </>
  );
};

export default Movie;
