import axios from "axios";

export default class Client {
  private API_URL = 'http://localhost:3000/api';

  async getProjects() { 
    const response = await axios.get(`${this.API_URL}/projects`)

    return response.data;
  }
}