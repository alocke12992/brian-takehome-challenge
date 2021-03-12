export interface ICondition {
  businessLine: string; // Maybe enumerable
  required: boolean;
  requested: boolean;
}

export interface IPrescription {
  patientrxid: string;
  rxdate: string; // Timestamp (not epoch)
  drug: string;
  directions: string;
  drugid: string;
  routepharmacyid: string;
  routedetails: string;
  refills: string;
  treatment_instruction_id: string;
  status: string;
  dispdetails: string;
  dispenseQuantity: string;
  dispenseUnits: string;
  substitution: string;
  duration: string;
  pharmacyNote: string;
  druggenericid: string;
  rx_type: string;
  dosage: string;
  prescriber_id: number;
}

export interface IConsultation {
  id: string;
  patient_id: string;
  state: string; // Probably enumerable
  conditionsTreated: ICondition[];
  doctor_id: string;
  submittedDate: number; // Epoch
  prescriptions: IPrescription[];
  completedDate: number; // Epoch
  followupDate: number; // Epoch
  isFollowup?: boolean;
  numFollowup?: number;
}
