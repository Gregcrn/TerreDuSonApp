const request = new XMLHttpRequest();
request.open('GET', 'http://192.168.1.165:8888/API-TerresDuSon/user/userlist.php', false);
request.send();

export default JSON.parse(request.responseText);