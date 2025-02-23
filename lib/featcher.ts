import axios from "axios";

const featcher = (url: string) => axios.get(url).then((res) => res.data);

export default featcher;