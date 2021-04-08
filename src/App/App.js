import { CssBaseline, makeStyles, ThemeProvider } from '@material-ui/core';
import { PeopleOutlineTwoTone } from '@material-ui/icons';
import Header from '../components/Header';
import PageHeader from '../components/PageHeader';
import SideMenu from '../components/SideMenu';
import './App.css';

const useStyles = makeStyles({
  appMain: {
    paddingLeft: '320px',
    width: '100%'
  }
})

function App() {
  const classes = useStyles()
  return (
    <ThemeProvider>
      <SideMenu/>
      <div className={classes.appMain}>
        <Header/>
        <PageHeader
          title="Page Header"
          subTitle="Page description"
          icon={<PeopleOutlineTwoTone fontSize="large" />}
        />
      </div>
      <CssBaseline />
    </ThemeProvider>
  );
}

export default App;
