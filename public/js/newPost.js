// const { post } = require("../../controllers/home-routes");

// const { update } = require("../../models/User");

const submitPost = async (event) => {
    event.preventDefault();
  
    let formTitle = document.getElementById('exampleFormControlInput1').value.trim()
    let formDescription = document.getElementById('exampleFormControlTextarea1').value.trim()
  
  
    const card = document.createElement('div');
    const cardHeader = document.createElement('div');
    const cardBody = document.createElement('div');
    const cardTitle = document.createElement('h5');
    const cardText = document.createElement('p');
    const readMore = document.createElement('a');
    
    const postContainer = document.querySelector('.col')
    card.setAttribute('style', 'width:600px')
    cardHeader.setAttribute('class', 'card-header')
    cardTitle.setAttribute('class', 'card-title')
    cardText.setAttribute('class', 'card-text')
    cardBody.setAttribute('class', 'card-body');
    readMore.setAttribute('href', '/posts/:id');
  
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

function openUpdateForm(event) {
  if(event.target.className === 'update-btn btn btn-primary') {
      let updateForm = document.querySelector('#update-post');
      updateForm = event.target.parentElement.querySelector('#update-post');
      updateForm.setAttribute('style', "display:block; width: 600px; height:200px; margin-top:20px;")
  
}
}
function closeUpdateForm(event) {
  if(event.target.id === 'cancel-update') {
      let updateForm = document.querySelector('#update-post');
      updateForm = event.target.parentElement;
      updateForm.setAttribute('style', "display:none;")
  }
}

const submitUpdate = async (event) => {
if (event.target.id === 'submit-update') {
  event.preventDefault();
let updateDescription = document.getElementById('post-description').value.trim()
updateDescription = event.target.parentElement.querySelector('#post-description').value.trim()
const descriptionTextEl = document.getElementById('post-description')

const postId = descriptionTextEl.getAttribute('data')

const data = {
  postId: postId,
  description: updateDescription,
}
console.log(data)
const response = await fetch(`/api/posts/${postId}`, {
  method: 'PUT',
  body: JSON.stringify(data),
  headers: { 'Content-Type': 'application/json' },
});
console.log(response)
console.log(window.location)
if (response.ok) {
    document.location.replace(window.location.href);
} else {
  console.log('Error:', response.status);
}
}
};
  
  document.getElementById('post-submit-button').addEventListener('click', submitPost);
  