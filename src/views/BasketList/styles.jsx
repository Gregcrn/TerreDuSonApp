import { isWidthDown } from "@material-ui/core/withWidth";

export default theme => ({
    root: {
      padding: theme.spacing.unit * 3
    },
    content: {
      marginTop: theme.spacing.unit * 2
    },
    progressWrapper: {
      paddingTop: '48px',
      paddingBottom: '24px',
      display: 'flex',
      justifyContent: 'center'
    },
    // button: {
    //   marginLeft: theme.spacing.unit * 127,
    // },
    input: {
      display: 'none',
    },
    fab: {
      margin: theme.spacing.unit,
    },
    extendedIcon: {
      marginRight: theme.spacing.unit,
    },
    containerBar:{
      display: 'flex',
      justifyContent:'space-between'
    }
  });
  