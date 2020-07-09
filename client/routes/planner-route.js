// const plannerMenu = isAdmin ? ["Poll", "History"] : ["Vote", "History"];
import CastConnectedIcon from "@material-ui/icons/CastConnected";
import CastIcon from "@material-ui/icons/Cast";
import HistoryIcon from "@material-ui/icons/History";

const plannerRoute = [
  {
    label: "Poll",
    path: "/planner/poll",
    icon: <CastConnectedIcon />,
  },
  {
    label: "History",
    path: "/planner/history",
    icon: <HistoryIcon />,
  },
];

const plannerAdminRoute = [
  {
    label: "Vote",
    path: "/planner/vote",
    icon: <CastIcon />,
  },
  {
    label: "History",
    path: "/planner/history",
    icon: <HistoryIcon />,
  },
];

export { plannerRoute, plannerAdminRoute };
