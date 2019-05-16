const request = new XMLHttpRequest();
request.open("GET", 'http://localhost:8888/API-TerresDuSon/userlist.php', false);
request.send();

export default JSON.parse(request.responseText);