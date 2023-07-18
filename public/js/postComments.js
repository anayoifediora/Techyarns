const submitComment = async (event) => {
    event.preventDefault();
  
    let commentDescription = document.querySelector('.comments')
    
  
  
    const card = document.createElement('div');
    const cardHeader = document.createElement('div');
    const cardBody = document.createElement('div');
    const cardBlockquote = document.createElement('blockquote');
    const commentText = document.createElement('p');
    const commentFooter = document.createElement('footer');
    
    
    
    // const postContainer = document.querySelector('.row')
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
  
  document.getElementById('comment-btn').addEventListener('click', submitComment);
  