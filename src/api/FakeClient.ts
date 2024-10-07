import Client from "./client.interface";

export default class FakeClient implements Client {
  private projects: any[] = [];

  constructor() {
    // Initialize with some fake data
    const initialStage1 = { id: '1', name: 'Stage 1', sequence: 1, projectId: '101', cases: [] };
    const initialStage2 = { id: '2', name: 'Stage 2', sequence: 2, projectId: '101', cases: [] };
    const project1 = { id: '101', name: 'Project 1', stages: [initialStage1, initialStage2] };
    
    this.projects.push(project1);
  }

  async changeStageOfCase(record: any, nextStageId: string, projectId: string): Promise<void> {
    const project = this.projects.find(p => p.id === projectId);
    if (!project) {
      throw new Error(`Project with ID ${projectId} not found`);
    }

    const currentStage = project.stages?.find((s: any) => s.id === record.stageId);
    const nextStage = project.stages?.find((s: any) => s.id === nextStageId);
    const caseItem = currentStage?.cases?.find((c: any) => c.id === record.id);

    if (!caseItem || !nextStage) {
      throw new Error('Case or next stage not found');
    }

    currentStage.cases = currentStage.cases?.filter((c: any) => c.id !== caseItem.id);

    nextStage.cases = nextStage.cases || [];
    nextStage.cases.push({ ...caseItem, stageId: nextStageId });
  }

  async getProjects(): Promise<any[]> {
    // Simulate async behavior
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(this.projects);
      }, 100);
    });
  }

  async addStageToProject(projectId: string, name: string): Promise<void> {
    const project = this.projects.find(p => p.id === projectId);
    if (!project) {
      throw new Error(`Project with ID ${projectId} not found`);
    }

    const newStage = {
      id: Math.random().toString(36).substring(7),
      name,
      sequence: (project.stages?.length || 0) + 1,
      projectId,
      cases: [],
    };

    project.stages = project.stages || [];
    project.stages.push(newStage);
  }

  async createCase(projectId: string, stageId: string, name: string): Promise<void> {
    const project = this.projects.find(p => p.id === projectId);
    if (!project) {
      throw new Error(`Project with ID ${projectId} not found`);
    }

    const stage = project.stages?.find((s: any) => s.id === stageId);
    if (!stage) {
      throw new Error(`Stage with ID ${stageId} not found`);
    }

    const newCase = {
      id: Math.random().toString(36).substring(7),
      name,
      description: 'A new case',
      order: (stage.cases?.length || 0) + 1,
      stageId,
    };

    stage.cases = stage.cases || [];
    stage.cases.push(newCase);
  }
}
