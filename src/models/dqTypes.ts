enum Color {
  Red = "Red",
  Burgundy = "Burgundy",
}

export interface DQItem {
  errorType: string;
  Impact: string;
  Colour: Color;
  KFID: string[];
  errorColumn: string[];
  error: string;
  metadata: {
    [kfid: string]: {
      Owner: string;
      OfficialEntityName: string;
      LEIStatus: string;
    };
  };
}

export interface DQResponseBody {
  timestamp: number;
  data: DQItem[];
}

export interface DQRequestBody {
  uploaded_file: string;
}

export interface DQState {
  timestamp: number | undefined;
  data: DQItem[];
}
