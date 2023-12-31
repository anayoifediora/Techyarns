const commentButton = document.getElementById('comment-btn');
const cancelButton = document.getElementById('cancel-button');

  const openCommentForm = () => {
      const commentForm = document.querySelector('.comment-form');
      commentForm.setAttribute('style', "display:block; width:1200px; background-color:var(--primary); padding:10px; border-radius:5px;");
  }
  const closeCommentForm = () => {
    const commentForm = document.querySelector('.comment-form');
    commentForm.setAttribute('style', "display:none;");
  }
  commentButton.addEventListener('click', openCommentForm)
  cancelButton.addEventListener('click', closeCommentForm)

const submitComment = async (event) => {
    event.preventDefault();

    
    const commentDescription = document.getElementById('floatingTextarea').value.trim();
    console.log(commentDescription);
    const card = document.createElement('div');
    const cardHeader = document.createElement('div');
    const cardBody = document.createElement('div');
    const cardBlockquote = document.createElement('blockquote');
    const commentText = document.createElement('p');
    const commentFooter = document.createElement('footer');
    
    
    
    const postContainer = document.querySelector('.col')
    card.setAttribute('class', 'card')
    cardHeader.setAttribute('class', 'card-header')
    cardBody.setAttribute('class', 'card-body');
    cardBlockquote.setAttribute('class', 'blockquote mb-0');
    commentText.setAttribute('class', 'card-text');
    commentFooter.setAttribute('class', 'blockquote-footer');
  
    postContainer.appendChild(card);
    card.appendChild(cardHeader, cardBody);
    cardBody.appendChild(cardBlockquote);
    cardBlockquote.appendChild(commentText, commentFooter)

    const data = {
      description: commentDescription,
    }
    
    const response = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    });
    console.log(response)
      
    if (response.ok) {
        document.location.replace(window.location.href);
    } else {
      console.log('Error:', response.status);
    }
  };

  const deletePost = async () => {
      let postId = window.location.href.split('/').pop();

    const response = await fetch(`/api/posts/${postId}`, {
      method: 'DELETE',
    });
    console.log(postId)
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete post')
    }
  };
  
  document.getElementById('comment-button').addEventListener('click', submitComment);
  document.getElementById('delete-btn').addEventListener('click', deletePost);
