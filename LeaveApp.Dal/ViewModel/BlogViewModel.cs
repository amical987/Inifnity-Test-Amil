using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using BlogApp.Dal.Domain;

namespace BlogApp.Dal.ViewModel
{
    public class BlogViewModel
    {
        public IReadOnlyCollection<BlogDto> Blogs { get; }
        public BlogViewModel(IReadOnlyCollection<Blog> blogs)
        {
            Blogs = blogs.Select(blog => new BlogDto(blog)).ToList();
        }
    }
}
