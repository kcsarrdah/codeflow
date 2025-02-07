export interface TimeComplexity {
  operation: string;
  best: string;
  average: string;
  worst: string;
}

export interface Operation {
  name: string;
  description: string;
  code: string;
}

export interface DataStructureInfo {
  name: string;
  description: string;
  timeComplexity: TimeComplexity[];
  spaceComplexity: string;
  advantages: string[];
  disadvantages: string[];
  commonOperations: Operation[];
  visualizationData: any;
  visualizationType: string;
}