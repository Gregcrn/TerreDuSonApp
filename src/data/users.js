import axios from 'axios';
import React from 'react';

// class utilisateur extends React.Component {
//   state = {
//     utilisateur: []
//   }

//   componentDidMount() {
//     axios.get("http://localhost:8888/API-TerresDuSon/userlist.php")
//       .then(res => {
//         const utilisateur = res.data;
//         this.setState({ utilisateur });
//       })
//   }

//   render() {
//     return this.state.utilisateur;
//   };
// }

// export default utilisateur;


let yolo = [{"id":"1","nom":"Theo","password":"123","valid":"1","email":"theo@gmail.com","admin":null,"budget":null,"role":"RC","date":"2019-05-14 12:02:04"},{"id":"5","nom":"paul","password":"0","valid":"1","email":"qdsfghj","admin":null,"budget":null,"role":"RC","date":"2019-05-14 12:02:04"},{"id":"8","nom":"soso","password":"890","valid":"1","email":"rtgyhu","admin":null,"budget":null,"role":"RC","date":"2019-05-14 12:02:04"},{"id":"9","nom":"toto","password":"888","valid":"1","email":"fdghhj","admin":null,"budget":null,"role":"RC","date":"2019-05-14 12:02:04"},{"id":"2","nom":"gerg","password":"1233","valid":"1","email":"gerg@gmail.com","admin":null,"budget":null,"role":"RA","date":"2019-05-14 12:02:04"},{"id":"6","nom":"sam","password":"88888","valid":"1","email":"dfygjhk","admin":null,"budget":null,"role":"RA","date":"2019-05-14 12:02:04"},{"id":"10","nom":"New","password":"User","valid":null,"email":"New@test.com","admin":null,"budget":null,"role":"RA","date":"2019-05-14 12:02:04"},{"id":"11","nom":"New","password":"User","valid":null,"email":"New@test.com","admin":null,"budget":null,"role":"RA","date":"2019-05-14 12:02:04"},{"id":"3","nom":"Maxime","password":"1234","valid":"1","email":"maxime@gmail.com","admin":null,"budget":null,"role":"Gestionnaire","date":"2019-05-14 12:02:04"},{"id":"4","nom":"manar","password":"1234","valid":"1","email":"manar@gmail.com","admin":null,"budget":null,"role":"Gestionnaire","date":"2019-05-14 12:02:04"},{"id":"7","nom":"lili","password":"789","valid":"1","email":"dfthgjk","admin":null,"budget":null,"role":"Gestionnaire","date":"2019-05-14 12:02:04"},{"id":"12","nom":"New2","password":"123456","valid":null,"email":"New2@test.com","admin":null,"budget":null,"role":"Gestionnaire","date":"2019-05-14 12:02:04"},{"id":"13","nom":"New2","password":"123456","valid":null,"email":"New2@test.com","admin":null,"budget":null,"role":"Gestionnaire","date":"2019-05-14 12:03:17"}]
export default yolo;

// export default [
//   {
//     id: 'DEV705225',
//     nom: 'Ekaterina Tankova',
//     role: 'RA',
//     budget: 100000,
//     address: {
//       country: 'USA',
//       state: 'West Virginia',
//       city: 'Parkersburg',
//       street: '2849 Fulton Street',
//       zipCode: '26101'
//     },
//     email: 'ekaterina.tankova@devias.io',
//     phone: '304-428-3097',
//     avatarUrl: '/images/avatars/avatar_3.png',
//     createdAt: 1555016400000,
//     acceptedCookies: false,
    
