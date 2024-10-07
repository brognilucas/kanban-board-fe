import axios from "axios";
import Client from "./client.interface";

export default class AxiosClient implements Client {
  private API_URL = 'http://localhost:3000/api';

  projects = []

  async changeStageOfCase(record: any, nextStageId: string, projectId: string) {
    await axios.put(`${this.API_URL}/projects/${projectId}/cases/${record.id}/move`, {
      stageId: nextStageId
    })
  }

  async getProjects() {
    const respose = await axios.get(`${this.API_URL}/projects`)
    this.projects = respose.data;
    return respose.data;
  }

  async addStageToProject(projectId: string, name: string) {
    await axios.post(`${this.API_URL}/projects/${projectId}/stages`, {
      name
    })
  }

  async createCase(projectId: string, stageId: string, name: string) {
    await axios.post(`${this.API_URL}/projects/${projectId}/stages/${stageId}/cases`, {
      name,
      description: "",
    })
  }
}