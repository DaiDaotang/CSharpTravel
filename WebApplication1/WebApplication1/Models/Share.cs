using System.ComponentModel.DataAnnotations;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication1.Models
{
    public class Share
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Text { get; set; }
        public string Image0 { get; set; }
        public string Image1 { get; set; }
        public string Image2 { get; set; }
        public string Image3 { get; set; }
        public string Image4 { get; set; }
        public string Image5 { get; set; }
        public string Image6 { get; set; }
        public string Image7 { get; set; }
        public string Image8 { get; set; }
        public DateTime Time { get; set; }
        public Share(int user, string text, string image0, string image1, string image2, string image3, string image4, string image5, string image6, string image7, string image8, DateTime time)
        {
            UserId = user;
            Text = text;
            Image0 = image0;
            Image1 = image1;
            Image2 = image2;
            Image3 = image3;
            Image4 = image4;
            Image5 = image5;
            Image6 = image6;
            Image7 = image7;
            Image8 = image8;
            Time = time;
        }
    }
}