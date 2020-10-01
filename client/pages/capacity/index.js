import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import * as actions from "../../store/actions/current-user";
import { loadUserSquadLeaves } from "../../store/actions/leave";
import { isBefore, isAfter, isEqual, isWithinInterval } from "date-fns";
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
    // display: "contents",
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
  totalHours: {
    marginLeft: "20px",
    display: 'flex',
    justifyContent: "space-around",
  },
  totalDescriptions: {
    display: 'flex',
    justifyContent: "space-around",
    marginLeft: "20px",
  },
  totalDesc: {
    fontSize: "x-small",
  },
}));

const Dashboard = (props) => {
  const { currentUserDetails, leaves } = props;
  console.log(leaves);
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
            let devLeave = 0;
            let qaLeave = 0;
            let baLeave = 0;

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

              leaves.map((leave) => {
                if (
                  isWithinInterval(new Date(leave.date), {
                    start: new Date(sp.start_date),
                    end: new Date(sp.end_date),
                  })
                ) {
                  leave.role === "Developer"
                    ? (devLeave += 1)
                    : leave.role === "Quality Analyst"
                    ? (qaLeave += 1)
                    : leave.role === "Business Analyst"
                    ? (baLeave += 1)
                    : null;
                }
              });
              sp["devLeave"] = devLeave * 8;
              sp["qaLeave"] = qaLeave * 8;
              sp["baLeave"] = baLeave * 8;
              sp["devNet"] = sp.devTotal - sp.devReserve - sp.devLeave;
              sp["qaNet"] = sp.qaTotal - sp.qaReserve - sp.qaLeave;
              sp["baNet"] = sp.baTotal - sp.baReserve - sp.baLeave;
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
        {currentReleases.length > 0 && (
          <Duration
            startDate={currentReleases[value].start_date}
            endDate={currentReleases[value].end_date}
          />
        )}

        <div className={classes.sprints}>
          {currentReleases.length > 0 &&
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
                            data: Array.from([
                              spr.devLeave,
                              spr.qaLeave,
                              spr.baLeave,
                            ]),
                          },
                        ],
                      }}
                      width={null}
                      height={280}
                      options={options}
                    />
                    <div className={classes.footer}>
                      <span className={classes.totalHours}>
                        <span>{isNaN(spr.devNet) ? 0 : spr.devNet}</span>
                        <span>{isNaN(spr.qaNet) ? 0 : spr.qaNet}</span>
                        <span>{isNaN(spr.baNet) ? 0 : spr.baNet}</span>
                      </span>
                      <span className={classes.totalDescriptions}>
                        <span className={classes.totalDesc}>Dev</span>
                        <span className={classes.totalDesc}>QA</span>
                        <span className={classes.totalDesc}>BA</span>
                      </span>
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
    </div>
  );
};

Dashboard.getInitialProps = async (context, client) => {
  const state = await context.store.getState();
  await context.store.dispatch(actions.loadCurrentUser(client));
  await context.store.dispatch(actions.loadCurrentUserSquads(client));
  await context.store.dispatch(actions.loadCurrentUserReleases(client));
  await context.store.dispatch(actions.loadCurrentUserSprints(client));

  const currentUser = state.current_user.user;
  await context.store.dispatch(loadUserSquadLeaves(client, currentUser.id));

  return {
    currentUserDetails: state.current_user,
    leaves: state.leave.squadLeaves,
  };
};

export default Dashboard;
