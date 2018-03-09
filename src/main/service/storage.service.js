// export default class storage {
//     getItem(item) {
//         if (localStorage.getItem(item)) 
//             return localStorage.getItem(item);
//         return '';
//     }
//     set(item) {
//         localStorage.setItem(item)
//     }
// }
let storageGet = (item) => {
    if (localStorage.getItem(item)) 
        return parseFloat(localStorage.getItem(item));
    return '';
}

export { storageGet };