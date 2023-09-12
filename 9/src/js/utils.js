export const Utils = () => {
  const createIdArray = (arr) => {
    let id

    if (arr.at(-1)) {
      id = arr.at(-1).id + 1
    } else {
      id = 0
    }

    return id
  }
  
  return {
    createIdArray
  }
}