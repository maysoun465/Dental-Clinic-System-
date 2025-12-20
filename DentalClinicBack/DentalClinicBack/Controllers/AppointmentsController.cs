using DentalClinicBack.DTOs;
using DentalClinicBack.Models;
using DentalClinicSystem.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DentalClinicSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize] // Requires authentication for all endpoints
    public class AppointmentsController : ControllerBase
    {
        private readonly DentalClinicContext _context;
        private readonly ILogger<AppointmentsController> _logger;

        public AppointmentsController(DentalClinicContext context, ILogger<AppointmentsController> logger)
        {
            _context = context;
            _logger = logger;
        }

        // ===================== GET ALL APPOINTMENTS (with filters) =====================
        // GET: api/appointments?searchTerm=John&status=Pending&appointmentType=Checkup&date=2024-12-20&pageNumber=1&pageSize=10
        [HttpGet]
        public async Task<ActionResult> GetAppointments(
    string? searchTerm,
    string? status,
    string? appointmentType,
    DateTime? date)
        {
            var query = _context.Appointments.AsQueryable();

            if (!string.IsNullOrEmpty(searchTerm))
                query = query.Where(a =>
                    a.PatientFullName.Contains(searchTerm) ||
                    a.PhoneNumber.Contains(searchTerm) ||
                    a.Email.Contains(searchTerm));

            if (!string.IsNullOrEmpty(status))
                query = query.Where(a => a.Status == status);

            if (!string.IsNullOrEmpty(appointmentType))
                query = query.Where(a => a.AppointmentType == appointmentType);

            if (date.HasValue)
                query = query.Where(a => a.AppointmentDate.Date == date.Value.Date);

            var data = await query
                .OrderBy(a => a.AppointmentDate)
                .ThenBy(a => a.PreferredTime)
                .ToListAsync();

            return Ok(data);
        }


        // ===================== GET SINGLE APPOINTMENT =====================
        // GET: api/appointments/5
        [HttpGet("{id}")]
        public async Task<ActionResult> GetAppointment(int id)
        {
            try
            {
                var appointment = await _context.Appointments.FindAsync(id);

                if (appointment == null)
                {
                    return NotFound(new { message = "Appointment not found" });
                }

                return Ok(appointment);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching appointment {Id}", id);
                return StatusCode(500, new { message = "An error occurred while fetching the appointment" });
            }
        }

        // ===================== GET APPOINTMENT STATISTICS =====================
        // GET: api/appointments/stats
        [HttpGet("stats")]
        public async Task<ActionResult> GetStats()
        {
            try
            {
                var today = DateTime.Today;
                var startOfWeek = today.AddDays(-(int)today.DayOfWeek);
                var endOfWeek = startOfWeek.AddDays(7);

                var stats = new
                {
                    todayAppointments = await _context.Appointments
                        .CountAsync(a => a.AppointmentDate.Date == today),
                    pendingAppointments = await _context.Appointments
                        .CountAsync(a => a.Status == "Pending"),
                    thisWeekAppointments = await _context.Appointments
                        .CountAsync(a => a.AppointmentDate >= startOfWeek && a.AppointmentDate < endOfWeek),
                    totalAppointments = await _context.Appointments.CountAsync()
                };

                return Ok(stats);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching appointment stats");
                return StatusCode(500, new { message = "An error occurred while fetching statistics" });
            }
        }

        // ===================== CREATE APPOINTMENT =====================
        // POST: api/appointments
        [HttpPost]
        [AllowAnonymous]
        public async Task<ActionResult> CreateAppointment(CreateAppointmentDto dto)
        {
            if (dto.AppointmentDate.Date < DateTime.Today)
                return BadRequest(new { message = "Appointment date cannot be in the past" });

            if (dto.DateOfBirth.Date > DateTime.Today)
                return BadRequest(new { message = "Invalid date of birth" });

            var conflict = await _context.Appointments.FirstOrDefaultAsync(a =>
                a.AppointmentDate.Date == dto.AppointmentDate.Date &&
                a.PreferredTime == dto.PreferredTime &&
                a.Status != "Cancelled");

            if (conflict != null)
                return BadRequest(new { message = "This time slot is already booked" });

            var appointment = new Appointment
            {
                PatientFullName = dto.PatientFullName,
                PhoneNumber = dto.PhoneNumber,
                Email = dto.Email,
                DateOfBirth = dto.DateOfBirth,
                Age = CalculateAge(dto.DateOfBirth),
                AppointmentDate = dto.AppointmentDate,
                PreferredTime = dto.PreferredTime,
                AppointmentType = dto.AppointmentType,
                Gender = dto.Gender,
                InsuranceProvider = dto.InsuranceProvider,
                ReasonForVisit = dto.ReasonForVisit,
                MedicalHistoryNotes = dto.MedicalHistoryNotes,
                Status = "Pending",
                CreatedAt = DateTime.UtcNow,
                CreatedBy = User.Identity?.Name ?? "System"
            };

            _context.Appointments.Add(appointment);
            await _context.SaveChangesAsync();

            return Ok(appointment);
        }


        // ===================== UPDATE APPOINTMENT =====================
        // PUT: api/appointments/5
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateAppointment(int id, [FromBody] Appointment updatedAppointment)
        {
            try
            {
                var appointment = await _context.Appointments.FindAsync(id);

                if (appointment == null)
                {
                    return NotFound(new { message = "Appointment not found" });
                }

                // Check for time slot conflicts if date/time changed
                if (appointment.AppointmentDate != updatedAppointment.AppointmentDate ||
                    appointment.PreferredTime != updatedAppointment.PreferredTime)
                {
                    var existingAppointment = await _context.Appointments
                        .FirstOrDefaultAsync(a =>
                            a.Id != id &&
                            a.AppointmentDate.Date == updatedAppointment.AppointmentDate.Date &&
                            a.PreferredTime == updatedAppointment.PreferredTime &&
                            a.Status != "Cancelled");

                    if (existingAppointment != null)
                    {
                        return BadRequest(new { message = "This time slot is already booked" });
                    }
                }

                // Update fields
                appointment.PatientFullName = updatedAppointment.PatientFullName;
                appointment.PhoneNumber = updatedAppointment.PhoneNumber;
                appointment.Email = updatedAppointment.Email;
                appointment.DateOfBirth = updatedAppointment.DateOfBirth;
                appointment.Age = CalculateAge(updatedAppointment.DateOfBirth);
                appointment.AppointmentDate = updatedAppointment.AppointmentDate;
                appointment.PreferredTime = updatedAppointment.PreferredTime;
                appointment.AppointmentType = updatedAppointment.AppointmentType;
                appointment.Gender = updatedAppointment.Gender;
                appointment.InsuranceProvider = updatedAppointment.InsuranceProvider;
                appointment.ReasonForVisit = updatedAppointment.ReasonForVisit;
                appointment.MedicalHistoryNotes = updatedAppointment.MedicalHistoryNotes;
                appointment.Status = updatedAppointment.Status;
                appointment.UpdatedAt = DateTime.UtcNow;
                appointment.UpdatedBy = User.Identity?.Name ?? "System";

                await _context.SaveChangesAsync();

                _logger.LogInformation("Appointment updated: {Id}", id);

                return Ok(appointment);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating appointment {Id}", id);
                return StatusCode(500, new { message = "An error occurred while updating the appointment" });
            }
        }

        // ===================== UPDATE APPOINTMENT STATUS ONLY =====================
        // PATCH: api/appointments/5/status
        [HttpPatch("{id}/status")]
        public async Task<IActionResult> UpdateStatus(int id, StatusUpdateRequest request)
        {
            var appointment = await _context.Appointments.FindAsync(id);
            if (appointment == null)
                return NotFound();

            appointment.Status = request.Status;
            appointment.UpdatedAt = DateTime.UtcNow;
            appointment.UpdatedBy = User.Identity?.Name ?? "System";

            await _context.SaveChangesAsync();
            return Ok(appointment);
        }


        // ===================== DELETE APPOINTMENT =====================
        // DELETE: api/appointments/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "Doctor,Receptionist")]
        public async Task<ActionResult> DeleteAppointment(int id)
        {
            try
            {
                var appointment = await _context.Appointments.FindAsync(id);

                if (appointment == null)
                {
                    return NotFound(new { message = "Appointment not found" });
                }

                _context.Appointments.Remove(appointment);
                await _context.SaveChangesAsync();

                _logger.LogInformation("Appointment deleted: {Id}", id);

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting appointment {Id}", id);
                return StatusCode(500, new { message = "An error occurred while deleting the appointment" });
            }
        }

        // ===================== GET AVAILABLE TIME SLOTS =====================
        // GET: api/appointments/available-slots?date=2024-12-20
        [HttpGet("available-slots")]
        [AllowAnonymous]
        public async Task<ActionResult> GetAvailableSlots([FromQuery] DateTime date)
        {
            try
            {
                var allSlots = new[]
                {
                    "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
                    "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
                    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"
                };

                var bookedSlots = await _context.Appointments
                    .Where(a => a.AppointmentDate.Date == date.Date && a.Status != "Cancelled")
                    .Select(a => a.PreferredTime)
                    .ToListAsync();

                var availableSlots = allSlots.Except(bookedSlots).ToList();

                return Ok(new
                {
                    date,
                    availableSlots,
                    bookedSlots
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching available slots for {Date}", date);
                return StatusCode(500, new { message = "An error occurred while fetching available slots" });
            }
        }

        // ===================== HELPER METHOD =====================
        private int CalculateAge(DateTime dateOfBirth)
        {
            var today = DateTime.Today;
            var age = today.Year - dateOfBirth.Year;
            if (dateOfBirth.Date > today.AddYears(-age)) age--;
            return age;
        }
    }

    // Helper class for status update requests
    public class StatusUpdateRequest
    {
        public string Status { get; set; } = string.Empty;
    }
}