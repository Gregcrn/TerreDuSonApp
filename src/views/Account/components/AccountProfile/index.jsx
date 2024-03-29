import React, { Component } from 'react';

// Externals
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Material helpers
import { withStyles } from '@material-ui/core/styles';

// Material components
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';

// Shared components
import Portlet from 'components/Portlet';
import PortletContent from 'components/PortletContent';
import PortletFooter from 'components/PortletFooter';

// Component styles
import styles from './styles';

class AccountProfile extends Component {
  state = {
    removePhoto: true,
  };
  removePhoto = () =>{
    this.setState({ removePhoto: false })
  }

  render() {
    const { classes, className, ...rest } = this.props;

    const rootClassName = classNames(classes.root, className);

    return (
      <Portlet
        {...rest}
        className={rootClassName}
      >
        <PortletContent>
          <div className={classes.details}>
            <div className={classes.info}>
              <Typography variant="h2">Theoma Magreg</Typography>
            </div>
            { this.state.removePhoto ? <Avatar
              className={classes.avatar}
              src="/images/avatars/avatar_1.png"
            /> : <Avatar
              className={classes.avatar}
              src= "/images/avatars/user-default.svg"
            />
            }
          </div>
          <div className={classes.progressWrapper}>
            <Typography variant="body1">Profil complété: 70%</Typography>
            <LinearProgress
              classes={{
                root: classes.progressRoot,
                colorPrimary: classes.progressColorPrimary
              }}
              value={70}
              variant="determinate"
            />
          </div>
        </PortletContent>
        <PortletFooter>
          <input
            accept="image/*"
            className={classes.input}
            id="contained-button-file"
            multiple
            type="file"
          />
          <label htmlFor="contained-button-file">
            <Button
              className={classes.button}
              color="primary"
              component="span"
            >
            Changer photo 
            </Button>
          </label>
          <Button
            onClick={this.removePhoto}
            variant="text">Supprimer photo</Button>
        </PortletFooter>
      </Portlet>
    );
  }
}

AccountProfile.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AccountProfile);
