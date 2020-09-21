// const capacityMenu = ["Dashboard", "My Leaves", "Squad Leaves"];
import DashboardIcon from "@material-ui/icons/Dashboard";
import WorkOffIcon from "@material-ui/icons/WorkOff";
import StorageIcon from "@material-ui/icons/Storage";

const capacityRoute = [
  {
    label: "Dashboard",
    path: "/capacity",
    icon: <DashboardIcon />,
  },
  {
    label: "My Leaves",
    path: "/capacity/myleaves",
    icon: <WorkOffIcon />,
  },
  {
    label: "Squad Leaves",
    path: "/capacity/squadleaves",
    icon: <StorageIcon />,
  },
];

export default capacityRoute;
