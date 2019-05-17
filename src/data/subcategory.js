import serv from './serv'

const request = new XMLHttpRequest();
request.open('GET', 'http://' + serv + ':8888/API-TerresDuSon/sous_categories/souscatlist.php', false);
request.send();

export default JSON.parse(request.responseText);