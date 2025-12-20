namespace DentalClinicBack.DTOs
{
    public class AppointmentFilterDto
    {
        public string SearchTerm { get; set; }
        public string Status { get; set; }
        public string AppointmentType { get; set; }
        public DateTime? Date { get; set; }
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 10;
    }
}
