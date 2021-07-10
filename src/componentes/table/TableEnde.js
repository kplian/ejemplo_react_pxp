import React, {useEffect, useState} from 'react';
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core/styles";
import useFetch from "../../hooks/useFetch";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Actions from "./Actions";
import PxpClient from "pxp-client";

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

const ITEM_HEIGHT = 48;

const TableEnde = ({config}) => {
  const classes = useStyles();

  const [data, setData] = useState(null);
  const {response, error} = useFetch(config.getDataTable.url, config.getDataTable);

  const [open, setOpen] = useState(false);


  //crear states para usar en form
  console.log('keys',Object.keys(config.columns))
  const stateForm = {};
  for (const prop of Object.keys(config.columns)) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [valueF, setValueF] = useState('');
    stateForm[prop] = {
      value: valueF,
      setValue: setValueF
    }

  }

  console.log('stateForm',stateForm)

  const handleChangeInput = (event) => {
    stateForm[event.target.id].setValue(event.target.value);
  }

  const handleAdd = () => {
    console.log(stateForm)
    console.log(Object.entries(stateForm))
    const dataToSend = Object.entries(stateForm).reduce((prev, [name, values]) => ({
      ...prev,
      [name] : values.value
    }), {});




    console.log('dataToSend',dataToSend)
  }


  useEffect(() => {
    if (response) {
      setData(response.datos)
    }
  }, [response])
  useEffect(() => {
    console.log('data', data)
  }, [data])


  const openModalNew = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }



  return (
    <>
      <Paper className={classes.root}>
        <Button variant="contained" color="primary" onClick={openModalNew}>
          Agregar
        </Button>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {
                  Object.keys(config.columns).map((nameKey) => (
                    <TableCell
                      key={nameKey}
                    >
                      {config.columns[nameKey].label}
                    </TableCell>
                  ))
                }
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data && data.map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row[config.idStore]}>
                    {
                      Object.keys(config.columns).map((nameKey) => {
                        const value = row[nameKey];
                        console.log('config.columns[nameKey].render', config.columns[nameKey].render)
                        return (
                          <TableCell key={`${row[config.idStore]}_${nameKey}`}>
                            {!config.columns[nameKey].render ? value : config.columns[nameKey].render(row)}
                          </TableCell>
                        );
                      })
                    }
                    <TableCell>
                      <Actions idStore={row[config.idStore]} row={row} urlDelete={config.urlDelete} idStoreDesc={config.idStore}/>
                    </TableCell>

                  </TableRow>

                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            add
          </DialogContentText>
          {
            Object.keys(config.columns).map((nameKey) => (
              <TextField
                autoFocus
                margin="dense"
                id={nameKey}
                label={config.columns[nameKey].label}
                value={stateForm[nameKey].value}
                onChange={handleChangeInput}
                fullWidth
              />
            ))
          }

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAdd} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>

  );
};

export default TableEnde;
