using Microsoft.EntityFrameworkCore;
using DentalClinicBack.Models;

namespace DentalClinicSystem.Data
{
    public class DentalClinicContext : DbContext
    {
        public DentalClinicContext(DbContextOptions<DentalClinicContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // User configuration
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasIndex(u => u.Email).IsUnique(); 
            });

            modelBuilder.Entity<User>().HasData(
                new User
                {
                    Id = 1,
                    Username = "Dr. Menna Zakaria",
                    Email = "menna@dentalclinic.com",
                    PasswordHash = "$2a$11$OKmNPLc7wHWykQK1EYl85.MCMkaetBVAVm95KEVjOZzlQ3Ci90IxS", // pre-hashed password
                    Role = "Doctor",
                    CreatedAt = DateTime.UtcNow
                },
                new User
                {
                    Id = 2,
                    Username = "ReceptionistExample",
                    Email = "reception@dentalclinic.com",
                    PasswordHash = "$2a$11$1Ov1AN/4vidto4EKX.rmkuwY.CKjjtOVPLtUVspWYnROXSFgTb6K6", // pre-hashed password
                    Role = "Receptionist",
                    CreatedAt = DateTime.UtcNow
                }
            );
        }
    }
}
