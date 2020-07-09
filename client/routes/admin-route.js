// const adminMenu = ["User", "Squad", "Release", "Sprint"];
import PersonIcon from "@material-ui/icons/Person";
import GroupIcon from "@material-ui/icons/Group";
import ListAltIcon from "@material-ui/icons/ListAlt";
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";

const adminRoute = [
  {
    label: "User",
    path: "/admin/user",
    icon: <PersonIcon />,
  },
  {
    label: "Squad",
    path: "/admin/squad",
    icon: <GroupIcon />,
  },
  {
    label: "Release",
    path: "/admin/release",
    icon: <ListAltIcon />,
  },
  {
    label: "Sprint",
    path: "/admin/sprint",
    icon: <BusinessCenterIcon />,
  },
];

export default adminRoute;
