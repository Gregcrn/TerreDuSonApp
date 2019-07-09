import serv from './serv'

const request = new XMLHttpRequest();
request.open('GET', 'http://' + serv + ':8888/API-TerresDuSon/user/userlist.php', false);
request.send();

export default JSON.parse(request.responseText);

// export default [{
//     id: 1,
//     nom: "jean",
//     password: "ouioui",
//     valid: 1,
//     email: "qweqwe@qweq.fr",
//     admin: 0,
//     $budget: 1234,
//     $role: 1,
//     $date: 123413241234
// }];