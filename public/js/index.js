//function for create calculator
createCalculator = () => {
  return {
    //attributes
    display: document.querySelector('.display'),

    // -------------- methods

    //starting calculator
    init() {
      this.clickBtn()
      this.clearDisplay()
    },

    //select values the calculator for display
    btnForDisplat(values) {
      this.display.value += values
    },

    //clear all values of input
    clearDisplay() {
      this.display.value = ''
    },

    result() {
      //perform the calculation
      let results = this.display.value

      try {
        //function eval that execut the code string in javascript
        results = eval(results)

        //resolves the account on the front and sends the operation and result data to the back end
        fetch(`http://localhost:3000/saveOperation`, {
          method: "POST",
          headers: { 'Content-Type': "application/json" },
          body: JSON.stringify({
            operation: this.display.value,
            result: results,
            username: localStorage.getItem("username")
          }),
        })
          .then((resposta) => {
            return resposta.json()
          }).then(data => {
            console.log(data)


        //returns the user and the actions performed by him
        fetch("http://localhost:3000/getUserResults/" + data.username).then(response => {
          return response.json()
        }).then(test => {

          const ul = document.querySelector("#results")
          ul.innerHTML = ""
          for (let x = 0; x < test.length; x++) {
            console.log(test[x].id)
          }

          test.forEach(item => {
            
            let li = document.createElement('li')
            li.innerHTML = `Operation: ${item.operation}  Result: ${item.result}`
            ul.append(li)
          })

        })
      })
       
        if (!results) {
          Swal.fire({
            icon: 'error',
            iconColor: '#3f4555',
            title: 'Oops...',
            text: 'INSERT A VALUE ',
            showConfirmButton: true,
            confirmButtonText: 'OK',
            confirmButtonColor: '#3f4555',
          })
          return
        }
        this.display.value = String(results)
      } catch (e) {
        Swal.fire({
          icon: 'error',
          iconColor: '#3f4555',
          title: 'Oops...',
          text: 'THERE WAS SOMETHING WRONG',
          showConfirmButton: true,
          confirmButtonText: 'OK',
          confirmButtonColor: '#3f4555',
        })
        return
      }
    },

    clickBtn() {
      //click buttons
      document.addEventListener('click', (e) => {
        //insert value in display
        const el = e.target

        //get method and select elments that contain class btn-num
        if (el.classList.contains('btn-num')) {
          this.btnForDisplat(el.innerText)
        }

        //get method and select class btn-clear
        if (el.classList.contains('btn-clear')) {
          this.clearDisplay()
        }

        //get method for set results
        if (el.classList.contains('btn-eq')) {
          this.result()
        }
      })
    },
  }
}

const calculator = createCalculator()
//execut method for starting calculator
calculator.init()