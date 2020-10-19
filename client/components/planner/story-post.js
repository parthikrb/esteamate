import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { isAfter } from "date-fns";
import { socket } from "../../helpers/build-socket";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    "& > *": {
      margin: 1,
      width: "23%",
    },
  },
  formControl: {
    minWidth: 80,
  },
  buttons: {
    display: "flex",
    justifyContent: "space-around",
  },
}));

const StoryPost = ({
  squads,
  releases,
  sprints,
  handleSquadSelection,
  handleSprintSelection,
  handleStory,
  switchFlip,
  onSave,
}) => {
  const classes = useStyles();

  const [squad, setSquad] = useState("");
  const [release, setRelease] = useState("");
  const [sprint, setSprint] = useState("");
  const [story, setStory] = useState("");
  const [flipped, setFlipped] = useState(false);

  const handleSquadChange = (event) => {
    const value = typeof event === "string" ? event : event.target.value;
    handleSquadSelection(value);
    setSquad(value);
  };

  const handleReleaseChange = (event) => {
    setRelease(event.target.value);
  };

  const handleSprintChange = (event) => {
    handleSprintSelection(event.target.value);
    setSprint(event.target.value);
  };

  const handlePoll = () => {
    socket.emit("poll", { squad, story });
    handleStory(story);
    setFlipped(false);
    switchFlip(false);
  };

  const handleFlip = () => {
    setFlipped(true);
    switchFlip(true);
  };

  const handleSave = () => {
    onSave();
  };

  useEffect(() => {
    if (squads.length === 1) {
      // setSquad(squads[0].id);
      handleSquadChange(squads[0].id);

      if (releases.filter((release) => release.squad === squad).length === 1) {
        setRelease(releases.filter((release) => release.squad === squad)[0].id);

        if (
          sprints.filter((sprint) => sprint.release.id === release).length === 1
        ) {
          setSprint(
            sprints.filter((sprint) => sprint.release === release)[0].id
          );
        }
      }
    }
  }, [squads, releases, sprints]);

  return (
    <Paper elevation={3}>
      <form className={classes.root} noValidate autoComplete="off">
        <FormControl className={classes.formControl}>
          <InputLabel id="squad-label">Squad Name</InputLabel>
          <Select
            labelId="squad-label"
            id="squad"
            value={squad}
            onChange={handleSquadChange}
          >
            {squads.map((squad) => (
              <MenuItem key={squad.id} value={squad.id}>
                {squad.squad_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl className={classes.formControl}>
          <InputLabel id="release-label">Release Name</InputLabel>
          <Select
            labelId="release-label"
            id="release"
            value={release}
            onChange={handleReleaseChange}
          >
            {releases
              .filter(
                (release) =>
                  release.squad === squad &&
                  isAfter(new Date(release.end_date), new Date())
              )
              .map((rel) => (
                <MenuItem key={rel.id} value={rel.id}>
                  {rel.release_name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>

        <FormControl className={classes.formControl}>
          <InputLabel id="sprint-label">Sprint Name</InputLabel>
          <Select
            labelId="sprint-label"
            id="sprint"
            value={sprint}
            onChange={handleSprintChange}
          >
            {sprints
              .filter(
                (sprint) =>
                  sprint.release === release &&
                  isAfter(new Date(sprint.end_date), new Date())
              )
              .map((rel) => (
                <MenuItem key={rel.id} value={rel.id}>
                  {rel.sprint_name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>

        <TextField
          disabled={!!!sprint}
          id="story"
          label="Story Number"
          value={story}
          onChange={(e) => setStory(e.target.value)}
        />
      </form>
      <div className={classes.buttons}>
        <Button onClick={handlePoll}>Revote</Button>
        <Button color="secondary" onClick={handleSave}>
          Save
        </Button>
        <Button onClick={handleFlip}>Flip</Button>
        <Button color="primary" onClick={handlePoll}>
          Poll
        </Button>
      </div>
    </Paper>
  );
};

export default StoryPost;