//     interests: ['ReactJS'],
//     returning: false
//     },
//   {
//     id: 'DEV696649',
//     name: 'Cao Yu',
//     address: {
//       country: 'USA',
//       state: 'Bristow',
//       city: 'Iowa',
//       street: '1865  Pleasant Hill Road',
//       zipCode: '50611'
//     },
//     email: 'cao.yu@devias.io',
//     avatarUrl: '/images/avatars/avatar_4.png',
//     phone: '712-351-5711',
//     createdAt: 1555016400000,
//     acceptedCookies: false,
//     orders: ['DEV898812'],
//     interests: ['ReactJS', 'Angular'],
//     returning: false
//   },
//   {
//     id: 'DEV626247',
//     name: 'Alexa Richardson',
//     address: {
//       country: 'USA',
//       state: 'Georgia',
//       city: 'Atlanta',
//       street: '4894  Lakeland Park Drive',
//       zipCode: '30303'
//     },
//     email: 'alexa.richardson@devias.io',
//     phone: '770-635-2682',
//     avatarUrl: '/images/avatars/avatar_2.png',
//     createdAt: 1555016400000,
//     acceptedCookies: true,
//     orders: [],
//     interests: ['VueJS'],
//     returning: false
//   },
//   {
//     id: 'DEV702967',
//     name: 'Anje Keizer',
//     address: {
//       country: 'USA',
//       state: 'Ohio',
//       city: 'Dover',
//       street: '4158  Hedge Street',
//       zipCode: '44622'
//     },
//     email: 'anje.keizer@devias.io',
//     avatarUrl: '/images/avatars/avatar_5.png',
//     phone: '908-691-3242',
//     createdAt: 1554930000000,
//     acceptedCookies: true,
//     orders: ['DEV793788'],
//     interests: ['HTML'],
//     returning: true
//   },
//   {
//     id: 'DEV663348',
//     name: 'Clarke Gillebert',
//     address: {
//       country: 'USA',
//       state: 'Texas',
//       city: 'Dallas',
//       street: '75247',
//       zipCode: '715 Poco Mas Drive'
//     },
//     email: 'clarke.gillebert@devias.io',
//     phone: '972-333-4106',
//     avatarUrl: '/images/avatars/avatar_6.png',

//     createdAt: 1554757200000,
//     acceptedCookies: true,
//     orders: ['DEV841788'],
//     interests: ['ReactJS', 'EmberJS'],
//     returning: true
//   },
//   {
//     id: 'DEV728981',
//     name: 'Adam Denisov',
//     address: {
//       country: 'USA',
//       state: 'California',
//       city: 'Bakerfield',
//       street: '317 Angus Road',
//       zipCode: '93308'
//     },
//     email: 'adam.denisov@devias.io',
//     phone: '858-602-3409',
//     avatarUrl: '/images/avatars/avatar_1.png',
//     bio: 'Developer',
//     createdAt: 1554670800000,
//     acceptedCookies: true,
//     orders: ['DEV552540'],
//     interests: ['ReactJS', 'VueJS'],
//     returning: false
//   },
//   {
//     id: 'DEV883167',
//     name: 'Ava Gregoraci',
//     address: {
//       country: 'USA',
//       state: 'California',
//       city: 'Redondo Beach',
//       street: '2188  Armbrester Drive',
//       zipCode: '90278'
//     },
//     email: 'ava.gregoraci@devias.io',
//     avatarUrl: '/images/avatars/avatar_7.png',
//     phone: '415-907-2647',
//     createdAt: 1554325200000,
//     acceptedCookies: true,
//     orders: ['DEV593146', 'DEV783653'],
//     interests: ['NextJS'],
//     returning: false
//   },
//   {
//     id: 'DEV714786',
//     name: 'Emilee Simchenko',
//     address: {
//       country: 'USA',
//       state: 'Nevada',
//       city: 'Las Vegas',
//       street: '1798  Hickory Ridge Drive',
//       zipCode: '89101'
//     },
//     email: 'emilee.simchenko@devias.io',
//     phone: '702-661-1654',
//     avatarUrl: '/images/avatars/avatar_8.png',
//     createdAt: 1523048400000,
//     acceptedCookies: true,
//     orders: [],
//     interests: ['GatsbyJS'],
//     returning: false
//   },
//   {
//     id: 'DEV869812',
//     name: 'Kwak Seong-Min',
//     address: {
//       country: 'USA',
//       state: 'Michigan',
//       city: 'Detroit',
//       street: '3934  Wildrose Lane',
//       zipCode: '48224'
//     },
//     email: 'kwak.seong.min@devias.io',
//     avatarUrl: '/images/avatars/avatar_9.png',
//     phone: '313-812-8947',
//     createdAt: 1522875600000,
//     acceptedCookies: true,
//     orders: [],
//     interests: ['Apollo GraphQL'],
//     returning: true
//   },
//   {
//     id: 'DEV662801',
//     name: 'Merrile Burgett',
//     address: {
//       country: 'USA',
//       state: 'Utah',
//       city: 'Salt Lake City',
//       street: '368 Lamberts Branch Road',
//       zipCode: '84111'
//     },
//     email: 'merrile.burgett@devias.io',
//     phone: '801-301-7894',
//     avatarUrl: '/images/avatars/avatar_10.png',
//     createdAt: 1522702800000,
//     acceptedCookies: false,
//     orders: [],
//     interests: ['Angular'],
//     returning: true
//   }
// ];

