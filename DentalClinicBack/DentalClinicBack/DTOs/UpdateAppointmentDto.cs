namespace DentalClinicBack.DTOs
{
    public class UpdateAppointmentDto
    {
        public string PatientFullName { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public DateTime? AppointmentDate { get; set; }
        public string PreferredTime { get; set; }
        public string AppointmentType { get; set; }
        public string Gender { get; set; }
        public string InsuranceProvider { get; set; }
        public string ReasonForVisit { get; set; }
        public string MedicalHistoryNotes { get; set; }
        public string Status { get; set; }
    }
}
