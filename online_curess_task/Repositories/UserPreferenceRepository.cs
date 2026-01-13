using online_curess_task.Data;
using online_curess_task.Modle;
using online_curess_task.Repositories.IRepositories;

namespace online_curess_task.Repositories
{
    public class UserPreferenceRepository : Repository<UserPreference>, IUserPreferenceRepository
    {
        public UserPreferenceRepository(ApplicationDbContext context) : base(context)
        {
        }
    }
}
