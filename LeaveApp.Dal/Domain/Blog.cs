using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BlogApp.Dal.Domain
{
    public class Blog
    {
        public int BlogID { get; set; }
        [Required]
        [StringLength(64)]
        public string Title { get; set; }
        [Required]
        [StringLength(350)]
        public string Summary { get; set; }
        [Required]
        [StringLength(3500)]
        public string Content { get; set; }
        [Required]
        public DateTime PublishedAt { get; set; }
        public ICollection<UserBlog> MyUsers { get; set; }
    }
}
