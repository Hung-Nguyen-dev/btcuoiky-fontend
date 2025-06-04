import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Typography } from "@mui/material";

const NewComment = ({ photoId, onCommentAdded }) => {
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');

  const handleOpen = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please login to add a comment');
      return;
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setComment('');
    setError('');
  };

  const handleSubmit = async () => {
    if (!comment.trim()) {
      setError('Comment cannot be empty');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('Please login to add a comment');
        return;
      }

      const response = await fetch(`http://localhost:8081/api/photo/commentsOfPhoto/${photoId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ comment })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add comment');
      }

      const newComment = await response.json();
      onCommentAdded(newComment);
      handleClose();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      {error && <Typography color="error">{error}</Typography>}
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleOpen}
        className="add-comment-btn"
      >
        Add Comment
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Comment</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Your Comment"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            error={!!error}
            helperText={error}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Add Comment
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default NewComment;
