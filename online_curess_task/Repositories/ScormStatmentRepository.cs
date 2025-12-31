using online_curess_task.Data;
using online_curess_task.Modle;
using online_curess_task.Repositories.IRepositories;

namespace online_curess_task.Repositories
{
    public class ScormStatmentRepository : Repository<ScormStatement>, IScormStatmentRepository
    {
        public ScormStatmentRepository(ApplicationDbContext context) : base(context)
        {
        }
    }
}
