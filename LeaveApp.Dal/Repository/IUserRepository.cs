using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using BlogApp.Dal.Domain;
using BlogApp.Dal.ViewModel;

namespace BlogApp.Dal.Repository
{
    public interface IUserRepository
    {
        
        //Task<int> Save(EmployeeDto employee, CancellationToken cancellationToken = default);
        Task<UserViewModel> GetTopFive(CancellationToken cancellationToken = default);
        Task<UserViewModel> GetbyNameEmail(string name, string email, CancellationToken cancellationToken = default);
        Task<UserDto> GetById(int Id, CancellationToken cancellationToken = default);
    }
}
