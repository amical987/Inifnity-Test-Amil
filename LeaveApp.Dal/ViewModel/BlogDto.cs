using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using BlogApp.Dal.Domain;

namespace BlogApp.Dal.ViewModel
{
    public class BlogDto
    {
        public int BlogID { get; set; }
        public string Title { get; set; }
        public string Summary { get; set; }
        public string Content { get; set; }
        public DateTime PublishedAt { get; set; }
        public BlogDto()
        {
        }
        public BlogDto(Blog blog)
        {
            BlogID = blog.BlogID;
            Title = blog.Title;
            Summary = blog.Summary;
            Content = blog.Content;
            PublishedAt = blog.PublishedAt;
        }
    }
}
