import React from "react";
import { theme } from "../../themes/theme";
import { Box, Typography, makeStyles } from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: 89,
    marginBottom: theme.spacing(4),
    boxShadow: "0 2px 20px 0 rgba(88,133,196,0.10)"
  },
  content: {
    display: "flex",
    alignItems: "center",
    marginLeft: theme.spacing(3),
  },
  username: {
    fontSize: theme.typography.homeHeader.fontSize,
    letterSpacing: -0.29,
    fontWeight: theme.typography.homeHeader.fontWeight,
    marginRight: theme.spacing(1.75),
  },
  statusText: {
    fontSize: 12,
    color: theme.palette.secondary.main,
    letterSpacing: -0.17
  },
  statusDot: {
    height: 8,
    width: 8,
    borderRadius: "50%",
    marginRight: theme.spacing(1),
    backgroundColor: theme.palette.activeChat.offlineDot
  },
  online: {
    background: theme.palette.activeChat.onlineDot
  },
  ellipsis: {
    color: theme.palette.activeChat.ellipsis,
    marginRight: theme.spacing(3),
    opacity: 0.5
  },
}))

const Header = ({ username, online }) => {
  const classes = useStyles(theme)

  return (
    <Box className={classes.root}>
      <Box className={classes.content}>
        <Typography className={classes.username}>{username}</Typography>
        <Box className={`${classes.statusDot} ${classes[online && "online"]}`}></Box>
        <Typography className={classes.statusText}>{online ? "Online" : "Offline"}</Typography>
      </Box>
      <MoreHorizIcon classes={{ root: classes.ellipsis }} />
    </Box>
  );
};

export default Header;
