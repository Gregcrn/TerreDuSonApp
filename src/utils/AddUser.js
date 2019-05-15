import axios from 'axios';

const AddUser = async (user) => {
    try {
        let response = await axios.post("http://127.0.0.1:8888/API-TerresDuSon/adduser.php", 
            user
        );
    } catch(e){
        console.log(e);
    }
}

export default AddUser;