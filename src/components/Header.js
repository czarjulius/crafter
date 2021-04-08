import { AppBar, Badge, Grid, IconButton, InputBase, makeStyles, Toolbar } from '@material-ui/core'
import { ChatBubbleOutline, NotificationsNone, PowerSettingsNew, Search } from '@material-ui/icons'
import React from 'react'

const useStyles = makeStyles(theme =>({
  root:{
    backgroundColor: '#fff',
    transform: 'translateZ(0)'
  },
  searchInput: {
    opacity: '0.6',
    padding: `0px ${theme.spacing(1)}px`,
    fontSize: '0.8rem',
    '&:hover':{
      backgroundColor: '#f2f2f2'
    },
    '& .MuiSvgIcon-root': {
      marginRight: theme.spacing(1)
    }
  }
}))

export default function Header() {
  const classes = useStyles()
  return (
    <AppBar position='static' className={classes.root}>
      <Toolbar>
        <Grid container alignItems='center'>
          <Grid item>
            <InputBase 
            placeholder="search topics"
            className={classes.searchInput}
            startAdornment={<Search fontSize="small" />}
            />
          </Grid>

          <Grid item sm></Grid>

          <Grid item>
            <IconButton>
              <Badge badgeContent={4} color='secondary'>
                <NotificationsNone fontSize="small" />
              </Badge>
            </IconButton>
            <IconButton>
              <Badge badgeContent={3} color='primary'>
                <ChatBubbleOutline fontSize="small" />
              </Badge>
            </IconButton>
            <IconButton>
              <Badge color='secondary'>
                <PowerSettingsNew />
              </Badge>
            </IconButton>
          </Grid>

        </Grid>
      </Toolbar>
    </AppBar>
  )
}
