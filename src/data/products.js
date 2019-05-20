import serv from './serv'

const request = new XMLHttpRequest();
request.open('GET', 'http://'+serv+':8888/API-TerresDuSon/product/productlist.php', false);
request.send();

export default JSON.parse(request.responseText);
// export default [
//   {
//     id: 221344,
//     designation: 'Bagel',
//     price: 0.20,
//     unit: 'Unité(s)',
//     stock: 0,
//     provider: 'La baguette fine'
//   },
//   {
//     id: 22344,
//     designation: 'Baguette',
//     price: 0.60,
//     unit: 'Unité(s)',
//     stock: 0,
//     provider: 'La baguette fine'
//   },
//   {
//     id: 22134,
//     designation: 'Croissant',
//     price: 0.15,
//     unit: 'Unité(s)',
//     stock: 0,
//     provider: 'La baguette fine'
//   },
//   {
//     id: 22344,
//     designation: 'Ficelle Tranchée',
//     price: 0.90,
//     unit: 'Unité(s)',
//     stock: 0,
//     provider: 'Lidl'
//   },
//   {
//     id: 221344,
//     designation: 'Pain 1,5kg Boule Tranchée',
//     price: 1,
//     unit: 'Unité(s)',
//     stock: 0,
//     provider: 'Nardeux'
//   },
//   {
//     id: 21344,
//     designation: 'Pain aux chocolats',
//     price: 0.20,
//     unit: 'Unité(s)',
//     stock: 0,
//     provider: 'Nardeux'
//   },
//   {
//     id: 21344,
//     designation: 'Pain sandwich',
//     price: 1.5,
//     unit: 'Unité(s)',
//     stock: 0,
//     provider: 'Auchan'
//   },
//   {
//     id: 21344,
//     designation: 'Pain burger frais',
//     price: 0.90,
//     unit: 'Unité(s)',
//     stock: 0,
//     provider: 'Nardeux'
//   }
// ]