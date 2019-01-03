using System.Data.Entity;

namespace WebApplication1.Models
{
    public class StaffContext:DbContext
    {
        public StaffContext() : base("OrderDataBase") { }
        public DbSet<User> User { get; set; }
        public DbSet<Strategy> Strategy { get; set; }
        public DbSet<StrategyDetail> StrategyDetail { get; set; }
        public DbSet<Travel> Travel { get; set; }
        public DbSet<TravelDetail> TravelDetail { get; set; }
        public DbSet<Share> Share { get; set; }
        public DbSet<ShareDetail> ShareDetail { get; set; }
    }
}