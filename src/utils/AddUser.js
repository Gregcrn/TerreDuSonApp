import axios from 'axios';
import serv from '../data/serv';
const AddUser = async (user) => {
  try {
    let response = await axios.post('http://'+serv+':8888/API-TerresDuSon/user/adduser.php', 
      user
    );
    return response;
  } catch(e){
    // eslint-disable-next-line no-console
    console.log(e);
  }
}

export default AddUser;