import React from 'react'
import Template from '../../hoc/Template/Template'
import classes from './Group.css'
import alert from '../../static/alert.svg'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import {useState} from 'react'
import Button from '@material-ui/core/Button';

export const GroupTitle = (props) => {
    const [show, setShow] = useState(false);
    const useStyles = makeStyles((theme) => ({
        modal: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
        paper: {
          backgroundColor: theme.palette.background.paper,
          border: '2px solid #000',
          boxShadow: theme.shadows[5],
          padding: theme.spacing(2, 4, 3),
        },
      }));
    const modal = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setTimeout(() => {
            if (document.getElementById("map")!=null) {
                let myLatlng = new window.google.maps.LatLng(props.group.latitude, props.group.longitude);
                let mapOptions = {
                  zoom: 15,
                  center: myLatlng
                }
                let map = new window.google.maps.Map(document.getElementById("map"), mapOptions);
                const cityCircle = new window.google.maps.Circle({
                    strokeColor: '#FF0000',
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: '#FF0000',
                    fillOpacity: 0.35,
                    map: map,
                    center: {lat:props.group.latitude, lng:props.group.longitude},
                    radius: props.group.range * 1000
                  });
            }
        }, 300);
        setOpen(true);
    };
    const handleClose = () => {
        
        setOpen(false);
      };
    const hasName = (group) => {
        if (group && group.name) {
            const partsOfName = group.name.split(' ')
            const lettersOfParts = partsOfName.map((part) => { return part.charAt(0) })
            const reducedName = lettersOfParts.join('')
            return reducedName.toUpperCase();
        } else {
            return ''
        }
    }
    return (
        <Template>
            <div onClick={handleOpen} className={classes.title}>
                <div className={classes.fs}>
                    <img className={classes.img} src={alert}></img>
                    <div>
                        <div className={classes.nameOfGroupTitle}>
                            {props.group && props.group.name ? props.group.name : ''}
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={modal.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
            >
                <Fade in={open}>
                <div className={modal.paper}>
                <CssBaseline />
                    <div className={classes.paper}>
                        <h2>{props.group && props.group.name ? props.group.name : ''}</h2>
                        <form className={classes.form} noValidate>
                        <div className={classes.map} id='map'/>
                        </form>
                    </div>
                    <Button
                            fullWidth
                            variant="contained"
                            color="secondary"
                            onClick={handleClose}
                        >
                            Fechar
                        </Button>
                </div>
                </Fade>
            </Modal>
        </Template >
    )
}