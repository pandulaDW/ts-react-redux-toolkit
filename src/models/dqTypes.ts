enum Color {
  Red = "Red",
  Burgundy = "Burgundy",
  Orange = "Orange",
  Yellow = "Yellow",
}

enum Impact {
  Critical = "Critical",
  High = "High",
  Medium = "Medium",
  Low = "Low",
}

export const ImpactToColor: { [key: string]: Color } = {
  [Impact.Critical]: Color.Red,
  [Impact.High]: Color.Burgundy,
  [Impact.Medium]: Color.Orange,
  [Impact.Low]: Color.Yellow,
};

export const colorObj = {
  [Color.Red]: "rgba(240, 16, 0, 0.95)",
  [Color.Burgundy]: "rgb(157, 34, 53)",
  [Color.Orange]: "rgb(240, 126, 55)",
  [Color.Yellow]: "rgba(206, 152, 0, 0.65)",
};

export enum colNames {
  "Date" = "Date",
  "ErrorCategory" = "Error Category",
  "ErrorImpact" = "Error Impact",
  "Owner" = "Owner",
  "KeyFieldValue" = "Key Field Value",
  "OfficialEntityName" = "Official Entity Name",
  "LEIStatus" = "LEI Status",
  "FieldsOrRelatedField" = "Fields or Related Field",
  "ErrorDescription" = "Error Description",
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
