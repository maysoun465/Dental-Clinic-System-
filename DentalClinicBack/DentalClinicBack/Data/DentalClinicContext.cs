using Microsoft.EntityFrameworkCore;
using DentalClinicBack.Models;

namespace DentalClinicSystem.Data
{
    public class DentalClinicContext : DbContext
    {
        public DentalClinicContext(DbContextOptions<DentalClinicContext> options) : base(options) { }
        public DbSet<User> Users { get; set; }

    }
}
