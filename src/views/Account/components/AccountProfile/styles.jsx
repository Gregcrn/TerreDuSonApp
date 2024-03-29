export default theme => ({
  root: {},
  details: {
    display: 'flex'
  },
  info: {},
  locationText: {
    marginTop: theme.spacing.unit,
    color: theme.palette.text.secondary
  },
  dateText: {
    color: theme.palette.text.secondary
  },
  avatar: {
    marginLeft: 'auto',
    height: '110px',
    width: '110px',
    flexShrink: 0,
    flexGrow: 0
  },
  svg: {
    marginLeft: 'auto',
    height: '90px',
    width: '90px',
    flexShrink: 0,
    flexGrow: 0
  },
  progressWrapper: {
    marginTop: theme.spacing.unit * 2
  },
  progressRoot: {
    borderRadius: '3px',
    marginTop: theme.spacing.unit,
    overflow: 'hidden'
  },
  progressColorPrimary: {
    backgroundColor: theme.palette.common.neutral
  },
  uploadButton: {
    marginRight: theme.spacing.unit * 2,
  },
  input: {
    display: 'none'
  }
});
