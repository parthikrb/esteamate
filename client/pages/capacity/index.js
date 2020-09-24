import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import * as actions from "../../store/actions/current-user";
import { isBefore, isAfter, isEqual } from "date-fns";
import Duration from "../../components/capacity/duration";
import getWorkingDaysCount from "../../helpers/working-days";
import { Bar } from "react-chartjs-2";

const AntTabs = withStyles({
  root: {
    borderBottom: "1px solid #e8e8e8",
  },
  indicator: {
    backgroundColor: "#1890ff",
  },
})(Tabs);

const AntTab = withStyles((theme) => ({
  root: {
    textTransform: "none",
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(4),
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:hover": {
      color: "#40a9ff",
      opacity: 1,
    },
    "&$selected": {
      color: "#1890ff",
      fontWeight: theme.typography.fontWeightMedium,
    },
    "&:focus": {
      color: "#40a9ff",
    },
  },
  selected: {},
}))((props) => <Tab disableRipple {...props} />);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  padding: {
    padding: theme.spacing(3),
  },
  tab: {
    backgroundColor: theme.palette.background.paper,
  },
  sprints: {
    display: "flex",
    width: "100%",
    height: "69vh",
    justifyContent: "space-around",
  },
  sprint: {
    display: "flex",
    flexDirection: "column",
    width: "32%",
    height: "100%",
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow: "0 0 8px 0 #a4b0be",
  },
  sprintName: {
    color: "#f5f6fa",
    display: "flex",
    top: 0,
    padding: 3,
    height: "7vh",
    backgroundColor: "#33135C",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    fontSize: "large",
    fontWeight: "bold",
    minHeight: "20px",
  },
  footer: {
    color: "#f5f6fa",
    display: "flex",
    marginTop: "auto",
    bottom: 0,
    padding: 3,
    height: "7vh",
    backgroundColor: "#33135C",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    fontSize: "large",
    fontWeight: "bold",
    minHeight: "20px",
  },
}));

const Dashboard = (props) => {
  const { currentUserDetails } = props;
  const { currentUser, squads, releases, sprints } = currentUserDetails;
  const [currentReleases, setCurrentReleases] = useState([]);
  const [flatSquad, setFlatSquad] = useState([]);
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const labels = ["Developer", "Quality Analyst", "Business Analyst"];

  // Chart Options
  const options = {
    responsive: true,
    legend: {
      display: true,
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 10,
        bottom: 10,
      },
    },
    type: "bar",
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    // console.log(releases);
    const _squads = [];
    squads.map((squad) => {
      console.log(squad);
      _squads.push({
        id: squad.id,
        name: squad.squad_name,
        team: [
          ...squad.product_owner,
          ...squad.scrum_master,
          ...squad.scrum_team,
        ],
      });
    });
    setFlatSquad(_squads);

    const tempRelease = releases.filter(
      (release) =>
        (isBefore(new Date(release.start_date), new Date()) ||
          isEqual(new Date(release.start_date), new Date())) &&
        (isAfter(new Date(release.end_date), new Date()) ||
          isEqual(new Date(release.start_date), new Date()))
    );

    _squads.map((sq) => {
      let devCount = 0;
      let qaCount = 0;
      let baCount = 0;

      sq.team.map((member) => {
        member.role === "Developer"
          ? devCount++
          : member.role === "Quality Analyst"
          ? qaCount++
          : member.role === "Business Analyst"
          ? baCount++
          : null;
      });
      tempRelease.map((r) => {
        if (sq.id === r.squad) {
          r["squad_name"] = sq.name;
          r["devCount"] = devCount;
          r["qaCount"] = qaCount;
          r["baCount"] = baCount;

          sprints.map((sp) => {
            if (r.id === sp.release) {
              sp["days"] = getWorkingDaysCount(
                new Date(sp.start_date),
                new Date(sp.end_date)
              );
              sp["devTotal"] = sp.days * r.devCount * 8;
              sp["qaTotal"] = sp.days * r.qaCount * 8;
              sp["baTotal"] = sp.days * r.baCount * 8;
              sp["devReserve"] = r.is_release_reserve
                ? Math.ceil((r.dev_reserve / sp.devTotal) * 100)
                : 10;
              sp["qaReserve"] = r.is_release_reserve
                ? Math.ceil((r.qa_reserve / sp.qaTotal) * 100)
                : 21;
              sp["baReserve"] = r.is_release_reserve
                ? Math.ceil((r.ba_reserve / sp.baTotal) * 100)
                : 21;
            }
          });
        }
      });
    });

    setCurrentReleases(tempRelease);
  }, [props]);

  return (
    <div className={classes.root}>
      <div className={classes.tab}>
        <AntTabs value={value} onChange={handleChange} aria-label="release tab">
          {currentReleases.map((release) => {
            return <AntTab key={release.id} label={release.release_name} />;
          })}
        </AntTabs>
        {currentReleases.length && (
          <Duration
            startDate={currentReleases[value].start_date}
            endDate={currentReleases[value].end_date}
          />
        )}

        <div className={classes.sprints}>
          {currentReleases.length &&
            sprints
              .filter((sprint) => sprint.release === currentReleases[value].id)
              .map((spr) => {
                return (
                  <div className={classes.sprint} key={spr.id}>
                    <div className={classes.sprintName}>{spr.sprint_name}</div>
                    <Duration
                      startDate={spr.start_date}
                      endDate={spr.end_date}
                    />
                    <Bar
                      data={{
                        labels: labels,
                        datasets: [
                          {
                            label: "Total",
                            backgroundColor: "#7bed9f",
                            borderColor: "#7bed9f",
                            borderWidth: 1,
                            hoverBackgroundColor: "#2ed573",
                            hoverBorderColor: "#2ed573",
                            data: Array.from([
                              spr.devTotal,
                              spr.qaTotal,
                              spr.baTotal,
                            ]),
                          },
                          {
                            label: "Reserved",
                            backgroundColor: "#ffa502",
                            borderColor: "#ffa502",
                            borderWidth: 1,
                            hoverBackgroundColor: "#ff7f50",
                            hoverBorderColor: "#ff7f50",
                            data: Array.from([
                              spr.devReserve,
                              spr.qaReserve,
                              spr.baReserve,
                            ]),
                          },
                          {
                            label: "Leave",
                            backgroundColor: "#ff6b81",
                            borderColor: "#ff6b81",
                            borderWidth: 1,
                            hoverBackgroundColor: "#ff4757",
                            hoverBorderColor: "#ff4757",
                            data: Array.from([8, 13, 0]),
                          },
                        ],
                      }}
                      width={null}
                      height="280"
                      options={options}
                    />
                    <div className={classes.footer}>200 112 0</div>
                  </div>
                );
              })}
        </div>
      </div>
    </div>
  );
};

Dashboard.getInitialProps = async (context, client) => {
  await context.store.dispatch(actions.loadCurrentUser(client));
  await context.store.dispatch(actions.loadCurrentUserSquads(client));
  await context.store.dispatch(actions.loadCurrentUserReleases(client));
  await context.store.dispatch(actions.loadCurrentUserSprints(client));
  const state = await context.store.getState();

  return { currentUserDetails: state.current_user };
};

export default Dashboard;
