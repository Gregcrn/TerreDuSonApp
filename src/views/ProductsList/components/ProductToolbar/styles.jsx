export default theme => ({
  root: {},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing.unit
  },
  spacer: {
    flexGrow: 1
  },
  deleteButton: {
    color: theme.palette.danger.main,
    marginRight: theme.spacing.unit
  },
  importButton: {
    marginRight: theme.spacing.unit
  },
  importIcon: {
    marginRight: theme.spacing.unit
  },
  exportButton: {
    marginRight: theme.spacing.unit
  },
  exportIcon: {
    marginRight: theme.spacing.unit
  },
  searchInput: {
    marginRight: theme.spacing.unit
  },
  badge: {
    top: '0%',
    right: -2,
    // The border color match the background color.
    border: `1px solid ${
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[900]
    }`,
  },
});
