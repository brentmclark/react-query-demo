import React from "react";
import { Typography, Link } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import { useQuery } from "react-query";

export default function Characters(props) {
  const { isLoading, error, data } = useQuery("characters", () =>
    fetch(`https://swapi.co/api/people/`)
  );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <div>
      <Typography variant="h2">Star Wars Films</Typography>
      {data.people.map(person => (
        <article key={person.id} style={{ margin: "16px 0 0" }}>
          <Link component={RouterLink} to={`/characters/${person.id}`}>
            <Typography variant="h6">{person.name}</Typography>
          </Link>
          <Typography variant="body2">
            From: <em>{person.homeworld.name}</em>
          </Typography>
          <Typography variant="body2">
            Born: <em>{person.birth_year}</em>
          </Typography>
        </article>
      ))}
    </div>
  );
}
