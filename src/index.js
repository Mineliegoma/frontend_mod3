document.addEventListener("DOMContentLoaded", e => {
  url = "http://localhost:3000/api/v1/photos/"
  const photoDiv = document.querySelector('#dog-post')
  const formAddPhoto = document.querySelector('.add-photo')

  const getPhotos = () => {
    fetch(url)
      .then(response => response.json())
      .then(photos => renderPhotos(photos))
  }
  //get all the photos and append it to the dom
  const renderPhotos = photos => {
    const photoDiv = document.querySelector('#dog-post')
    for (let photo of photos) {
      let newDiv = renderPhoto(photo)
      photoDiv.append(newDiv)
    }
  }
  //create an element
  // give that element a dataset attribute
  // create a innerHtml for the photos attributes
  //return the element
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
    return newDiv
    //photoDiv.append(newDiv)
  }


  // click handler on photos using event delegations 
  //////////////////////////////////////////////////
  const clickHandler = () => {
    document.addEventListener('click', e => {
      //console.log(e.target)
      if (e.target.className === 'like-btn') {
        const likeBtn = e.target
        const branch = likeBtn.previousElementSibling
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

      } else if (e.target.matches('.comment-button')) {
        //console.log(e.target)
        //first i delete the inner html of the photo container
        // second, i traversed the dom to reach to the div of the element that i clicked and insert it to a constant
        //third, i append that that constant to the photo container that was deleted.


        photoDiv.innerHTML = ''
        const btn = e.target
        //console.dir(btn)
        const wo = btn.parentElement
        //console.log(btn)
        photoDiv.append(wo)

        //create a form for comments
        // give it the dogs id
        const formComment = document.createElement('form')
        formComment.dataset.commentId = wo.dataset.photoId
        formComment.classList.add('comment-form')
        formComment.innerHTML = `
        <label>name:</label>
        <input type="text" name="name" value="" placeholder="Enter name">
        <label>thoughts: </label>
        <input type="text" name="thoughts" value="" placeholder="Enter comments">
        <input type="submit" value="share thoughts" class="submit-comment">`
        photoDiv.insertAdjacentElement('beforebegin', formComment)
        // desactivate the comment button click and the add post click and deletebutton
        btn.className = 'none'
        formAddPhoto.innerHTML = ''
        photoDiv.children[0].children[7].className = 'none'
        //console.log(photoDiv.children[0].children[7].className)

        //console.log(formComment)
        /////////////////////////////////////////////////////
        //lets grab the inputs from the form
        // add a submit listener to the form
        // const commentSubmitHandler = () => {
        const forme = document.querySelector('.comment-form')
        forme.addEventListener('submit', e => {
          e.preventDefault()
          const btn = e.target
          const theName = forme.name.value
          const comment = forme.thoughts.value
          //console.log(theName, comment)
          ////////////////////////////////////////////////////
          //create a li

          const ulEl = document.createElement('ul')
          ulEl.dataset.ulId = btn.dataset.commentId
          //console.log(ulEl)
          const commentLi = document.createElement('li')
          commentLi.textContent = theName + "\xa0\xa0\xa0\xa0\xa0" + "Comment:" + "   " + comment
          ulEl.append(commentLi)
          photoDiv.append(commentLi)
          forme.reset()
          //console.log(btn)
          //"\xa0\xa0\xa0\xa0\xa0\xa0"



        })

        // need desactivate the comment button and the the create form









      }
    })
  }

  /////////////////////////////////////////////////////////
  // const commentSubmitHandler = () => {
  //   const formThougts = document.querySelector('.comment-form')
  //   //formThougts.addEventListener('submit', e => {
  //   //   e.preventDefault()
  //   console.log(formThougts)
  //   // })

  // }

  //////////////////////////////////////////////////////////////
  const submitHandler = () => {
    const form = document.querySelector('.add-photo')
    form.addEventListener('submit', e => {
      e.preventDefault()
      //const form = document.querySelector('.add-photo')
      //console.log('yay')
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