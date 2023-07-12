const submitPost = async (event) => {
    event.preventDefault();
  
    let formTitle = document.getElementById('title').value.trim()
    let formDescription = document.getElementById('description').value.trim()
  
  
    const card = document.createElement('div');
    const cardHeader = document.createElement('div');
    const cardBody = document.createElement('div');
    const cardTitle = document.createElement('h5');
    const cardText = document.createElement('p');
    const readMore = document.createElement('a');
    
    const postContainer = document.querySelector('.row')
    card.setAttribute('style', 'width:600px')
    cardHeader.setAttribute('class', 'card-header')
    cardTitle.setAttribute('class', 'card-title')
    cardText.setAttribute('class', 'card-text')
    cardBody.setAttribute('class', 'card-body');
    readMore.setAttribute('href', `/posts/${{id}}`);
  
    postContainer.appendChild(card);
    card.appendChild(cardBody, cardHeader);
    cardBody.appendChild(cardTitle, cardText, readMore);
  
  
    const data = {
      title: formTitle,
      description: formDescription,
    }
    
    const response = await fetch('/api/posts', {
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
  
  document.querySelector('.post-form').addEventListener('submit', submitPost);
  
  