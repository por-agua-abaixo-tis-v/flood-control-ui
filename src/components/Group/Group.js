/* eslint-disable no-restricted-globals */
import React from 'react'
import Template from '../../hoc/Template/Template'
import classes from './Group.css'
import alert from '../../static/alert.svg'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {useState} from 'react'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import axios from '../../axios-orders'
import { v4 as uuidv4 } from 'uuid';

export const Group = (props) => {
    const [show, setShow] = useState(false);
    if (localStorage.getItem('id') == null) {
        window.location.href = window.location.origin + "/login"
    }
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
            document.getElementById('name').value = props.group.name
            document.getElementById('range').value = props.group.range
            if (document.getElementById("map")!=null) {
                let myLatlng = new window.google.maps.LatLng(props.group.latitude, props.group.longitude);
                let mapOptions = {
                  zoom: 15,
                  center: myLatlng
                }
                let map = new window.google.maps.Map(document.getElementById("map"), mapOptions);
                const marker = new window.google.maps.Marker({
                  position: myLatlng,
                  map: map,
                });   
            }
        }, 300);
        setOpen(true);
    };
    const editGroup = () => {
        let r = confirm("Deseja mesmo editar este grupo?");
        if(r==true){
            let id = props.group.id
            let name = document.getElementById('name').value
            let range = document.getElementById('range').value
            axios.put('https://tisv-flood-control-api.herokuapp.com/groups/'+ id, {
                "name": name,
                "range": range,
                "uuid": uuidv4()
            })
              .then(response => {
                window.location.href = document.location.origin + '/admin/dashboard'
              })
              .catch(error => {
              });
        } else {
            setOpen(false)
        }
      }
      const deleteGroup = () => {
        let r = confirm("Deseja mesmo deletar este grupo?");
        if(r==true){
            let id = props.group.id
            axios.delete('https://tisv-flood-control-api.herokuapp.com/groups/' + id, {
            })
              .then(response => {
                window.location.href = document.location.origin + '/admin/dashboard'
              })
              .catch(error => {
              });
        } else {
        setOpen(false)
        }
      } 
    const handleClose = () => {
        
      setOpen(false);
    };
    const activatedGroup = () =>{
        let id = props.group.id
        axios.put('https://tisv-flood-control-api.herokuapp.com/groups/'+ id, {
            "active":true,
            "uuid": uuidv4()
        })
          .then(response => {
            window.location.href = document.location.origin + '/admin/dashboard'
          })
          .catch(error => {
          });
    }
    const isAdmin = () =>{
        if (props.admin ==='true') {
            return(
                <div className={classes.status}>{props.group.active? <button className={classes.activegroup} disabled>Ativo</button>: <button className={classes.ativargrupo} onClick={activatedGroup}>Ativar Grupo</button>}<button className={classes.gerenciargrupo} onClick={handleOpen}>gerenciar</button></div>
            )
        }
    }
    return(
        <Template>
            <button onClick={() =>{props.selectGroup(props.group)}} className={classes.group}>
                <img className={classes.img} src={alert}></img>
                <div>
                    <div className={classes.nameOfGroup}>
                        {props.group && props.group.name? props.group.name : '' }
                    </div>
                    <div className={classes.lastMessage}>
                    </div>
                </div>
                {isAdmin()}
            </button>
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
                        <h2>Gerenciar Grupo</h2>
                        <form className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Nome do Alerta"
                            name="name"
                            autoFocus
                        />
                        <div className={classes.map} id='map'/>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="range"
                            label="range"
                            type="number"
                            id="range"
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={editGroup}
                        >
                            Editar Grupo
                        </Button>
                        <Button
                            fullWidth
                            variant="contained"
                            color="secondary"
                            className={classes.submit}
                            onClick={deleteGroup}
                        >
                            Deletar Grupo
                        </Button>
                        </form>
                    </div>
                </div>
                </Fade>
            </Modal>
        </Template>
    )
}