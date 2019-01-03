using System.ComponentModel.DataAnnotations;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication1.Models
{
    public class ShareDetail
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int ShareId { get; set; }
        public int UserId { get; set; }

        public ShareDetail()
        {

        }

        public ShareDetail(int share, int user)
        {
            ShareId = share;
            UserId = user;
        }
    }
}