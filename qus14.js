import React, { Component } from 'react';

class LikeButton extends Component {
  state = {
    postId: 'examplePostId', // Replace with your actual postId
    likes: 0,
    isLiked: false,
    isUpdating: false, // To track if the update is in progress
  };

  handleLike = () => {
    const {  likes, isLiked } = this.state;

    // Optimistically update the UI
    this.setState({
      likes: isLiked ? likes - 1 : likes + 1,
      isLiked: !isLiked,
      isUpdating: true,
    });

    // Simulate server request (replace with actual fetch call)
    setTimeout(() => {
      // Assuming the server request was successful
      // In a real app, you would make an HTTP request here
      console.log('Simulated server request successful.');
      this.setState({ isUpdating: false });
    }, 1000); // Simulate delay

    // If the server request fails, revert changes
    // Example error handling (not shown in detail here)
    // Replace with actual error handling logic
    // .catch((error) => {
    //   this.setState({
    //     likes: isLiked ? likes + 1 : likes - 1,
    //     isLiked: !isLiked,
    //     isUpdating: false,
    //   });
    //   console.error('Error updating like:', error);
    // });
  };

  render() {
    const { likes, isLiked, isUpdating } = this.state;

    return (
      <div>
        <button onClick={this.handleLike} disabled={isUpdating}>
          {isLiked ? 'Unlike' : 'Like'}
        </button>
        <span>{likes} Likes</span>
        {isUpdating && <span>Updating...</span>}
      </div>
    );
  }
}

export default LikeButton;
