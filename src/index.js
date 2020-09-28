document.addEventListener("DOMContentLoaded", e => {
 url = "http://localhost:3000/api/v1/photos/"
 const getPhotos = () => {
  fetch(url)
   .then(response => response.json())
   .then(photos => renderPhotos(photos))
 }

 const renderPhotos = photos => {
  const photoDiv = document.querySelector('#dog-post')
  for (let photo of photos) {
   let newDiv = renderPhoto(photo)
   photoDiv.append(newDiv)
  }
 }

 const renderPhoto = photo => {
  const newDiv = document.createElement('div')
  newDiv.classList.add('card-photo')

  newDiv.innerHTML = `
      <h2>${photo.name}</h2>
      <img src=${photo.imageUrl} class="photo-image" />
      <br>
      <br>
      <button class="like-btn" data-photo-id="${photo.id}">&#10084;&#65039;</button>
       <button class="comment-button" data-photo-id2="${photo.id}">&#128172;</button>
       <button class="comment-button" data-photo-id2="${photo.id}">x</button></button>
    `

  // toyCollection.append(toyDiv)
  return newDiv
 }






 // const renderPhotos = photos => {
 //  photos.forEach(photo => renderPhoto(photo))

 // }
 // const renderPhoto = photo => {
 //  const postDiv = document.querySelector('#dog-post')
 //  postDiv.dataset.photoId = `${photo.id}`
 //  const postName = document.querySelector('#dog-post h4')
 //  postName.innerText = `${photo.name}`
 //  const imageName = document.querySelector('#dog-post img')
 //  imageName.src = `${photo.imageUrl}`


 //  //return postDiv


 //  // dogsDiv.innerHTML = `<h1>${photo.name}</h1>
 //  // <img src=${photo.imageUrl}>
 //  // <br>
 //  // <button class="like-button" data-photo-id1="${photo.id}">&#10084;&#65039;</button>
 //  // <button class="comment-button" data-photo-id2="${photo.id}">&#128172;</button>
 //  //   <button class="comment-button" data-photo-id2="${photo.id}">x</button></button>

 //  // `
 //  //idDiv.append(dogsDiv)


 // }









 getPhotos()
 //console.log('yay')

})