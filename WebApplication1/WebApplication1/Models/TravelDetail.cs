using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication1.Models
{
    public class TravelDetail
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int TravelId { get; set; }
        public string Text { get; set; }
        public string EventName { get; set; }
        public string EventDetail { get; set; }
        public string StartTime { get; set; }
        public int KeepTime { get; set; }
        public int XQ { get; set; }

        public TravelDetail() { }

        public TravelDetail(int travel, string eventName, string eventDetail, string startTime, int keepTime, int xq)
        {
            TravelId = travel;
            EventName = eventName;
            EventDetail = eventDetail;
            StartTime = startTime;
            KeepTime = keepTime;
            XQ = xq;
        }
    }
}