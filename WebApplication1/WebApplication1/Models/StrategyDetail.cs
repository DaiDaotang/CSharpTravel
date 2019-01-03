using System.ComponentModel.DataAnnotations;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication1.Models
{
    public class StrategyDetail
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int StrategyId { get; set; }
        public int UserId { get; set; }
  
        

        public StrategyDetail(int strategy, int user)
        { 
            StrategyId = strategy;
            UserId = user;
        }
    }
}