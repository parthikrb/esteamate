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
    label: "Leaves",
    path: "/capacity/myleaves",
    icon: <WorkOffIcon />,
  },
];

export default capacityRoute;
