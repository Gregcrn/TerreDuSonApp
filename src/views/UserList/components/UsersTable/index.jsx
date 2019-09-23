/* eslint-disable no-console */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Externals
import classNames from 'classnames';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';

// Material helpers
import { withStyles } from '@material-ui/core/styles';

// Material components
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import TablePagination from '@material-ui/core/TablePagination';
import SearchInput from 'components/SearchInput';

// Icons
import Delete from '@material-ui/icons/DeleteOutline'
import Edit from '@material-ui/icons/EditOutlined';

// Shared components
import Portlet from 'components/Portlet';
import PortletContent from 'components/PortletContent';

//Form dialog
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';


// Component styles
import styles from './styles';



class UsersTable extends Component {
  state = {
    rowsPerPage: 100,
    page: 0,
    search:'',
    open: false
  };

  handleClickOpen = (event) => {
    // this.setState({ open: true });
    console.log(event.target)
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };
  
  updateSearch(event){
    this.setState({search: event.target.value.substr(0, 20)})
  }

  render() {
    const { classes, className, users } = this.props;
    const { activeTab,  rowsPerPage, page } = this.state;    

    const filteredUser  = this.props.users.filter(
      (user) => {
        return (user.nom.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 )|| user.role.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
      }
    )
    const rootClassName = classNames(classes.root, className);
    return (
      <div>
        <div className={classes.margin}>
          <SearchInput
            className={classes.searchInput}
            onChange={this.updateSearch.bind(this)}
            placeholder="Rechercher par nom ou rôle"
            value={this.state.search}
          />
        </div>
        <Portlet className={rootClassName}>
          <PortletContent noPadding>
            <PerfectScrollbar>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="left">
                    Nom
                    </TableCell>
                    <TableCell align="left">Rôle</TableCell>
                    <TableCell align="left">Email</TableCell>
                    <TableCell align="left">Date d'ajout</TableCell>
                    <TableCell/>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredUser
                    .filter(user => {
                      if (activeTab === 1) {
                        return !user.returning;
                      }

                      if (activeTab === 2) {
                        return user.returning;
                      }

                      return user;
                    })
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map(user => (
                      <TableRow
                        className={classes.tableRow}
                        hover
                        key={user.id}
                      >
                        <TableCell className={classes.tableCell}>
                          <div className={classes.tableCellInner}>
                            <Link to="#">
                              <Typography
                                className={classes.nameText}
                                variant="body1"
                              >
                                {user.nom}
                              </Typography>
                            </Link>
                          </div>
                        </TableCell>
                        <TableCell className={classes.tableCell}>
                          {user.role}
                        </TableCell>
                        <TableCell className={classes.tableCell}>
                          {user.email}
                        </TableCell>
                        <TableCell className={classes.tableCell}>
                          {moment(user.date).format('DD/MM/YYYY')}
                        </TableCell>
                        <TableCell>
                          <Edit className={classes.editUser}/>
                          <Delete
                            className={classes.deleteUser}
                            onClick={this.handleClickOpen}
                          />
                          <Dialog
                            aria-labelledby="customized-dialog-title"
                            onClose={this.handleClose}
                            open={this.state.open}
                          >
                            <DialogTitle
                              id="customized-dialog-title"
                              onClose={this.handleClose}
                            >
                            Supprimmer un utilisateur
                            </DialogTitle>
                            <Typography gutterBottom>
                          Souhaitez-vous vraiment supprimer cet utilisateur ?
                            </Typography>

                            <DialogActions>
                              <Button
                                color="primary"
                                onClick={this.handleClose}>
                          Oui
                              </Button>
                            </DialogActions>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </PerfectScrollbar>
            <TablePagination
              backIconButtonProps={{
                'aria-label': 'Previous Page'
              }}
              component="div"
              count={users.length}
              nextIconButtonProps={{
                'aria-label': 'Next Page'
              }}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
              page={page}
              rowsPerPage={rowsPerPage}
              rowsPerPageOptions={[5, 10, 25]}
            />
          </PortletContent>
        </Portlet>
      </div>
    );
  }
}

UsersTable.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  onSelect: PropTypes.func,
  onShowDetails: PropTypes.func,
  users: PropTypes.array.isRequired
};

UsersTable.defaultProps = {
  users: [],
  onSelect: () => {},
  onShowDetails: () => {}
};

export default withStyles(styles)(UsersTable);
