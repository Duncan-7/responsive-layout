import axios from 'axios';

const APICall = () => {
  return axios.get('https://learn.accountingcpd.net/ACPD/API/Test/SampleObject');
}

export default APICall;