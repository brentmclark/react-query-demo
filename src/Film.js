import React from "react";
import { Typography, Link } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import { withRouter } from "react-router";
import { useQuery } from "react-query";
import fetch from "./fetch";

function Film(props) {
  const { isLoading, error, data } = useQuery("film", () =>
    fetch(`https://swapi.co/api/films/${props.match.params.filmId}`)
  );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <div>
      <Typography variant="h2">{data.film.title}</Typography>
      <Typography variant="body1">{data.film.openingCrawl}</Typography>
      <br />
      <Typography variant="h4">Characters</Typography>
      {data.film.characterConnection.characters.map(character => (
        <article key={character.id}>
          <Link component={RouterLink} to={`/characters/${character.id}`}>
            <Typography variant="h6">{character.name}</Typography>
          </Link>
        </article>
      ))}
    </div>
  );
}

export default withRouter(Film);
