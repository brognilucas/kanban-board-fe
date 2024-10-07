export default interface Client { 
  changeStageOfCase(record: any, nextStageId: string, projectId: string): Promise<void>

  getProjects(): Promise<any[]>

  addStageToProject(projectId: string, name: string): Promise<void>

  createCase(projectId: string, stageId: string, name: string): Promise<void>
}
