import React from "react";
import {
  Typography,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import { withRouter } from "react-router";
import { useQuery } from "react-query";

function Character(props) {
  const { isLoading, error, data } = useQuery("character", () =>
    fetch(`https://swapi.co/api/characters/${props.match.params.characterId}`)
  );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <div>
      <Typography variant="h2">{data.person.name}</Typography>
      <TableContainer component={Paper} style={{ maxWidth: "400px" }}>
        <Table size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Feature</TableCell>
              <TableCell>Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Born</TableCell>
              <TableCell>{data.person.birthYear}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Eyes</TableCell>
              <TableCell>{data.person.eyeColor}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Hair</TableCell>
              <TableCell>{data.person.hairColor}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Height</TableCell>
              <TableCell>{data.person.height}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Mass</TableCell>
              <TableCell>{data.person.mass}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Homeworld</TableCell>
              <TableCell>{data.person.homeworld.name}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <br />
      <Typography variant="h4">Films</Typography>
      {data.person.filmConnection.films.map(film => (
        <article key={film.id}>
          <Link component={RouterLink} to={`/films/${film.id}`}>
            <Typography variant="h6">
              {film.episodeID}. {film.title}
            </Typography>
          </Link>
        </article>
      ))}
    </div>
  );
}

export default withRouter(Character);
