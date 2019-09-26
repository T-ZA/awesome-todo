export const selectAll = {
  inserted(el) {
    // Look for the inner input tag on the QInput component
    let input = el.querySelector('.q-field__native')
    input.addEventListener('focus', () => {
      if(input.value.length){
        input.select()
      }
    })
  }
}
