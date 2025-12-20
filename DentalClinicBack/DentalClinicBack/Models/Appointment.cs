using System.ComponentModel.DataAnnotations;

namespace DentalClinicBack.Models
{
    public class Appointment
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string PatientFullName { get; set; }

        [Required]
        [Phone]
        [StringLength(20)]
        public string PhoneNumber { get; set; }

        [Required]
        [EmailAddress]
        [StringLength(100)]
        public string Email { get; set; }

        [Required]
        public DateTime DateOfBirth { get; set; }

        [Required]
        public int Age { get; set; }

        [Required]
        public DateTime AppointmentDate { get; set; }

        [Required]
        [StringLength(10)]
        public string PreferredTime { get; set; }

        [Required]
        [StringLength(50)]
        public string AppointmentType { get; set; }

        [Required]
        [StringLength(10)]
        public string Gender { get; set; }

        [StringLength(100)]
        public string InsuranceProvider { get; set; }

        [StringLength(500)]
        public string ReasonForVisit { get; set; }

        [StringLength(1000)]
        public string MedicalHistoryNotes { get; set; }

        [Required]
        [StringLength(20)]
        public string Status { get; set; } = "Pending";

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime? UpdatedAt { get; set; }

        [StringLength(50)]
        public string CreatedBy { get; set; }

        [StringLength(50)]
        public string? UpdatedBy { get; set; }

    }
}
