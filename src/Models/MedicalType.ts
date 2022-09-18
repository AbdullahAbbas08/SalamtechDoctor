
export class MedicalType {
  MedicalTypeName: string;
  MedicalTypeCount: number;
  Image: string;
}

export class GetDoctorDashboard {

  TotalAppointmentCount: number;
  UpComingAppointmentCount: number;
  TodayAppointmentCount: number;
  getMedicalEximationListDtos: MedicalType[];

}
