export default theme => ({
  root: {},
  tableRow: {
    height: '64px'
  },
  tableCell: {
    whiteSpace: 'nowrap'
  },
  tableCellInner: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
    display: 'inline-flex',
    fontSize: '14px',
    fontWeight: 500,
    height: '36px',
    width: '36px'
  },
  nameText: {
    display: 'inline-block',
    marginLeft: theme.spacing.unit * 2,
    fontWeight: 500,
    cursor: 'pointer'
  },
  searchInput: {
    marginBottom: '2rem',
    width: '30%'
  },
  deleteUser: {
    width: '1.8rem',
    height: '1.8rem',
    
    '&:hover': {
    backgroundColor:'#FABDCA',
    borderRadius: '50%',
}
  },

  editUser: {
    marginRight:'2rem',
    width: '1.8rem',
    height: '1.8rem',
    '&:hover': {
      backgroundColor:'#C6C6C6',
      borderRadius:'50%',
      
    }
  }
});
