import axios from 'axios';

const AddUser = async (user) => {
    try {
        let response = await axios.post("http://192.168.1.165:8888/API-TerresDuSon/user/adduser.php", 
            user
        );
    } catch(e){
        console.log(e);
    }
}

export default AddUser;