import React from "react";
import { Typography, Link } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import { useQuery } from "react-query";
// import fetch from "./fetch";

export default function Films(props) {
  const { data, isLoading, error } = useQuery("films", async () => {
    console.log("fetching...");
    const res = await fetch("https://swapi.co/api/films/");
    console.log({ res });
    return await res.json();
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }
  // this will not be necessary when v1 is released.
  if (data == null) {
    console.log("this should happen but it does");
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error :(</p>;
  }

  return (
    <div>
      <Typography variant="h2">Star Wars Films</Typography>
      {data.results.map(film => (
        <article key={film.id}>
          <Link component={RouterLink} to={`/films/${film.id}`}>
            <Typography variant="h6">
              {film.episode_id}. {film.title}{" "}
              <em>({new Date(Date.parse(film.release_date)).getFullYear()})</em>
            </Typography>
          </Link>
        </article>
      ))}
    </div>
  );
}
