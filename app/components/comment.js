import React from 'react';
import {unixTimeToString} from '../util.js';
import {Link} from 'react-router';
import {likeComment, unlikeComment} from '../server.js'

export default class Comment extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      likeCounter: props.likeCounter,
      commentId: props.commentId,
      postId: props.postId
    }
  }

	/**
	* Returns 'true' if the user liked the item.
	* Returns 'false' if the user has not liked the item.
	*/
	didUserLike() {
  	var likeCounter = this.state.likeCounter;
  	var liked = false;
  	// Look for a likeCounter entry with userId 4 -- which is the
  	// current user.
  	for (var i = 0; i < likeCounter.length; i++) {
    	if (likeCounter[i]._id === 4) {
      	liked = true;
  	  	break;
  	  }
  	}
		return liked;
	}

  handleLikeClick(clickEvent){
    clickEvent.preventDefault();
    if(clickEvent.button === 0){
      var callbackFunction = (updatedLikeCounter) => {
        this.setState({likeCounter: updatedLikeCounter})
      };

      if (this.didUserLike()) {
        // User clicked 'unlike' button.
        unlikeComment(this.state.postId, this.state.commentId, 4, callbackFunction);
      } else {
        // User clicked 'like' button.
        likeComment(this.state.postId, this.state.commentId, 4, callbackFunction);
      }
    }
  }


	render() {
		var likeButtonText = "Like";
		if(this.didUserLike()) {
			likeButtonText = "Unlike";
		}

		return (
		  <div>
		    <div className="media-left media-top">
		      PIC
		    </div>
		    <div className="media-body">
		      <Link to={"/profile/" + this.props.author._id}>
		      	{this.props.author.fullName}
		      </Link> 
		   	  {this.props.children}
		      <br />
            <a href="#" onClick={(e) => this.handleLikeClick(e)}>
              <span className="glyphicon glyphicon-thumbs-up"></span>
              {likeButtonText}
            </a>
		       · <a href="#">Reply</a> · {unixTimeToString(this.props.postDate)}
		    </div>
		  </div>
		)
	}
}