
export class MedicalType {
  MedicalTypeName: string;
  MedicalTypeCount: number;
}

export class GetDoctorDashboard {

  TotalAppointmentCount: number;
  UpComingAppointmentCount: number;
  TodayAppointmentCount: number;
  getMedicalEximationListDtos: MedicalType[];

}
