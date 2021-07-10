import React from 'react';
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import PxpClient from "pxp-client";

const ITEM_HEIGHT = 48;
const Actions = ({idStore, row, urlDelete, idStoreDesc, openModalNew }) => {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (callback) => {
    setAnchorEl(null);
    if (typeof callback === 'function') {
      callback();
    }
  };
  const handleDelete = () => {
    console.log('handleDelete  urlDelete',row,urlDelete)

    PxpClient.doRequest({
      url: urlDelete,
      params: {
        _tipo: 'matriz',
        row: JSON.stringify([
            {
              [idStoreDesc]: idStore,
              _fila: 1,
            }
        ])
      },
    }).then((resp) => {
      console.log('resp',resp)
    }).catch((err) => {
      console.log('err',err)
    })

  }
  const editDelete = () => {
    console.log('editDelete',row)
  }

  return (
    <>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon/>
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        <MenuItem key={`deteleRow${idStore}`} onClick={handleDelete}>
          Delete
        </MenuItem>
        <MenuItem key={`editRow${idStore}`} onClick={()=>openModalNew('edit', row)}>
          Edit
        </MenuItem>
      </Menu>
    </>
  );
};

export default Actions;
