/* eslint-disable no-param-reassign */

// Iterate over array like set of elements
export const each = (els, callback) => {
  Array.prototype.forEach.call(els, callback)
}


// Has class
export const hasClass = (el, className) => new RegExp(`(\\s|^)${className}(\\s|$)`).test(el.className)


// Remove class
export const removeClass = (el, className) => {
  if (el.classList) {
    el.classList.remove(className)
  } else {
    el.className = el.className.replace(new RegExp(`(^|\\b)${className.split(' ').join('|')}(\\b|$)`, 'gi'), ' ')
  }
}


// Toggle class
export const toggleClass = (el, className) => {
  if (el.classList) {
    el.classList.toggle(className)
  } else {
    const classes = el.className.split(' ')
    const existingIndex = classes.indexOf(className)

    if (existingIndex >= 0) {
      classes.splice(existingIndex, 1)
    } else {
      classes.push(className)
    }

    el.className = classes.join(' ')
  }
}
/* eslint-ensable no-param-reassign */
