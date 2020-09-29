document.addEventListener("DOMContentLoaded", e => {
 url = "http://localhost:3000/api/v1/photos/"
 const photoDiv = document.querySelector('#dog-post')

 const getPhotos = () => {
  fetch(url)
   .then(response => response.json())
   .then(photos => renderPhotos(photos))
 }

 const renderPhotos = photos => {
  //const photoDiv = document.querySelector('#dog-post')

  for (let photo of photos) {
   let newDiv = renderPhoto(photo)
   photoDiv.append(newDiv)
  }
 }

 const renderPhoto = photo => {
  const newDiv = document.createElement('div')
  newDiv.dataset.photoId = photo.id
  newDiv.classList.add('card-photo')

  newDiv.innerHTML = `
      <h2>${photo.name}</h2>
      <img src=${photo.imageUrl} class="photo-image" />
      <br>
      <h7 class="like-number" >${photo.likes} likes</likes></h7>
      <br>
      <button class="like-btn" data-photo-id="${photo.id}">&#10084;&#65039;</button>
       <button class="comment-button" data-photo-id2="${photo.id}">&#128172;</button>
       <button class="delete-button" data-photo-id2="${photo.id}">x</button></button>
    `

  // toyCollection.append(toyDiv)
  return newDiv
 }


 // click handler on photos using event delegations 
 const clickHandler = () => {
  document.addEventListener('click', e => {
   //console.log(e.target)
   //event delegation
   if (e.target.className === 'like-btn') {
    const likeBtn = e.target
    const branch = likeBtn.previousElementSibling
    //const ay = likeBtn.closest('div')
    const numberLikes = branch.previousElementSibling
    let newLikes = parseInt(numberLikes.textContent) + 1
    //const pressLikes = num + parseInt(1)
    //const newLikes = num + pressLikes
    numberLikes.textContent = newLikes + " "
     + "likes"
    let myLikes = numberLikes.textContent

    const id = likeBtn.dataset.photoId

    console.log(id)

    const options = {
     method: "PATCH",
     headers: {
      "content-type": "application/json",
      "accept": "application/json"
     },
     body: JSON.stringify({ likes: myLikes })
    }

    fetch(url + id, options)
     .then(response => response.json())
     .then(photo =>
      numberLikes.textContent = `${photo.likes} likes`

     )




   } else if (e.target.matches(".delete-button")) {
    //console.log(e.target)
    const bttn = e.target
    const deleteId = e.target.dataset.photoId2
    const options = {
     method: "DELETE"
    }
    fetch(url + deleteId, options)
     .then(response => response.json())
     .then(photo => bttn.parentNode.remove())

   }

  })

 }
 const submitHandler = () => {
  document.addEventListener('submit', e => {
   e.preventDefault()
   const form = document.querySelector('.add-photo')
   //console.log(e.target)
   const name = form.name.value
   const imageUrl = form.imageUrl.value
   //console.log(name, imageUrl)
   const createPhoto = {
    name: name,
    imageUrl: imageUrl,
    likes: 0
   }
   form.reset()
   // save to the database
   const options = {
    method: "POST",
    headers: {
     "content-type": "application/json",
     "accept": "application/json"
    },
    body: JSON.stringify(createPhoto)
   }
   fetch(url, options)
    .then(response => response.json())
    .then(photo => {
     const photoNewDiv = renderPhoto(photo)
     photoDiv.append(photoNewDiv)
    })

  })
 }
 getPhotos()
 clickHandler()
 submitHandler()


})