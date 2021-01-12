import React from 'react';
import clsx from 'clsx';
import { UserHeader } from './UserHeader';
import { drawerWidth, Sidebar } from './Sidebar';
import { makeStyles } from '@material-ui/core';
import { CssBaseline } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    fontSize: '16px',
  },
  content: {
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export const UserLayout = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <UserHeader
        handleDrawerToggle={handleDrawerToggle}
        open={open}
        darkMode={props.darkMode}
        toggleDarkMode={props.toggleDarkMode}
      />
      <Sidebar open={open} />
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        {props.children}
      </main>
    </div>
  );
};
