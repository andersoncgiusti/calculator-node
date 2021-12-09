
const access = () => {
Swal.fire({
    title: 'Submit your username',
    input: 'text',
    inputAttributes: {
      autocapitalize: 'off'
    },
    showCancelButton: true,
    confirmButtonText: 'Login',
    showLoaderOnConfirm: true,
    preConfirm: (login) => {
      return fetch(`//api.github.com/users/${login}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(response.statusText)
          }
          return response.json()
        })
        .catch(error => {
          Swal.showValidationMessage(
            `Request failed: ${error}`
          )
        })
    },
    allowOutsideClick: () => !Swal.isLoading()
  }).then((result) => {
    if (result.isConfirmed) {
      //keep login secure
      localStorage.setItem('username', result.value.login)

      const ul = document.querySelector('#results')
      const span = document.querySelector("#username")
      //returns github user and creates the user in the database with single login 
      //returning operations and results on the screen
      span.innerText = result.value.login
      let resultArray = [];
      fetch("http://localhost:3000/getUserResults/" + result.value.login).then(response => {
        return response.json()
      }).then(test => {

        console.log(test)
        for(let x = 0; x < test.length; x++) {
          console.log(test[x].id)
        }
        test.forEach(item => {
          let li = document.createElement('li')
          li.innerHTML = `Operation: ${item.operation}  Result: ${item.result}`
          ul.append(li)
        })
        
      })

      console.log(resultArray)
      Swal.fire({
        title: `${result.value.login}'s avatar`,
        imageUrl: result.value.avatar_url
      })
    }
  })
} 

access()