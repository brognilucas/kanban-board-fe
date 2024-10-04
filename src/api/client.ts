import axios from "axios";

export default class Client {
  private API_URL = 'http://localhost:3000/api';

  projects = []

  async changeStageOfCase(record: any, nextStageId: number, projectId: string) {
    await axios.put(`${this.API_URL}/projects/${projectId}/cases/${record.id}/move`, { 
      stageId: nextStageId
    })
  }

  async getProjects() {
    const respose = await axios.get(`${this.API_URL}/projects`)
    this.projects = respose.data;
    return respose.data;
  }
}