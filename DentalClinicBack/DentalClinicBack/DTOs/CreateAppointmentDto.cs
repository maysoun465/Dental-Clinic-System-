using System.ComponentModel.DataAnnotations;

namespace DentalClinicBack.DTOs
{
    public class CreateAppointmentDto
    {
        [Required]
        public string PatientFullName { get; set; }

        [Required]
        [Phone]
        public string PhoneNumber { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public DateTime DateOfBirth { get; set; }

        [Required]
        public DateTime AppointmentDate { get; set; }

        [Required]
        public string PreferredTime { get; set; }

        [Required]
        public string AppointmentType { get; set; }

        [Required]
        public string Gender { get; set; }

        public string InsuranceProvider { get; set; }
        public string ReasonForVisit { get; set; }

        public string MedicalHistoryNotes { get; set; }
    }
}
