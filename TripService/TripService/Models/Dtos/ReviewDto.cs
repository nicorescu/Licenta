using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TripService.Models.Dtos
{
    public class ReviewDto
    {
        public Guid Id { get; set; }
        public UserDto Author { get; set; }
        public string Message { get; set; }
        public int Stars { get; set; }
    }
}
